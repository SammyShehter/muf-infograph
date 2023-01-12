import {useEffect, useState, useRef} from "react"
import Loader from "../../Components/Loader"
import io from "socket.io-client"
import axios from "axios"
import {URL} from "../../Utils/global.util"
import {useParams} from "react-router-dom"

const Inputs = ({state, players, setState}: any): any => {
    const [result, setResult] = useState([])
    const [click, setClick] = useState(false)
    useEffect(() => {
        const temp: any = []
        if (state.length) {
            roles(temp)
        }
        setResult(() => temp)
    }, [state, click])

    const playerStatus = (e: any, index: any) => {
        state[index].dead = e.target.checked
        setState(() => state)
    }

    const stateChange = (e: any, index: any) => {
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

    const playerChange = (e: any, index: any) => {
        setState(() => {
            state[index].player = e.target.value
            return state
        })
    }

    const populateOptions = () =>
        players.map((player: any) => (
            <option value={player.code} key={player.code}>
                {player.name}
            </option>
        ))

    const roles = (array: any) => {
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

const Admin = () => {
    const {id} = useParams()
    const socketRef: any = useRef()

    const [state, setState] = useState([])
    const [players, setPlayers] = useState([])
    const [distribution, setDistribution] = useState(false)

    useEffect(() => {
        fetchPlayers()
        socketRef.current = io(`${URL}`)
    }, [])

    useEffect(() => {
        fetchRoomState()
    }, [state.length, id])

    const fetchRoomState = async () => {
        if (!state.length) {
            const roomRes = await axios.get(`${URL}/room/${id}`)

            setState(roomRes.data)
        }
    }

    const fetchPlayers = async () => {
        const playersData = await axios.get(`${URL}/players/all`)
        setPlayers(playersData.data)
    }

    const onFormSubmit = (e: any) => {
        e.preventDefault()

        if (distribution) {
            return socketRef.current.emit(`room-${id}`, [])
        }

        return socketRef.current.emit(`room-${id}`, state)
    }

    return (
        <>
            <div className="center direction-col">
                <h1>Room #{id}</h1>
                <form onSubmit={onFormSubmit} className="form">
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
