import {ObjectId} from "mongoose"

export type Room = {
    _id?: ObjectId
    state: Array<{
        roles: {
            mafia: boolean
            don: boolean
            sheriff: boolean
        }
        dead: boolean
        player: string
    }>
}
