import axios from "axios"
import {AuthURL, BackendURL} from "./global.util"

export async function getRoomState(roomId: string) {
    try {
        const response = await axios.get(`${BackendURL}/rooms/room/${roomId}`)
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

export async function getPlayerData(codesArray: Array<string>) {
    try {
        const response = await axios.post(`${BackendURL}/players/data`, {codes: codesArray})
        return response.data
    } catch (error) {
        return []
    }
}

export async function loginPostReq(form: any) {
    try {
        const response = await axios.post(`${AuthURL}/login`, form)
        return response.data
    } catch (error) {
        return ""
    }
}

export async function newPlayerReq(form: any, token: string) {
    try {
        const response = await axios.post(
            `${BackendURL}/players/add`,
            form,
            {headers: {authorization: `Bearer ${token}`}}
        )
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
