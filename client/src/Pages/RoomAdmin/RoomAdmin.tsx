import React, {useEffect, useState, useRef} from "react"
import io, {Socket} from "socket.io-client"
import {useParams} from "react-router-dom"
import {getAllPlayersNames, getRoomState} from "../../Utils/axios.http"
import {Link} from "react-router-dom"
import Button from "../../Components/Button"
import Inputs from "../../Components/Admin/Inputs"
import {FullLoader} from "../../Components/Loader/Loader"
import {
    BackendURL,
    defaultState,
    defineRoomNumber,
} from "../../Utils/global.util"
import {Unpopulated_PlayerInfo, PlayerSelect} from "../../Types"

const RoomAdmin = () => {
    const params = useParams()
    const socketRef = useRef<Socket>()
    const [roomNumber, setRoomNumber] = useState("1")
    const [state, setState] = useState<Array<Unpopulated_PlayerInfo>>([])
    const [players, setPlayers] = useState<Array<PlayerSelect>>([])
    const [distribution, setDistribution] = useState(false)

    useEffect(() => {
        const id: string = defineRoomNumber(params.id)
        setRoomNumber(id)
        if (!state.length && typeof id === "string") {
            ;(async () =>
                await Promise.all([fetchRoomState(id), fetchPlayers()]))()
            socketRef.current = io(BackendURL)
        }
    }, [])

    const fetchRoomState = async (roomNumber: string) => {
        const roomState = await getRoomState(roomNumber)
        setState(roomState)
    }

    const fetchPlayers = async () => {
        const allPlayers = await getAllPlayersNames()
        setPlayers(allPlayers)
    }

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (distribution) {
            return socketRef.current!.emit(`room-${roomNumber}`, defaultState)
        }

        return socketRef.current!.emit(`room-${roomNumber}`, state)
    }

    if (!state.length || !players.length) return <FullLoader />

    return (
        <>
            <Link to={`/admin`}>
                <Button text={`Back to Admin Dashboard`} />
            </Link>
            <div className="center direction-col">
                <h1>Room #{roomNumber}</h1>
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
