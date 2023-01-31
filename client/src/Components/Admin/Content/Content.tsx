import {SideBarStruct} from "../../../Types"

export default function AdminContent({
    content,
}: {
    content: Array<SideBarStruct>
}) {
    const show = content.filter((item: SideBarStruct) => item.active)
    if (!show.length) show.push(content[0])

    return (
        <div className="content-wrapper content-wrapper--with-bg">
            <h1 className="page-title">{show[0].title}</h1>
            {show[0].content}
        </div>
    )
}
