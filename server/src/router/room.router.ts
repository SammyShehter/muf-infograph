import express from "express"
import RoomController from "../controllers/room.controller"
import RoomMiddleware from "../middlewares/room.middleware"

export const router = express.Router()

router.get("/room/:id", RoomMiddleware.paramChecks, RoomController.getRoomData)
