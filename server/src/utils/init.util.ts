import Mongo from "../services/mongo.service"
import {EventEmitter} from "stream"
import Redis from "../services/redis.service"
import {sleep} from "./common.utils"

export const initEvents = new EventEmitter()

export async function init() {
    //check that env file exists
    if (process.env.INIT !== "fine") {
        console.log("env file is not confiured")
        process.exit(1)
    }

    let count: number = 1
    let checks: boolean = false

    while (count <= 5) {
        checks = (
            await Promise.all([
                Redis.connected || Redis.connectWithRetry(count),
                Mongo.connected || Mongo.connectWithRetry(count),
            ])
        ).every((i) => i === true)
        if (!checks) {
            count++
            await sleep(5)
            continue
        } else break
    }

    checks ? initEvents.emit("ready") : process.exit(1)
}
