import {FormEvent, useState} from "react"
import Loader from "../../Components/Loader"

export const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const changeHandler = (event: any) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    }
    const loginHandler = async (e: FormEvent) => {
        try {
            e.preventDefault()
            console.log(form)
        } catch (e) {
            console.log(e)
        }
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

    return (
        <div className="login-screen" style={dayNightBg()}>
            <div className="login-box">
                <h3 className="welcome-message">Welcome</h3>
                <form onSubmit={loginHandler}>
                <div className="group">
                    <input
                        type="text"
                        name="email"
                        onChange={changeHandler}
                        required
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email</label>
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
                <button
                    className="button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Sign in"}
                </button>
                </form>
            </div>
        </div>
    )
}
