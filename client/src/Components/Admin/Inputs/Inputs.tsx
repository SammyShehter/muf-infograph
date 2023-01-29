import {useEffect, useState} from "react"
import SelectSearch from "react-select-search"
import {FullLoader} from "../../Loader/Loader"
import "react-select-search/style.css"

export default function Inputs({state, players, setState}: any): any {
    const [result, setResult] = useState([])
    const [click, setClick] = useState(false)

    useEffect(() => {
        const temp: any = []
        if (state.length) {
            roles(temp)
        }
        setResult(temp)
    }, [state, click])

    const playerStatus = (e: any, index: any) => {
        state[index].dead = e.target.checked
        setState(state)
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
        setClick(!click)
        setState(state)
    }

    const playerChange = (value: any, index: number) => {
        setState(() => {
            state[index].player = value
            return state
        })
    }

    const populateOptions = (index: number) => (
        <SelectSearch
            options={players.map((player: any) => ({
                name: player.name,
                value: player.code,
            }))}
            onChange={(value) => playerChange(value, index)}
            defaultValue={state[index].player}
            placeholder="Выберите бойца"
            search
        />
    )

    const roles = (array: any) => {
        for (let index = 0; index < 10; index++) {
            array.push(
                <div className="inputs" key={index}>
                    <h4>Player {index + 1}:</h4>
                    <div>
                        <input
                            className="checkbox"
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
                            className="checkbox"
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
                            className="checkbox"
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
                            className="checkbox"
                            type="checkbox"
                            name="dead"
                            id={`dead${index}`}
                            onChange={(e) => playerStatus(e, index)}
                            defaultChecked={state[index].dead}
                        />
                        <label htmlFor={`dead${index}`}>Мертв</label>
                    </div>
                    {populateOptions(index)}
                </div>
            )
        }
        return array
    }

    if (!state.length) return <FullLoader />

    return result
}
