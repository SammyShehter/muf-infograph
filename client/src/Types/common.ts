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
    vote: boolean
    player: string
    rotate: boolean
}

export type  Populated_PlayerInfo = {
    rotate: boolean
    roles: Roles
    dead: boolean
    vote: boolean
    player: PlayerData
}