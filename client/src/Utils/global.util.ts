import { validateUser } from "./axios.http"

const baseURL = "http://192.168.1.146"
export const BackendURL = `${baseURL}:4000`
export const AuthURL = `${baseURL}:10000`

export const userChecks = async (login: Function, token: string, isAuthenticated: boolean, setLoading: Function) => {
    const authToken = token.length ? token : sessionStorage.getItem("token")
    if (!authToken) {
        isAuthenticated = false
        setLoading(false)
        return
    }
    const userInfo = await validateUser(authToken)
    console.log(userInfo)

    if (userInfo && userInfo.message === "SUCCESS") {
        login(authToken)
        setLoading(false)
    }
}