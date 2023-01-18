import {useState, useRef, useEffect} from "react"
import io from "socket.io-client"
import Player from "../../Components/Player"
import {BackendURL} from "../../Utils/global.util"
import {useParams} from "react-router-dom"
import {getRoomState} from "../../Utils/axios.http"

function Main() {
    let params: any = useParams()
    const id: number =
        isFinite(params.id) || +params.id < 1 || +params.id > 8 ? params.id : "1"
    const socketRef: any = useRef()
    const [state, setState] = useState([])

    useEffect(() => {
        fetchRoomState()
        socketRef.current = io(BackendURL)
    }, [])

    useEffect(() => {
        socketRef.current.on(`room-${id}`, setState)
    }, [state, id])

    const fetchRoomState = async () => {
        if (!state.length && typeof id === "string") {
            const roomState = await getRoomState(id as string)
            setState(roomState)
        }
    }

    const renderPlayers = () => {
        if (!state.length) return <h2>Loading</h2>
        return state.map((item, index) => {
            return <Player info={item} key={index} number={index + 1} />
        })
    }

    return (
        <>
            <div className="empty-space" />
            <div className="backgroundBlur">
                <div className="App">{renderPlayers()}</div>
            </div>
        </>
    )
}

export default Main
