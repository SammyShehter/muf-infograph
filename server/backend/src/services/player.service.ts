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

    private checkSummary = (summary: string | undefined, body: string) =>
        summary ? summary : body.substring(0, 100)

    private createSlug = (title: string) => title.split(" ").join("_")

    private checkRoomForWatchWords = async (postChecks: RoomWatchListCheck) => {
        let problemIn: Array<string> = []

        for (const key in postChecks) {
            if (Object.prototype.hasOwnProperty.call(postChecks, key)) {
                const element = postChecks[key]
                pattern.test(element) && problemIn.push(key)
            }
        }

        if (problemIn.length) {
            UserService.sendEmail({
                to: UserService.moderatorsWithEmails,
                subject: `Watch List detection`,
                body: `Watch list matched in new post. Problems found in posts ${problemIn.join(
                    ", "
                )}. URL to the post ${process.env.URL}/post/read/${
                    postChecks.slug
                }`,
            })
        }
    }

    readRoom = async (slug: string): Promise<Room> => this.db.readRoom(slug)

    addRoom = async (post: Room): Promise<singleAnswer> => {
        post.summary = this.checkSummary(post.summary, post.body)
        post.slug = this.createSlug(post.title)

        const {title, summary, body, slug}: Room = await this.db.addRoom(post)
        this.checkRoomForWatchWords({title, summary, body, slug})
        return {
            message: `New post '${title}' has been added successfully`,
        }
    }

    getPersonalFeed = async (userId: ObjectId): Promise<Array<UserRoom>> => {
        const data: Feed = await this.db.getPersonalFeed(userId)
        if (!data) {
            return []
        }
        let result: Array<UserRoom> = [
            ...data.sameCountryRooms.sort(feedSorting),
            ...data.differentCountryRooms.sort(feedSorting),
        ]
        return result
    }
}

export default new RoomService(MongooseService)
