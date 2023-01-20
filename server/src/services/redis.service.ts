import {createClient} from "redis"

class Redis {
    client: any = {isReady: false}
    constructor() {}

    connectWithRetry = async (count: number) => {
        count > 1 &&
            console.log(
                `\nAttemptin to connect to Redis. Attempt number ${count}`
            )
        try {
            this.client = createClient({
                socket: {
                    host: process.env.REDIS_HOST,
                    port: +process.env.REDIS_PORT,
                },
            })
            await this.client.connect()
            console.log("Redis is connected")
            return this.client.isReady
        } catch (error) {
            console.log(`Redis connection failed`, error.message)
            return false
        }
    }

    get connected() {
        return this.client.isReady
    }

    set = async (key: string, value: any) => this.client.set(key, value)

    get = async (key: string) => {
        try {
            const result = await this.client.get(key)
            return result
        } catch (error) {
            console.log(error.message) //TODO add to error.log
            return false
        }
    }

    disconnect = () => this.client.disconnect()
}

export default new Redis()
