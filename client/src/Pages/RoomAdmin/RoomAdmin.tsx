import {useEffect, useState, useRef} from "react"
import io from "socket.io-client"

import {BackendURL, defaultState} from "../../Utils/global.util"
import {useParams} from "react-router-dom"
import {getAllPlayersNames, getRoomState} from "../../Utils/axios.http"
import {Link} from "react-router-dom"
import Button from "../../Components/Button"
import Inputs from "../../Components/Admin/Inputs"

const RoomAdmin = () => {
    const {id} = useParams()
    const socketRef: any = useRef()

    const [state, setState] = useState([])
    const [players, setPlayers] = useState([])
    const [distribution, setDistribution] = useState(false)

    useEffect(() => {
        if (!state.length && typeof id === "string") {
            fetchPlayers()
            socketRef.current = io(BackendURL)
        }
    }, [])

    useEffect(() => {
        fetchRoomState()
    }, [state.length, id])

    const fetchRoomState = async () => {
        const roomState = await getRoomState(id as string)
        setState(roomState.data)
    }

    const fetchPlayers = async () => {
        const allPlayers = await getAllPlayersNames()
        setPlayers(allPlayers.data)
    }

    const onFormSubmit = (e: any) => {
        e.preventDefault()

        if (distribution) {
            return socketRef.current.emit(`room-${id}`, defaultState)
        }

        return socketRef.current.emit(`room-${id}`, state)
    }

    return (
        <>
            <Link to={`/admin`}>
                <Button text={`Back to Admin Dashboard`} />
            </Link>
            <div className="center direction-col">
                <h1>Room #{id}</h1>
                <form
                    onSubmit={onFormSubmit}
                    className="flex direction-col form"
                >
                    <div className="inputs" key="service">
                        <div>
                            <input
                                type="checkbox"
                                id="distribution"
                                onChange={() => {
                                    setDistribution(!distribution)
                                }}
                            />
                            <label htmlFor="distribution">Раздача</label>
                        </div>
                    </div>
                    <Inputs
                        state={state}
                        setState={setState}
                        players={players}
                    />
                    <button type="submit" className="submit">
                        Подтвердить
                    </button>
                </form>
            </div>
        </>
    )
}

export default RoomAdmin
