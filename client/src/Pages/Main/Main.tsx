import {useState, useRef, useEffect} from "react"
import io from "socket.io-client"
import Player from "../../Components/Player"
import {BackendURL} from "../../Utils/global.util"
import { useParams } from "react-router-dom"
import { getRoomState } from "../../Utils/axios.http"

function Main() {
    const {id} = useParams()
    const socketRef: any = useRef()
    const [state, setState] = useState([])

    useEffect(() => {
        fetchRoomState()
        socketRef.current = io(BackendURL)
    }, [])

    const fetchRoomState = async () => {
        if (!state.length && typeof id === "string") {
            const roomState = await getRoomState(id as string)
            setState(roomState)
        }
    }

    useEffect(() => {
        socketRef.current.on(`room-${id}`, setState)
    }, [state, id])

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
