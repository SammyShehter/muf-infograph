import {useEffect, useState} from "react"
import {PlayerSelect} from "../../Types"
import {deletePlayers} from "../../Utils/axios.http"
import {fetchPlayers} from "../../Utils/global.util"
import Button from "../Button"
import Input from "../Input"
import {Loader} from "../Loader/Loader"

function PlayersManageItem({name, _, selected, onClick}: any) {
    return (
        <div onClick={onClick} className="player flex">
            <input type="checkbox" checked={!!selected} onChange={() => {}} />
            <p>{name}</p>
        </div>
    )
}

export default function PlayersManage() {
    const [click, setClick] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState({})
    const [players, setPlayers] = useState<
        Array<PlayerSelect & {show: boolean}>
    >([])
    useEffect(() => {
        fetchPlayers(setPlayers).then((_) => {
            setPlayers((players) =>
                players.map((player) => ({...player, show: true}))
            )
        })
    }, [])

    const playersToDelete = () =>
        Object.entries(selected)
            .filter((item) => item[1])
            .map((item) => item[0])

    const selectPlayer = (code: string) => {
        setSelected((selected: any) => {
            selected[code as keyof typeof selected] =
                !selected[code as keyof typeof selected]
            return selected
        })
    }

    const renderPlayersManage = () => {
        return players.map(({name, code, show}) => {
            return (
                show && (
                    <PlayersManageItem
                        key={code}
                        onClick={() => {
                            selectPlayer(code)
                            setClick(!click)
                        }}
                        name={name}
                        code={code}
                        selected={selected[code as keyof typeof selected]}
                    />
                )
            )
        })
    }

    const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.value.length) {
            return setPlayers(
                players.map((player) => {
                    player.show = true
                    return player
                })
            )
        }

        setPlayers(
            players.map((player) => {
                player.name
                    .toLowerCase()
                    .includes(event.currentTarget.value.toLowerCase())
                    ? (player.show = true)
                    : (player.show = false)

                return player
            })
        )
    }

    if (!players || loading) return <Loader />

    return (
        <div className="playersManagement flex direction-col">
            <div className="header flex">
                <p className="selected">
                    Selected:&nbsp;
                    {playersToDelete().length}
                    &nbsp;players
                </p>
                <Input
                    name="search"
                    label="Search"
                    type="text"
                    onChange={searchHandler}
                />
                <Button
                    disabled={!playersToDelete().length}
                    text="Delete"
                    onClick={async () => {
                        setLoading(true)
                        await deletePlayers(playersToDelete())
                        await fetchPlayers(setPlayers).then((_) => {
                            setPlayers((players) =>
                                players.map((player) => ({
                                    ...player,
                                    show: true,
                                }))
                            )
                        })
                        setSelected({})
                        setLoading(false)
                    }}
                />
            </div>
            <div className="inputs">{renderPlayersManage()}</div>
        </div>
    )
}
