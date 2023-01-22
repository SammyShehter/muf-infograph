import {FormEvent, useContext, useEffect, useState} from "react"
import {loginPostReq} from "../../Utils/axios.http"
import AuthContext from "../../Context/AuthContext"
import {FullLoader} from "../../Components/Loader/Loader"
import {Navigate} from "react-router-dom"
import {dayNightBg, userChecks} from "../../Utils/global.util"
import Button from "../../Components/Button"
import Input from "../../Components/Input"

export const Login = () => {
    const {isAuthenticated, login, token, logout} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    useEffect(() => {
        userChecks(login, token, isAuthenticated, setLoading, logout)
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

    if (isAuthenticated && sessionStorage.getItem("token")) {
        return <Navigate to="/admin" />
    }

    return (
        <div className="login-screen" style={dayNightBg()}>
            <div className="login-box">
                <h3 className="welcome-message">Welcome</h3>
                <form onSubmit={loginHandler}>
                    <Input
                        name="username"
                        label="Name"
                        type="text"
                        onChange={changeHandler}
                    />
                    <Input
                        name="password"
                        label="Password"
                        type="password"
                        onChange={changeHandler}
                    />
                    <Button type="submit" disabled={loading} text="Sign In" />
                </form>
            </div>
            {loading && <FullLoader />}
        </div>
    )
}
