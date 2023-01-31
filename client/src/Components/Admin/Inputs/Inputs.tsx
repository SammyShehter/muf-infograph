import {useEffect, useState} from "react"
import SelectSearch, {SelectedOptionValue} from "react-select-search"
import {FullLoader} from "../../Loader/Loader"
import "react-select-search/style.css"
import {PlayerSelect, Props, Roles} from "../../../Types"

export default function Inputs({state, players, setState}: Props.Inputs) {
    const [result, setResult] = useState<Array<JSX.Element>>([])
    const [click, setClick] = useState(false)

    useEffect(() => {
        const temp: Array<JSX.Element> = []
        if (state.length) {
            roles(temp)
        }
        setResult(temp)
    }, [state, click])

    const playerStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        state[index].dead = e.target.checked
        setState(state)
    }

    const stateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const {name} = e.target
        for (const role in state[index].roles) {
            if (Object.hasOwnProperty.call(state[index].roles, role)) {
                if (role === name) {
                    state[index].roles[role as keyof Roles] =
                        !state[index].roles[role as keyof Roles]
                } else {
                    state[index].roles[role as keyof Roles] = false
                }
            }
        }
        setClick(!click)
        setState(state)
    }

    const playerChange = (value: SelectedOptionValue, index: number) => {
        setState(() => {
            state[index].player = value as string
            return state
        })
    }

    const populateOptions = (index: number) => (
        <SelectSearch
            options={players.map((player: PlayerSelect) => ({
                name: player.name,
                value: player.code,
            }))}
            onChange={(value) =>
                playerChange(value as SelectedOptionValue, index)
            }
            defaultValue={state[index].player}
            placeholder="Выберите бойца"
            search
        />
    )

    const roles = (array: Array<JSX.Element>) => {
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

    return (<>{result}</>)
}
