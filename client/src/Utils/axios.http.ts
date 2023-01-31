import axios from "axios"
import {AuthURL, BackendURL} from "./global.util"
import {
    LoginForm,
    PlayerData,
    PlayerSelect,
    Unpopulated_PlayerInfo,
} from "../Types"

export async function getRoomState(
    roomId: string
): Promise<Array<Unpopulated_PlayerInfo>> {
    try {
        const response = await axios.get(`${BackendURL}/rooms/room/${roomId}`)
        return response.data.data
    } catch (error) {
        return []
    }
}

export async function getAllPlayersNames(): Promise<Array<PlayerSelect>> {
    try {
        const response = await axios.get(`${BackendURL}/players/all`)
        return response.data.data
    } catch (error) {
        return []
    }
}

export async function getPlayerData(
    codesArray: Array<string>
): Promise<Array<PlayerData>> {
    try {
        const response = await axios.post(`${BackendURL}/players/data`, {
            codes: codesArray,
        })
        return response.data.data
    } catch (error) {
        return []
    }
}

export async function loginPostReq(
    form: LoginForm
): Promise<{message: string; data: any}> {
    try {
        const response = await axios.post(`${AuthURL}/login`, form)
        return response.data
    } catch (error) {
        return {message: "FAIL", data: {}}
    }
}

export async function newPlayerReq(
    form: {name: string; image: string},
    token: string
): Promise<{status: string; data: any}> {
    try {
        const response = await axios.post(`${BackendURL}/players/add`, form, {
            headers: {authorization: `Bearer ${token}`},
        })
        return response.data
    } catch (error) {
        return {status: "FAIL", data: {}}
    }
}

export async function validateUser(
    token: string
): Promise<{message: string; data: any}> {
    try {
        const response = await axios.post(
            `${AuthURL}/validation`,
            {},
            {headers: {authorization: `Bearer ${token}`}}
        )
        return response.data
    } catch (error) {
        return {message: "FAIL", data: {}}
    }
}
