const express = require("express")
const multer = require("multer")
const fs = require("fs")

const router = express.Router()
const upload = multer({dest: "uploads/"})
const cpUpload = upload.fields([
    {name: "player.image", maxCount: 1},
    {name: "player.code"},
    {name: "player.name"},
])

let players = JSON.parse(
    fs.readFileSync(`${process.cwd()}/players.all.json`).toString()
)



router.post("/players/add", cpUpload, (req, res) => {
    const image = ""
    const playerData = ""

    // upload photo
    console.log({...req.body})
    // upload player data
    res.json({status: "SUCCESS", data: "Player added successfully"})
})

router.get("/players/all", async (req, res) => {
    try {
        res.json(players)
    } catch (error) {
        res.send("Error")
    }
})

router.get("/players/image/:player", (req, res) => {
    try {
        const {player} = req.params
        res.sendFile(`${process.cwd()}/players/${player}.jpg`)
    } catch (error) {
        res.send("Error")
    }
})

router.get("/room/:id", (req, res) => {
    try {
        const {id} = req.params
        const fileName = id ? `state-room-${id}.json` : "defaultState.json"
        const state = JSON.parse(fs.readFileSync(fileName, "utf8"))
        res.status(200).send(state)
    } catch (error) {
        res.status(400).send("Error")
    }
})

module.exports = router
