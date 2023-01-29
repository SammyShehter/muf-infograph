import {useEffect, useState} from "react"
import Rooms from "../Rooms"

export default function AdminContent({
    content,
}: {
    content: Array<{
        title: string
        icon: string
        active: boolean
        subMenu: never[]
        content: JSX.Element
    }>
}) {
    const show = content.filter((item: any) => item.active)
    if (!show.length) show.push(content[0])

    return (
        <div className="content-wrapper content-wrapper--with-bg">
            <h1 className="page-title">{show[0].title}</h1>
            {show[0].content}
        </div>
    )
}
