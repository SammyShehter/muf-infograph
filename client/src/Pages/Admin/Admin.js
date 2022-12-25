import React, {useEffect, useState, useRef} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const Admin = () => {
    const socketRef = useRef()

    const [state, setState] = useState([])
    const [distribution, setDistribution] = useState(false)

    useEffect(() => {
        if (!state.length) {
            axios
                // .get('https://mafiapi.sammyshehter.com')
                .get('http://localhost:4000')
                .then((res) => {
                    setState(res.data)
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }, [state.length])

    useEffect(() => {
        // socketRef.current = io.connect('https://mafiapi.sammyshehter.com')
        socketRef.current = io.connect('http://localhost:4000')
        return () => socketRef.current.disconnect()
    })

    const stateChange = (e, index) => {
        const {checked, name} = e.target

        setState(() => {
            state[index][name] = checked
            return state
        })
    }

    const playerChange = (e, index) => {
        setState(() => {
            state[index].player = e.target.value
            return state
        })
    }
    const onFormSubmit = (e) => {
        e.preventDefault()

        if (distribution) {
            return socketRef.current.emit('players', [])
        }

        return socketRef.current.emit('players', state)
    }

    const inputs = () => {
        if (!state.length) return
        const result = []
        for (let index = 0; index < 10; index++) {
            result.push(
                <div className='inputs' key={index}>
                    <h4>Player {index + 1}:</h4>
                    <div>
                        <input
                            type='checkbox'
                            name='mafia'
                            id={`mafia${index}`}
                            onChange={(e) => stateChange(e, index)}
                            defaultChecked={state[index].mafia}
                        />
                        <label htmlFor={`mafia${index}`}>Мафия</label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            name='don'
                            id={`don${index}`}
                            onChange={(e) => stateChange(e, index)}
                            defaultChecked={state[index].don}
                        />
                        <label htmlFor={`don${index}`}>Дон</label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            name='sheriff'
                            id={`sheriff${index}`}
                            onChange={(e) => stateChange(e, index)}
                            defaultChecked={state[index].sheriff}
                        />
                        <label htmlFor={`sheriff${index}`}>Шериф</label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            name='dead'
                            id={`dead${index}`}
                            onChange={(e) => stateChange(e, index)}
                            defaultChecked={state[index].dead}
                        />
                        <label htmlFor={`dead${index}`}>Мертв</label>
                    </div>

                    <select
                        name='players'
                        onChange={(e) => playerChange(e, index)}
                        defaultValue={state[index].player}
                    >
                        <option value='Herald'>Выберите бойца</option>
                        <option value='Professor'>Профессор</option>
                        <option value='Ozzmozis'>Ozzmozis</option>
                        <option value='Malek'>Малек</option>
                        <option value='Butterfly'>Butterfly</option>
                        <option value='Avatarka'>Аватарка</option>
                        <option value='Emily'>Emily</option>
                        <option value='Helga'>Хельга</option>
                        <option value='Michael'>Майкл</option>
                        <option value='Rezident'>Резидент</option>
                        <option value='Jezus'>Jezus</option>
                    </select>
                </div>
            )
        }
        return result
    }
    return (
        <form onSubmit={onFormSubmit}>
            <div className='inputs' key='service'>
                <div>
                    <input
                        type='checkbox'
                        id='distribution'
                        onChange={() => {
                            setDistribution(!distribution)
                        }}
                    />
                    <label htmlFor='distribution'>Раздача</label>
                </div>
            </div>
            {inputs()}
            <button type='submit' className='submit'>
                Подтвердить
            </button>
        </form>
    )
}

export default Admin
