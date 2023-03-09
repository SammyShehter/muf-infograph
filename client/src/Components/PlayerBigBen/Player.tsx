import { Roles, Props, PlayerData } from "../../Types"

export default function Player ({info, number}: Props.Player){
    const styleProps = (roles: Roles) => {
        for (const prop in roles) {
            if (roles[prop as keyof Roles]) return prop
        }
    }

    const defineHeraldRole = () => {
        switch (true) {
            case info.roles.sheriff:
                return '/Herald-sheriff.jpg'
        
            default:
                return '/Herald.jpg';
        }
    }

    return (
        <div className="player-wrapper">
            <div className={`not-alive ${info.dead ? "dead-icon" : ""} ${info.vote ? "voted-icon" : ""}`}></div>
            <div className={`player-card citizen side-front ${info.rotate ? "side--front" : ""} ${info.roles.don ? "don" : ""} ${info.roles.mafia ? "mafia" : ""} ${info.roles.sheriff ? "sheriff" : ""} ${info.dead ? "dead" : "alive"} ${info.vote ? "vote" : "noVote"}`}>
                <img src={info.player ? info.player.image : defineHeraldRole()} alt='#'/>
                {(info.vote || info.dead) &&
                    <div className="background-dead-voted"></div>
                }
            </div>
            
            <div 
                className={`player-card side-back 
                            ${info.rotate ? "side--back" : ""} 
                            ${info.roles.don ? "don-card" : ""} 
                            ${info.roles.mafia ? "mafia-card" : ""} 
                            ${info.roles.sheriff ? "sheriff-card" : ""}
                            ${!info.roles.sheriff && !info.roles.don ? "citizen-card" : ""}
                            ${info.dead ? "dead" : "alive"} ${info.vote ? "vote" : "noVote"}`
                            }>
            </div>

            {info.player  &&
            <div className="player-bottom">
                <div className={`player-number ${info.roles.don ? "don" : ""} ${info.roles.mafia ? "mafia" : ""} ${info.roles.sheriff ? "sheriff" : ""}`}>{number}</div>
                <div className="player-name">{info.player?.name}</div>
            </div>
            }
        </div>
    )
}