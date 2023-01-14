import axios from "axios"
import {AuthURL, BackendURL} from "./global.util"

export async function getRoomState(roomId: string) {
    try {
        const response = await axios.get(`${BackendURL}/room/${roomId}`)
        return response.data
    } catch (error) {
        return []
    }
}

export async function getAllPlayersNames() {
    try {
        const response = await axios.get(`${BackendURL}/players/all`)
        return response.data
    } catch (error) {
        return []
    }
}

export async function loginPostReq(form: any) {
    try {
        const response = await axios.post(`${AuthURL}/login`, {...form})
        return response.data
    } catch (error) {
        return ""
    }
}

export async function validateUser(token: string) {
    try {
        const response = await axios.post(
            `${AuthURL}/validation`,
            {},
            {headers: {authorization: `Bearer ${token}`}}
        )
        return response.data
    } catch (error) {
        return ""
    }
}
