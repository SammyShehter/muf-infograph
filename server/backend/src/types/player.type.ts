import {ObjectId} from "mongoose"

export type Player = {
    _id?: ObjectId
    name: string
    code: string
    image: string
}
