import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Room from "../Pages/Room"
import Admin from "../Pages/Admin"
import "../Styles/main.scss"
import Login from "../Pages/Login"
import {useState} from "react"
import ProtectedRoute from "../Components/ProtectedRoute"
import AuthContext from "../Context/AuthContext"
import RoomAdmin from "../Pages/RoomAdmin"
import FrontPage from "../Pages/FrontPage"

export default function App () {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState("")

    const login = (token: string) => {
        setIsAuthenticated(true)
        setToken(token)
        sessionStorage.setItem("token", token)
    }

    const logout = () => {
        setIsAuthenticated(false)
        setToken("")
        sessionStorage.setItem("token", "")
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
                    <Route path="/room/:id" element={<Room />} />
                    <Route path="/room/admin/:id" element={<ProtectedRoute />}>
                        <Route path="/room/admin/:id" element={<RoomAdmin />} />
                    </Route>
                    <Route path="/admin" element={<ProtectedRoute />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<FrontPage />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    )
}
