import {useState, useRef, useEffect} from "react"
import io from "socket.io-client"
import Player from "../../Components/Player"
import {BackendURL} from "../../Utils/global.util"
import {useParams} from "react-router-dom"
import {getPlayerData, getRoomState} from "../../Utils/axios.http"
import { FullLoader } from "../../Components/Loader/Loader"

function Room() {
    let params: any = useParams()
    const id: number =
        isFinite(params.id) || +params.id < 1 || +params.id > 8
            ? params.id
            : "1"
    const socketRef: any = useRef()
    const [state, setState] = useState([])

    useEffect(() => {
        if (!state.length && typeof id === "string") {
            fetchRoomState(id)
            socketRef.current = io(BackendURL)
        }
    }, [])

    useEffect(() => {
        socketRef.current.on(`room-${id}`, async (data: any) => {
            setState(await populateState(data))
        })
    }, [state, id])

    const fetchRoomState = async (id: string) => {
        const roomState = await getRoomState(id)
        const fullState = await populateState(roomState.data)
        setState(fullState)
    }

    const populateState = async (
        unpopulatedState: Array<any>
    ): Promise<any> => {
        const temp: Array<string> = []
        const result: any = []
        unpopulatedState.forEach((item) => {
            const playerData = localStorage.getItem(item.player)
            if (!playerData && item.player !== 'herald') {
                temp.push(item.player)
            }
            result.push({...item, player: JSON.parse(playerData as string)})
        })
        if (temp.length) {
            const {data} = await getPlayerData(temp)
            data.forEach((item: any) => {
                localStorage.setItem(item.code, JSON.stringify(item))
            })
            return populateState(unpopulatedState)
        }
        return result
    }

    const renderPlayers = (state: Array<any>) => {
        if (!state.length) return <FullLoader />
        return state.map((item: any, index: number) => {
            return <Player info={item} key={index} number={index + 1} />
        })
    }

    return (
        <>
            <div className="empty-space" />
            <div className="backgroundBlur">
                <div className="App">{renderPlayers(state)}</div>
            </div>
        </>
    )
}

export default Room
