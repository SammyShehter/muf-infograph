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
            // const state = JSON.parse(fs.readFileSync(fileName, "utf8"))
            const state = await RoomService.getRoomData(id)
            handleSuccess(state, res)
        } catch (error) {
            handleError(error, req, res)
        }
    }
}

export default new RoomController()
