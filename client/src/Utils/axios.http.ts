import axios from "axios"
import { BackendURL } from "./global.util"

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

export async function login({email, password}: any) {
    try {
        const response = await axios.post()
    } catch (error) {
        return ""
    }
}

export async function validateUser() {
    try {
        
    } catch (error) {
        return ""
    }
}