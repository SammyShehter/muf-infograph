import React, {useState, useEffect} from 'react';

const Register = ({setAlert, register, error, isAuthenticated, history}) => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
        portal: "MAFIA",
        role:"USER"
    })

    const {username, email, password, password2} = user

    const onChange = e => setUser({...user, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault()
        if (username==="" || email==="" || password===""){
            setAlert("Enter all fields")
        } else if(password!==password2){
            setAlert("Passwords not identical")
        } else {
            register(username, email, password)
        }
    }

    useEffect(()=>{
        if (isAuthenticated){
            history.push("/")
        }

        if (error){
            setAlert("Network error")
        }
    },[error, isAuthenticated, history])

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nickname</label>
                    <input
                        name="username"
                        value={username}
                        onChange={onChange}

                    />
                </div>

                <div>
                    <label>Email</label>
                    <input name="email" value={email} onChange={onChange}/>
                </div>

                <div>
                    <label>Password</label>
                    <input
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength={6}
                    />
                </div>

                <div>
                    <label>Repeat Password</label>
                    <input
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        minLength={6}
                    />
                </div>

                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
