import express from "express"
import logger from "morgan"
import cors from "cors"
import {Server} from "socket.io"
import CommonMiddleware from "./middlewares/common.middleware"
import {router as roomRouter} from "./router/room.router"
import {router as playerRouter} from "./router/player.router"
import {handle404, mufInfo} from "./utils/common.utils"
import {init, initEvents} from "./utils/init.util"
import RoomService from "./services/room.service"
require("dotenv").config()

const app = express()
const CLIENT = "*"
const PORT = 4000
const NODE_ENV = "development"
const log = NODE_ENV === "development" ? "dev" : "combined"

app.use(cors({origin: CLIENT}))
app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended: true}))
app.use(CommonMiddleware.saveRequest)
app.use(logger(log))
app.use("/rooms", roomRouter)
app.use("/players", playerRouter)
const http = require("http").createServer(app)
const io = new Server(http, {
    cors: {
        origin: CLIENT,
        methods: ["GET", "POST"],
    },
})

const rooms = new Array(7)
    .fill(0)
    .map((_: number, index: number) => `room-${index + 1}`)
const callback = (roomNumber: string) => (array: Array<any>) => {
    //TODO Array<Room>
    if (!array.length) {
        return io.emit(roomNumber, RoomService.defaultState)
    } else {
        RoomService.setRoomData(roomNumber, array)
        return io.emit(roomNumber, array)
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

    http.listen(PORT, function () {
        console.log(`Listening on port ${process.env.PORT}`)
        console.log(mufInfo)
    })
})
app.use(handle404)
