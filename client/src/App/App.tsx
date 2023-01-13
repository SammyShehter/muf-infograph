import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Main from "../Pages/Main"
import Admin from "../Pages/Admin"
import "../Styles/main.scss"
import Login from "../Pages/Login"
import {useState} from "react"
import ProtectedRoute from "../Components/ProtectedRoute"
import AuthContext from "../Context/AuthContext"

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState("")

    const login = (token: string) => {
        setIsAuthenticated(true)
        setToken(token)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setToken("null")
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                token,
                login,
                logout,
            }}
        >
            <Router>
                <Routes>
                    <Route path="/room/:id" element={<Main />} />
                    <Route path="/room/admin/:id" element={<ProtectedRoute />}>
                        <Route path="/room/admin/:id" element={<Admin />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
