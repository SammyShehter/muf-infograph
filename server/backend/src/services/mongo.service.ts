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
            name: {type: String, required: true},
            code: {type: String, required: true},
            image: {type: String, required: true},
        },
        {timestamps: true, versionKey: false}
    )

    private roomSchema = new Schema<Room>(
        {
            name: {type: String, required: true},
            players: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "players",
                },
            ],
        },
        {timestamps: true, versionKey: false}
    )

    connectWithRetry = async (count: number) => {
        count > 1 && console.log(`Attemptin to connect to Mongo DB. Attempt number ${count}`)
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

    get connected() {return mongoose.connection.readyState}

    playerStorage = mongoose.model<Player>("players", this.playerSchema)
    roomStorage = mongoose.model<Room>("rooms", this.roomSchema)

    // showUsers = async (): Promise<Array<User>> =>
    //     this.usersStorage
    //         .find({}, {_id: 0, name: 1, token: 1, role: 1, communities: 1})
    //         .populate({path: "communities", select: {_id: 0, slug: 1}})

    // getModeratorsWithEmails = async () =>
    //     this.usersStorage
    //         .find(
    //             {
    //                 $and: [{role: {$ne: null}, email: {$ne: null}}],
    //             },
    //             {_id: 0, email: 1}
    //         )
    //         .lean()

    // getUser = async (token: string): Promise<User> => {
    //     let rawUser = await this.usersStorage.findOne({token})
    //     if (rawUser)
    //         await rawUser.populate({path: "communities", select: {slug: 1}})
    //     return rawUser
    // }

    // addRoom = async (post: Room) => this.postStorage.create({...post})

    // readRoom = async (slug: string) =>
    //     this.postStorage
    //         .findOne({slug}, {_id: 0})
    //         .populate("author", {_id: 0, name: 1, image: 1})
    //         .populate("community", {_id: 0, title: 1, image: 1, memberCount: 1})

    // getPersonalFeed = async (userId: ObjectId) =>
    //     this.feedStorage
    //         .findOne({userId})
    //         .populate("sameCountryRooms", {
    //             _id: 0,
    //             title: 1,
    //             slug: 1,
    //             body: 1,
    //             summary: 1,
    //             likes: 1,
    //         })
    //         .populate("differentCountryRooms", {
    //             _id: 0,
    //             title: 1,
    //             slug: 1,
    //             body: 1,
    //             summary: 1,
    //             likes: 1,
    //         })
}

export default new Mongo()
