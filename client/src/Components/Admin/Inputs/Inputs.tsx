import {useEffect, useState} from "react"
import SelectSearch, {SelectedOptionValue} from "react-select-search"
import {FullLoader} from "../../Loader/Loader"
import "react-select-search/style.css"
import {
    PlayerSelect,
    Props,
    Roles,
    Unpopulated_PlayerInfo,
} from "../../../Types"

function Input({index, stateChange, roomState, name, rName, checked}: any) {

    return (
        <div>
            <input
                className="checkbox"
                type="checkbox"
                name={name}
                id={`${name}${index}`}
                onChange={(e) => stateChange(e, index)}
                checked={checked}
            />
            <label htmlFor={`${name}${index}`}>{rName}</label>
        </div>
    )
}

export default function Inputs({
    roomState,
    players,
    setRoomState,
}: Props.Inputs) {
    const [result, setResult] = useState<Array<JSX.Element>>([])
    const [click, setClick] = useState(false)

    useEffect(() => {
        if (roomState.length) setResult(roles(roomState))
    }, [roomState, click])

    const playerStatus = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        roomState[index].vote = false
        roomState[index].dead = false
        // @ts-ignore
        roomState[index][e.target.name] = e.target.checked
        setClick(!click)
        setRoomState(roomState)
    }

    const stateChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const {name} = e.target
        for (const role in roomState[index].roles) {
            if (Object.hasOwnProperty.call(roomState[index].roles, role)) {
                if (role === name) {
                    roomState[index].roles[role as keyof Roles] =
                        !roomState[index].roles[role as keyof Roles]
                } else {
                    roomState[index].roles[role as keyof Roles] = false
                }
            }
        }
        setClick(!click)
        setRoomState(roomState)
    }

    const playerChange = (value: SelectedOptionValue, index: number) => {
        setRoomState(() => {
            roomState[index].player = value as string
            return roomState
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
            defaultValue={roomState[index].player}
            placeholder="Выберите бойца"
            search
        />
    )

    const roles = (roomState: Array<Unpopulated_PlayerInfo>) => {
        return new Array(10).fill(0).map((_, index) => (
            <div className="inputs" key={index}>
                <h4>Player {index + 1}:</h4>
                <Input
                    name="mafia"
                    rName="Мафия"
                    index={index}
                    stateChange={stateChange}
                    roomState={roomState}
                    checked={roomState[index].roles.mafia}
                />
                <Input
                    name="don"
                    rName="Дон"
                    index={index}
                    stateChange={stateChange}
                    roomState={roomState}
                    checked={roomState[index].roles.don}
                />
                <Input
                    name="sheriff"
                    rName="Шериф"
                    index={index}
                    stateChange={stateChange}
                    roomState={roomState}
                    checked={roomState[index].roles.sheriff}
                />
                <Input
                    name="dead"
                    rName="Убит"
                    index={index}
                    stateChange={playerStatus}
                    roomState={roomState}
                    checked={roomState[index].dead}
                />
                <Input
                    name="vote"
                    rName="Заголосован"
                    index={index}
                    stateChange={playerStatus}
                    roomState={roomState}
                    checked={roomState[index].vote}
                />
                <Input
                    name="rotate"
                    rName="Крутилка"
                    index={index}
                    stateChange={playerStatus}
                    roomState={roomState}
                    checked={roomState[index].rotate}
                />
                {populateOptions(index)}
            </div>
        ))
    }

    if (!roomState.length) return <FullLoader />

    return <>{result}</>
}
