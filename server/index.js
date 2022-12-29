const express = require("express")
const fs = require("fs")
const logger = require("morgan")
const cors = require("cors")
const socketIO = require("socket.io")
require("dotenv").config()

const app = express()

const CLIENT = "*"
const PORT = 4000
const NODE_ENV = "development"

const corsOptionsDelegate = (_, callback) => callback(null, {origin: true})

app.use(cors(corsOptionsDelegate))
app.use(express.json({extended: true, limit: "50mb"}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//logger
const log = NODE_ENV === "development" ? "dev" : "combined"
app.use(logger(log))

const http = require("http").createServer(app)

const io = socketIO(http, {
    cors: {
        origin: CLIENT,
        methods: ["GET", "POST"],
    },
})

const index = require("./routes/index")
app.use(index)

io.on("connection", (socket) => {
    socket.on("players", (array) => {
        if (!array.length) {
            fs.readFile("defaultState.json", "utf8", (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    const state = JSON.parse(data)
                    return io.emit("players", state)
                }
            })
        } else {
            fs.writeFile("state.json", JSON.stringify(array), "utf8", () => {
                console.log("State updated")
            })
            return io.emit("players", array)
        }
    })
})

http.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`)
})
