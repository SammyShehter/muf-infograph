import {Request, Response} from "express"
import RoomService from "../services/room.service"
import {handleError, handleSuccess} from "../utils/common.utils"

class RoomController {
    constructor() {
        console.log("RoomController instance created")
    }

    getRoomData = async (req: Request, res: Response) => {
        try {
            const {id} = req.params
            const state = await RoomService.getRoomData(id)
            return handleSuccess(state, res)
        } catch (error) {
            return handleError(error, req, res)
        }
    }
}

export default new RoomController()
