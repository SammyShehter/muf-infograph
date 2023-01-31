export type Picture = {
    cropperOpen: boolean
    img: string
    zoom: number
    croppedImg: string
}

export type SideBarStruct = {
    title: string
    icon: string
    active: boolean
    subMenu: Array<string>
    content: JSX.Element
}

export type PlayerSelect = {
    name: string
    code: string
}

export type LoginForm = {
    username: string;
    password: string;
}