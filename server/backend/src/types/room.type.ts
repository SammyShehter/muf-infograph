import {ObjectId} from "mongoose"

export type Room = {
    _id?: ObjectId
    name: string
    code: string
    image: string
}
