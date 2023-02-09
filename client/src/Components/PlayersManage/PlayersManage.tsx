import {useEffect, useState} from "react"
import {PlayerSelect} from "../../Types"
import {fetchPlayers} from "../../Utils/global.util"
import {Loader} from "../Loader/Loader"

function PlayersManageItem({name, code, selected, onClick}: any) {

    return (
        <div onClick={onClick}>
            Player: {name}, Code: {code} Selected: {`${!!selected}`}
        </div>
    )
}

export default function PlayersManage() {
    const [click,setClick] = useState(false)
    const [selected, setSelected] = useState({})
    const [players, setPlayers] = useState<Array<PlayerSelect>>([])
    useEffect(() => {
        // call for all players
        fetchPlayers(setPlayers)
    }, [])

    const selectPlayer = (code: string) => {
        setSelected((selected: any) => {
            selected[code as keyof typeof selected] =
                !selected[code as keyof typeof selected]
                // console.log(selected);
                
            return selected
        })
    }

    const renderPlayersManage = () => {
        return players.map(({name, code}) => {
            return (
                <PlayersManageItem
                    key={code}
                    onClick={() => {selectPlayer(code); setClick(!click)}}
                    name={name}
                    code={code}
                    selected={selected[code as keyof typeof selected]}
                />
            )
        })
    }

    if (!players) return <Loader />

    return <>{renderPlayersManage()}</>
}
