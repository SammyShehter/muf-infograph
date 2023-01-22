const Player = ({info, number}: any) => {
    const styleProps = (info: any) => {
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
            <img src={info.player.image || "/Herald.jpg"} alt={'k'}/>
        </div>

    )
}

export default Player