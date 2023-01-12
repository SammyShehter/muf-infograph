import {useState, useRef, useEffect} from "react"
import io from "socket.io-client"
import axios from "axios"
import Player from "../../Components/Player"
import {URL} from "../../Utils/global.util"
import { useParams } from "react-router-dom"

function Main() {
    const {id} = useParams()
    const socketRef: any = useRef()
    const [state, setState] = useState([])

    useEffect(() => {
        fetchDataX()
        socketRef.current = io(`${URL}`)
    }, [])

    const fetchDataX = async () => {
        if (!state.length) {
            const {data} = await axios.get(`${URL}/room/${id}`)
            setState(data)
        }
    }

    const room = (array: any) => {
        setState(array)
    }

    useEffect(() => {
        socketRef.current.on(`room-${id}`, room)
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
