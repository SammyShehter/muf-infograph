import {useState, useRef, useEffect} from "react"
import io, {Socket} from "socket.io-client"
import Player from "../../Components/PlayerBigBen"
import {
    BackendURL,
    defaultState,
    defineRoomNumber,
} from "../../Utils/global.util"
import {useParams} from "react-router-dom"
import {getPlayerData, getRoomState} from "../../Utils/axios.http"
import {FullLoader} from "../../Components/Loader/Loader"
import {
    PlayerData,
    Populated_PlayerInfo,
    Unpopulated_PlayerInfo,
} from "../../Types"
import {HERALD} from "../../Utils/const"

function Room() {
    const params = useParams()
    const socketRef = useRef<Socket>()
    const [state, setState] = useState<Array<Populated_PlayerInfo>>([])

    useEffect(() => {
        const id: string = defineRoomNumber(params.id)
        if (!state.length) {
            fetchRoomState(id)
            socketRef.current = io(BackendURL)
        }
        socketRef.current!.on(
            `room-${id}`,
            async (data: Array<Unpopulated_PlayerInfo>) => {
                const newState = await populateState(data)
                setState(newState)
            }
        )
    }, [])

    const fetchRoomState = async (id: string) => {
        const roomState = await getRoomState(id)
        const fullState = await populateState(roomState)
        setState(fullState)
    }

    const populateState = async (
        unpopulatedState: Array<Unpopulated_PlayerInfo>
    ): Promise<Array<Populated_PlayerInfo>> => {
        const temp: Array<string> = []
        const result: Array<Populated_PlayerInfo> = []
        if (!unpopulatedState.length) unpopulatedState = defaultState
        unpopulatedState.forEach((item) => {
            const playerData = localStorage.getItem(item.player)!
            if (!playerData && item.player !== HERALD) {
                temp.push(item.player)
            }
            result.push({...item, player: JSON.parse(playerData)})
        })
        if (temp.length) {
            const data = await getPlayerData(temp)
            data.forEach((item) => {
                localStorage.setItem(item.code, JSON.stringify(item))
            })
            return populateState(unpopulatedState)
        }
        return result
    }

    const renderPlayers = (state: Array<Populated_PlayerInfo>) => {
        return state.map((item: Populated_PlayerInfo, index: number) => {
            return <Player info={item} key={index} number={index + 1} />
        })
    }

    if (!state.length) return <FullLoader />

    return (
        <>
            <div className="backgroundBlur">
                <div className="App">{renderPlayers(state)}</div>
            </div>
        </>
    )
}

export default Room
