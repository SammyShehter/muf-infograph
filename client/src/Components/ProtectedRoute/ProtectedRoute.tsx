import {useCallback, useContext, useEffect, useState} from "react"
import {Navigate, Outlet} from "react-router-dom"
import AuthContext from "../../Context/AuthContext"
import {validateUser} from "../../Utils/axios.http"
import { userChecks } from "../../Utils/global.util"
import {FullLoader} from "../Loader/Loader"

function ProtectedRoute() {
    let {isAuthenticated, token, login} = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        userChecks(login, token, isAuthenticated, setLoading)
    }, [])

    if (loading) {
        return <FullLoader />
    }

    if (isAuthenticated && !loading) {
        return <Outlet />
    }

    return <Navigate to="/login" />
}

export default ProtectedRoute
