import {validateUser} from "./axios.http"

const baseURL = "http://localhost"
export const BackendURL = `${baseURL}:4000`
export const AuthURL = `${baseURL}:10000`

export const userChecks = async (
    login: Function,
    token: string,
    setLoading: Function,
    logout: Function
) => {
    const authToken = token.length ? token : sessionStorage.getItem("token")
    if (!authToken) {
        setLoading(false)
        logout()
        return
    }
    const userInfo = await validateUser(authToken)

    if (userInfo.message === "SUCCESS" && userInfo.data.role === "ADMIN") {
        login(authToken)
        setLoading(false)
        return
    }
    logout()
}

export function dayNightBg() {
    const clock = new Date().getHours()
    const inlineStyle = {
        background: 'url("/12.jpeg") center',
        backgroundSize: "cover",
    }
    clock > 7 && clock < 19
        ? (inlineStyle.background = 'url("/12.jpeg") center')
        : (inlineStyle.background = 'url("/24.jpeg") center')
    return inlineStyle
}

export const defaultState = new Array(10).fill({
    roles: {
        mafia: false,
        don: false,
        sheriff: false,
    },
    dead: false,
    player: "herald",
})

export function defineRoomNumber(id: string | undefined): string {
    if (!id) return "1"
    const asNumber = +id
    if (Number.isNaN(asNumber)) return "1"
    return isFinite(asNumber) || asNumber < 1 || asNumber > 8 ? id : "1"
}
