import {Room} from "../types/room.type"
import Mongo from "./mongo.service"
import Redis from "./redis.service"

class RoomService {
    private db: typeof Mongo
    private cache: typeof Redis
    private defaultState = new Array(10).fill({
        roles: {
            mafia: false,
            don: false,
            sheriff: false,
        },
        dead: false,
        player: "Herald",
    })

    constructor(DB: typeof Mongo, Cache: typeof Redis) {
        this.db = DB
        this.cache = Cache
        console.log("RoomService instance created")
    }

    getRoomData = async (roomID: string) => {
        const roomState = await this.cache.get(roomID)
        if (!roomState) return this.defaultState
        return roomState
    }

    setRoomData = async (roomID: string, roomState: Array<Room>) => {
        this.cache.set(roomID, roomState)
    }
}

export default new RoomService(Mongo, Redis)
