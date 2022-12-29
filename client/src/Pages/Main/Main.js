import React, {useState, useRef, useEffect} from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import Player from '../../Components/Player'

function Main() {
    const socketRef = useRef()
    const [state, setState] = useState([])

    useEffect(() => {
        if (!state.length) {
            axios
                .get('http://192.168.2.101:4000')
                .then((res) => {
                    setState(res.data)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [state.length])

    useEffect(() => {
        socketRef.current = io.connect('http://192.168.2.101:4000')
        socketRef.current.on('players', (array) => {
            setState(array)
        })

        return () => socketRef.current.disconnect()
    }, [state])

    const renderPlayers = () => {
        if (state.length) {
            return state.map((item, index) => {
                return <Player info={item} key={index} number={index + 1}/>
            })
        } else {
            return <h2>Loading</h2>
        }
    }

    return (
        <>
            <div className='empty-space'/>
            <div className='backgroundBlur'>
                <div className='App'>{renderPlayers()}</div>
            </div>

        </>
    )
}

export default Main
