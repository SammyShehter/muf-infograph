import React, {useEffect, useState, useRef} from "react"
import {Loader} from "../../Components/Loader"
import io from "socket.io-client"
import axios from "axios"
import { URL } from "../../Utils/global.util"

const Inputs = ({state, players, setState}) => {
    const [result, setResult] = useState([])
    const [click, setClick] = useState(false)
    useEffect(() => {
        const temp = []
        if (state.length) {
            roles(temp)
        }
        setResult(() => temp)
    }, [state, click])

    const playerStatus = (e, index) => {
        state[index].dead = e.target.checked
        setState(() => state)
    }

    const stateChange = (e, index) => {
        const {name} = e.target
        for (const role in state[index].roles) {
            if (Object.hasOwnProperty.call(state[index].roles, role)) {
                if (role === name) {
                    state[index].roles[role] = !state[index].roles[role]
                } else {
                    state[index].roles[role] = false
                }
            }
        }
        setClick(() => !click)
        setState(() => state)
    }

    const playerChange = (e, index) => {
        setState(() => {
            state[index].player = e.target.value
            return state
        })
    }

    const populateOptions = () =>
        players.map((player) => (
            <option value={player.code} key={player.code}>
                {player.name}
            </option>
        ))

    const roles = (array) => {
        for (let index = 0; index < 10; index++) {
            array.push(
                <div className="inputs" key={index}>
                    <h4>Player {index + 1}:</h4>
                    <div>
                        <input
                            type="checkbox"
                            name="mafia"
                            id={`mafia${index}`}
                            onChange={(e) => stateChange(e, index)}
                            key={`mafia_${index}_${state[index].roles.mafia}`}
                            defaultChecked={state[index].roles.mafia}
                        />
                        <label htmlFor={`mafia${index}`}>Мафия</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="don"
                            id={`don${index}`}
                            onChange={(e) => stateChange(e, index)}
                            key={`don_${index}_${state[index].roles.don}`}
                            defaultChecked={state[index].roles.don}
                        />
                        <label htmlFor={`don${index}`}>Дон</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sheriff"
                            id={`sheriff${index}`}
                            onChange={(e) => stateChange(e, index)}
                            key={`sheriff_${index}_${state[index].roles.sheriff}`}
                            defaultChecked={state[index].roles.sheriff}
                        />
                        <label htmlFor={`sheriff${index}`}>Шериф</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="dead"
                            id={`dead${index}`}
                            onChange={(e) => playerStatus(e, index)}
                            defaultChecked={state[index].dead}
                        />
                        <label htmlFor={`dead${index}`}>Мертв</label>
                    </div>

                    <select
                        name="players"
                        onChange={(e) => playerChange(e, index)}
                        defaultValue={state[index].player}
                    >
                        <option value="Herald" key="default">
                            Выберите бойца
                        </option>
                        {populateOptions()}
                    </select>
                </div>
            )
        }
        return array
    }

    if (!state.length) return <Loader />

    return result
}

const Admin = ({match}) => {
    const socketRef = useRef()

    const [state, setState] = useState([])
    const [players, setPlayers] = useState([])
    const [distribution, setDistribution] = useState(false)

    useEffect(() => {
        fetchPlayers()
        socketRef.current = io.connect(`${URL}`)
        return () => socketRef.current.disconnect()
    }, [])

    useEffect(() => {
        fetchRoomState()
    }, [state.length, match.params.id])

    const fetchRoomState = async () => {
        if (!state.length) {
            const roomRes = await axios.get(
                `${URL}/room/${match.params.id}`
            )

            setState(roomRes.data)
        }
    }

    const fetchPlayers = async () => {
        const playersData = await axios.get(
            `${URL}/players/all`
        )
        setPlayers(playersData.data)
    }
    const onFormSubmit = (e) => {
        e.preventDefault()

        if (distribution) {
            return socketRef.current.emit(`room-${match.params.id}`, [])
        }

        return socketRef.current.emit(`room-${match.params.id}`, state)
    }

    return (
        <>
            <div className="center direction-col">
                <h1>Room #{match.params.id}</h1>
                <form onSubmit={onFormSubmit}>
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

export default Admin
