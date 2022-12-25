import React, {useState, useEffect} from 'react';

const Login = ({login, setAlert, error, isAuthenticated, history}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const submitLogin = (e) => {
        e.preventDefault()
        if (username==="" || password===""){
            setAlert("Enter all fields")
        } else {
            login(username,password)
        }
    }

    useEffect(()=>{
        if (isAuthenticated){
            history.push("/")
        }

        if (error){
            setAlert("Invalid credentials")
        }
    },[error, isAuthenticated, history])

    return (
        <form onSubmit={submitLogin}>
            Username:
            <input onChange={e=>setUsername(e.target.value)}/>

            Password:
            <input onChange={e=>setPassword(e.target.value)}/>

            <button onClick={submitLogin}>
                Submit
            </button>

        </form>
    );
};

export default Login;
