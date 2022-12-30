const express = require("express")
const fs = require("fs")
const logger = require("morgan")
const cors = require("cors")
const socketIO = require("socket.io")
const index = require("./routes/index")

require("dotenv").config()

const app = express()

const CLIENT = "*"
const PORT = 4000
const NODE_ENV = "development"
const log = NODE_ENV === "development" ? "dev" : "combined"

app.use(cors({origin: true}))
app.use(express.json({extended: true, limit: "50mb"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(logger(log))
app.use(index)

const http = require("http").createServer(app)

const io = socketIO(http, {
    cors: {
        origin: CLIENT,
        methods: ["GET", "POST"],
    },
})

const rooms = []
for (let index = 0; index <= 7; index++) {
    rooms.push(`room-${index + 1}`)
}
const callback = (roomNumber) => (array) => {
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

io.on("connection", (socket) => {
    rooms.forEach((roomNumber) => socket.on(roomNumber, callback(roomNumber)))
})

http.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
