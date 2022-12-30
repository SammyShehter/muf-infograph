import React from "react"

const Player = ({info, number}) => {
    const styleProps = (info) => {
        let styledObj = ''
        for (const prop in info) {

            if (info.hasOwnProperty(prop) && info[prop] === true && prop !== 'dead') {
                styledObj += ` ${prop}`
            }
        }

        return styledObj
    }

    return (

        <div className={`imgWrapper ${info.dead ? 'dead' : 'alive'}`}>
            <h4 className={info.roles.mafia || info.roles.don ? 'black' : 'red'}>{number}</h4>
            <div className={styleProps(info.roles)}/>
            <img src={`http://localhost:4000/players/image/${info.player}`} alt={'k'}/>
        </div>

    )
}

export default Player