export type Roles = {
    mafia: boolean
    don: boolean
    sheriff: boolean
}

export type PlayerData = {
    name: string
    code: string
    image: string
}

export type  Unpopulated_PlayerInfo = {
    roles: Roles
    dead: boolean
    player: string
}

export type  Populated_PlayerInfo = {
    roles: Roles
    dead: boolean
    player: PlayerData
}