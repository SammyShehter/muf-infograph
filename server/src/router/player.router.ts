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
    PlayerMiddleware.playerDataChecks(10),
    PlayerMiddleware.validCodeStrings,
    PlayerController.fetchPlayersData
)

router.post(
    "/delete",
    PlayerMiddleware.playerDataChecks(99),
    PlayerMiddleware.validCodeStrings,
    PlayerController.deletePlayersData
)
