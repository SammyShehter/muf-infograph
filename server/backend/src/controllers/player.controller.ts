import {Request, Response} from "express"
import RoomService from "../services/room.service"
import {handleError, handleSuccess} from "../utils/common.utils"

class RoomController {
    constructor() {
        console.log("RoomController instance created")
    }

    // readRoom = async(req: Request, res: Response) => {
    //     try {
    //         const data = await RoomService.readRoom(req.params.slug)
    //         return handleSuccess(data, res)
    //     } catch (error) {
    //         return handleError(error, req, res)
    //     }
    // }

    // addRoom = async (req: Request, res: Response) => {
    //     try {
    //         const data = await RoomService.addRoom(req.body)
    //         return handleSuccess(data, res)
    //     } catch (error) {
    //         return handleError(error, req, res)
    //     }
    // }

}

export default new RoomController()
