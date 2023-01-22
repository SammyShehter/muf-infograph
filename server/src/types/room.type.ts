import {ObjectId} from "mongoose"
import {Player} from "./player.type"

export type Room = {
    _id?: ObjectId
    state: Array<{
        roles: {
            mafia: boolean
            don: boolean
            sheriff: boolean
        }
        dead: boolean
        player: Player | string
    }>
}
