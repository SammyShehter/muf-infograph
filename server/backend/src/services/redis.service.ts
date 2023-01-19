import {createClient} from "redis"

class Redis {
    client: any
    constructor(createClient) {
        this.client = createClient()
        this.client.on("error", (err: any) =>
            console.log("Redis Client Error", err)
        ) //TODO write error to error.log
    }

    connectWithRetry = async (count: number) => {
        count > 1 && console.log(`Attemptin to connect to Redis. Attempt number ${count}`)
        try {
            await this.client.connect({
                url: `redis://:${process.env.REDIS_PASSWROD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            })
            console.log("Redis is connected")
            return this.client.isReady
        } catch (error) {
            console.log(`Redis connection failed`, error.message, "\n")
            return false
        }
    }

    get connected(){ return this.client.isReady}

    set = async (key: string, value: any) => this.client.set(key, value)

    get = async (key: string) => this.client.get(key)

    disconnect = () => this.client.disconnect()
}

export default new Redis(createClient)
