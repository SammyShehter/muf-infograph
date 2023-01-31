import {ReactNode} from "react"
import {
    Picture,
    Populated_PlayerInfo,
    Unpopulated_PlayerInfo,
    PlayerSelect,
    SideBarStruct,
} from "."

export namespace Props {
    export type Player = {
        info: Populated_PlayerInfo
        number: number
    }

    export type ImageEdit = {
        picture: Picture
        setPicture: React.Dispatch<React.SetStateAction<Picture>>
    }

    export type Input = {
        type: React.HTMLInputTypeAttribute
        name: string
        label: string
        onChange: (event: any) => void
    }

    export type SideBar = {
        sideBarStructure: Array<SideBarStruct>
        setSideBar: React.Dispatch<React.SetStateAction<SideBarStruct[]>>
    }

    export type SideBarElem = {
        title: string
        icon: string
        active: boolean
        toggle: () => void
    }

    export type AdminHeader = {
        open: boolean
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }

    export type Inputs = {
        roomState: Array<Unpopulated_PlayerInfo>
        players: Array<PlayerSelect>
        setRoomState: React.Dispatch<React.SetStateAction<Unpopulated_PlayerInfo[]>>
    }

    export type Rooms = {
        admin: boolean
    }

    export type Button = {
        children?: ReactNode
        text?: string
        type?: "button" | "submit" | "reset"
        disabled?: boolean
        onClick?: any
    }
}
