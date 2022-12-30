import React, {useState, useRef, useEffect} from "react"
import io from "socket.io-client"
import axios from "axios"
import Player from "../../Components/Player"
import { URL } from "../../Utils/global.util"

function Main({match}) {
    const socketRef = useRef()
    const [state, setState] = useState([])

    useEffect(
        () =>
            (async () => {
                if (!state.length) {
                    const {data} = await axios.get(
                        `${URL}/room/${match.params.id}`
                    )
                    setState(data)
                }
            })(),
        [state.length, match.params.id]
    )

    const room = (array) => {
        setState(array)
    }

    useEffect(() => {
        socketRef.current = io.connect(`${URL}`)
        socketRef.current.on(`room-${match.params.id}`, room)

        return () => socketRef.current.disconnect()
    }, [state, match.params.id])

    const renderPlayers = () => {
        if (state.length) {
            return state.map((item, index) => {
                return <Player info={item} key={index} number={index + 1} />
            })
        } else {
            return <h2>Loading</h2>
        }
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
