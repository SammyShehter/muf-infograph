import {FormEvent, useContext, useEffect, useState} from "react"
import {loginPostReq} from "../../Utils/axios.http"
import AuthContext from "../../Context/AuthContext"
import {FullLoader} from "../../Components/Loader/Loader"
import {Navigate} from "react-router-dom"
import {userChecks} from "../../Utils/global.util"

export const Login = () => {
    const {isAuthenticated, login, token} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        userChecks(login, token, isAuthenticated, setLoading)
    }, [])

    const changeHandler = (event: any) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const loginHandler = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)
            const creds = await loginPostReq(form)
            if (creds.message === "SUCCESS") {
                login(creds.data.token)
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    const dayNightBg = () => {
        const clock = new Date().getHours()
        const inlineStyle = {
            background: 'url("./12.jpeg") center',
            backgroundSize: "cover",
        }
        clock > 7 && clock < 19
            ? (inlineStyle.background = 'url("./12.jpeg") center')
            : (inlineStyle.background = 'url("./24.jpeg") center')
        return inlineStyle
    }

    if (isAuthenticated && sessionStorage.getItem("token")) {
        return <Navigate to="/admin" />
    }

    return (
        <div className="login-screen" style={dayNightBg()}>
            <div className="login-box">
                <h3 className="welcome-message">Welcome</h3>
                <form onSubmit={loginHandler}>
                    <div className="group">
                        <input
                            type="text"
                            name="username"
                            onChange={changeHandler}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Name</label>
                    </div>
                    <div className="group">
                        <input
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            required
                        />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                        <label>Password</label>
                    </div>
                    <button className="button" type="submit" disabled={loading}>
                        Sign In
                    </button>
                </form>
            </div>
            {loading && <FullLoader />}
        </div>
    )
}
