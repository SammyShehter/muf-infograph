import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Main from "../Pages/Main"
import Admin from "../Pages/Admin"
import "../Styles/main.scss"
import Login from "../Pages/Login"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/room/:id" element={<Main/>} />
                <Route path="/room/admin/:id" element={<Admin/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>
    )
}

export default App
