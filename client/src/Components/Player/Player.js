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
            <h4 className={info.mafia || info.don ? 'black' : 'red'}>{number}</h4>
            <div className={styleProps(info)}/>
            <img src={`./players/${info.player}.jpg`} alt={'k'}/>
        </div>

    )
}

export default Player