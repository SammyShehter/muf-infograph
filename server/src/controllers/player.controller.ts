import {Request, Response} from "express"
import PlayerService from "../services/player.service"
import {handleError, handleSuccess} from "../utils/common.utils"

class PlayerController {
    constructor() {
        console.log("PlayerController instance created")
    }

    allPlayers = async(req: Request, res: Response) => {
        try {
            const data = await PlayerService.allPlayers()
            return handleSuccess(data, res)
        } catch (error) {
            return handleError(error, req, res)
        }
    }

    addPlayer = async (req: Request, res: Response) => {
        try {
            const data = await PlayerService.addPlayer(req.body)
            return handleSuccess(data, res)
        } catch (error) {
            return handleError(error, req, res)
        }
    }

    fetchPlayersData = async (req: Request, res: Response) => {
        try {
            const data = await PlayerService.fetchPlayersData(req.codes)
            return handleSuccess(data, res)
        } catch (error) {
            return handleError(error ,req, res)
        }
    }

}

export default new PlayerController()
