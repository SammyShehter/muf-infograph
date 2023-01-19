import Mongo from "./mongo.service"

class RoomService {
    private db: typeof Mongo
    constructor(DB: typeof Mongo) {
        this.db = DB
        console.log("RoomService instance created")
    }
}

export default new RoomService(Mongo)
