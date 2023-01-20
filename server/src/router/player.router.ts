import express from "express"
import PlayerController from "../controllers/player.controller"
import PlayerMiddleware from "../middlewares/player.middleware"

export const router = express.Router()

router.post(
    "/add",
    PlayerMiddleware.newPlayerChecks,
    PlayerController.addPlayer
)

router.get("/all", PlayerController.allPlayers)

router.post(
    "/data",
    PlayerMiddleware.playerDataChecks,
    PlayerMiddleware.validCodeStrings,
    PlayerController.fetchPlayersData
)
