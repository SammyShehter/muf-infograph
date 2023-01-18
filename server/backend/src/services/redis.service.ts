import {createClient} from "redis"
import {EventEmitter} from "stream"

class Redis {
    client: any
    constructor(createClient) {
        this.client = createClient()
        this.client.on("error", (err: any) =>
            console.log("Redis Client Error", err)
        ) //TODO write error to error.log
    }

    connectWithRetry = (
        eventEmmiter: EventEmitter,
        count: number = 0,
        retryAttempt: number = 5,
        retrySeconds: number = 5
    ) => {
        if (count >= retryAttempt) {
            console.log("Connection to Redis failed")
            process.exit(1)
        }
        console.log("Attemptin to connect to Redis")
        this.client
            .connect({
                url: `redis://:${process.env.REDIS_PASSWROD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            })
            .then(() => {
                console.log("Redis is connected")
                eventEmmiter.emit("redis_ready")
            })
            .catch(async (err: any) => {
                count++
                console.log(
                    `Redis connection failed, will retry ${count}/${retryAttempt} attempt after ${retrySeconds} seconds`,
                    err.message
                )
                setTimeout(
                    () => this.connectWithRetry(eventEmmiter, count),
                    retrySeconds * 1000
                )
            })
    }

    set = async (key: string, value: any) => this.client.set(key, value)

    get = async (key: string) => this.client.get(key)

    disconnect = () => this.client.disconnect()
}

export default new Redis(createClient)