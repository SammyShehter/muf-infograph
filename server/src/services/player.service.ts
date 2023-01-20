import { Player } from "../types/player.type"
import { randColor } from "../utils/common.utils"
import Mongo from "./mongo.service"

class PlayerService {
    private db: typeof Mongo
    constructor(DB: typeof Mongo) {
        this.db = DB
        console.log("PlayerService instance created")
    }

    private uniqueCodeForPlayer = async () => {
        let code = randColor()
        const exists = await this.db.getPlayerByCode({code})
        if(exists) return this.uniqueCodeForPlayer()
        return code
    }

    addPlayer = async (player: Player) => {
        player.code = await this.uniqueCodeForPlayer()
        await this.db.addPlayer(player)
        return {message: `${player.name} was added as a new player`}
    }

    allPlayers = async () => this.db.allPlayers()

    fetchPlayersData = async (codes: Array<string>) => this.db.fetchPlayersData(codes)
}

export default new PlayerService(Mongo)
