import express from "express"
import fs from "fs"
import logger from "morgan"
import cors from "cors"
import {Server} from "socket.io"
import CommonMiddleware from "./middlewares/common.middleware"
import {router as roomRouter} from "./router/room.router"
import {router as playerRouter} from "./router/player.router"
import {handle404, mufInfo} from "./utils/common.utils"
import {init, initEvents} from "./utils/init.util"
import { createServer } from "http"

const app = express()
const CLIENT = "*"
const PORT = 4000
const NODE_ENV = "development"
const log = NODE_ENV === "development" ? "dev" : "combined"

app.use(express.json())
app.use(CommonMiddleware.saveRequest)
app.use("/rooms", roomRouter)
app.use("/players", playerRouter)
app.use(handle404)
app.use(cors({origin: true}))
app.use(express.json({limit: "2mb"}))
// app.use(express.urlencoded({extended: false}))
app.use(logger(log))

require("dotenv").config()

const io = new Server(createServer(app), {
    cors: {
        origin: CLIENT,
        methods: ["GET", "POST"],
    },
})

const rooms = []
for (let index = 0; index <= 7; index++) {
    rooms.push(`room-${index + 1}`)
}
const callback = (roomNumber: number) => (array: Array<any>) => { //TODO Array<Room>
    if (!array.length) {
        const defaultState = JSON.parse(
            fs.readFileSync("defaultState.json", "utf8")
        )
        return io.emit(`${roomNumber}`, defaultState)
    } else {
        fs.writeFileSync(
            `state-${roomNumber}.json`,
            JSON.stringify(array),
            "utf8"
        )
        return io.emit(`${roomNumber}`, array)
    }
}

init()

// ignite
initEvents.once("ready", () => {
    io.on("connection", (socket) => {
        rooms.forEach((roomNumber) =>
            socket.on(roomNumber, callback(roomNumber))
        )
    })

    app.listen(PORT, function () {
        console.log(`Listening on port ${process.env.PORT}`)
        console.log(
            mufInfo
        )
    })
})
