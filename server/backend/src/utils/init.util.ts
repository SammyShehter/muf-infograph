import Mongo from "../services/mongo.service"
import {EventEmitter} from "stream"
import Redis from "../services/redis.service"

export const initEvents = new EventEmitter()

export function init() {
    //check that env file exists
    if (process.env.INIT !== "fine") {
        console.log("env file is not confiured")
        process.exit(1)
    }

    // check data base connection
    Redis.connectWithRetry(initEvents)
    // check data base connection
    initEvents.once("redis_ready", () => Mongo.connectWithRetry(initEvents)) // TODO is the best solution?
}
