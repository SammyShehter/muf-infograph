import {ObjectId} from "mongoose"
import {Feed} from "../types/feed.type"
import { singleAnswer } from "../types/http.types"
import {Room, RoomWatchListCheck, UserRoom} from "../types/post.type"
import {pattern} from "../utils/bad-words"
import {feedSorting} from "../utils/common.utils"
import MongooseService from "./mongo.service"
import UserService from "./user.service"

class RoomService {
    private db: typeof MongooseService
    constructor(DB: typeof MongooseService) {
        this.db = DB
        console.log("RoomService instance created")
    }

    getRoomData = async (roomID: string) => {
        
        this.db.
    }

}

export default new RoomService(MongooseService)
