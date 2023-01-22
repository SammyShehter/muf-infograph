import mongoose, {Schema} from "mongoose"
import {Player} from "../types/player.type"
import {Room} from "../types/room.type"

class Mongo {
    constructor() {
        console.log("Mongo instance created")
        mongoose.set("strictQuery", true)
    }

    private playerSchema = new Schema<Player>(
        {
            name: {type: String, required: true, unique: true},
            code: {type: String, required: true, unique: true},
            image: {type: String, required: true},
        },
        {timestamps: true, versionKey: false}
    )

    private roomSchema = new Schema<Room>(
        {
            state: [
                {
                    dead: {type: Boolean, required: true, default: false},
                    roles: {
                        mafia: {type: Boolean, required: true, default: false},
                        don: {type: Boolean, required: true, default: false},
                        sheriff: {
                            type: Boolean,
                            required: true,
                            default: false,
                        },
                    },
                    player: {
                        type: Schema.Types.ObjectId,
                        ref: "players",
                    },
                },
            ],
        },
        {timestamps: true, versionKey: false}
    )

    connectWithRetry = async (count: number) => {
        count > 1 &&
            console.log(
                `Attemptin to connect to Mongo DB. Attempt number ${count}`
            )
        try {
            await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
                dbName: "muf",
            })
            console.log("MongoDB is connected")
            return true
        } catch (error) {
            console.log(`Mongo connection failed`, error.message, "\n")
            return false
        }
    }

    get connected() {
        return mongoose.connection.readyState
    }

    private playerStorage = mongoose.model<Player>("players", this.playerSchema)
    private roomStorage = mongoose.model<Room>("rooms", this.roomSchema)

    addPlayer = async (player: Player) => this.playerStorage.create(player)

    getPlayerByCode = async (code: {code: string}) =>
        this.playerStorage.findOne(code).exec()

    allPlayers = async () =>
        this.playerStorage.find({}, {_id: 0, name: 1, code: 1}).exec()

    fetchPlayersData = async (codes: Array<string>) =>
        this.playerStorage
            .find({code: {$in: codes}}, {_id: 0, code: 1, image: 1})
            .exec()
}

export default new Mongo()
