import { Roles, Props, PlayerData } from "../../Types"

export default function Player ({info, number}: Props.Player){
    const styleProps = (roles: Roles) => {
        for (const prop in roles) {
            if (roles[prop as keyof Roles]) return prop
        }
    }

    return (
        <div className={`imgWrapper ${info.dead ? "dead" : "alive"} ${info.vote ? "vote" : "noVote"}`}>
            <h4 className={info.roles.mafia || info.roles.don ? "black" : "red"}>{number}</h4>
            <div className={styleProps(info.roles)}/>
            <img src={info.player ? info.player.image : "/Herald.jpg"} alt={"k"}/>
        </div>

    )
}