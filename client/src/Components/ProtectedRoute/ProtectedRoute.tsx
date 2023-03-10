import {useContext, useEffect, useState} from "react"
import {Navigate, Outlet} from "react-router-dom"
import AuthContext from "../../Context/AuthContext"
import {userChecks} from "../../Utils/global.util"
import {FullLoader} from "../Loader/Loader"

function ProtectedRoute() {
    let {isAuthenticated, token, login, logout} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        userChecks(login, token, setLoading, logout)
    }, [])

    if (loading) return <FullLoader />

    if (isAuthenticated && !loading) return <Outlet />

    return <Navigate to="/login" />
}

export default ProtectedRoute
