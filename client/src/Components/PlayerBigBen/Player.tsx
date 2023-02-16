import { Roles, Props, PlayerData } from "../../Types"

export default function Player ({info, number}: Props.Player){
    const styleProps = (roles: Roles) => {
        for (const prop in roles) {
            if (roles[prop as keyof Roles]) return prop
        }
    }

    console.log(info)

    return (
        <div className="player-wrapper">
            <div className={`player-card citizen ${info.roles.don ? "don" : ""} ${info.roles.mafia ? "mafia" : ""} ${info.roles.sheriff ? "sheriff" : ""} ${info.dead ? "dead" : "alive"} ${info.vote ? "vote" : "noVote"}`}>
                <div className={styleProps(info.roles)}/>
                <img src={info.player ? info.player.image : "/Herald.jpg"} alt='#'/>
            </div>
            <div className="player-bottom">
                    <div className={`player-number ${info.roles.don ? "don" : ""} ${info.roles.mafia ? "mafia" : ""} ${info.roles.sheriff ? "sheriff" : ""}`}>{number}</div>
                    <div className="player-name"></div>
                </div>
        </div>
    )
}