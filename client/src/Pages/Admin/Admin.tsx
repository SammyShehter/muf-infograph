import {useState} from "react"
import AdminContent from "../../Components/Admin/Content"
import AdminHeader from "../../Components/Admin/Header"
import Rooms from "../../Components/Admin/Rooms"
import NewPlayer from "../../Components/NewPlayer"
import PlayersManage from "../../Components/PlayersManage"
import SideBar from "../../Components/SideBar"
import { SideBarStruct } from "../../Types"

export default function Admin() {
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState<Array<SideBarStruct>>([
        {
            title: "Rooms",
            icon: "fa-people-roof",
            active: true,
            subMenu: [],
            content: <Rooms admin={true} />,
        },
        {
            title: "Players Management",
            icon: "fa-users",
            active: false,
            subMenu: [],
            content: <PlayersManage />,
        },
        {
            title: "New Player",
            icon: "fa-user",
            active: false,
            subMenu: [],
            content: <NewPlayer />,
        },
    ])

    return (
        <div className={`body ${open && "sidebar-is-expanded"}`}>
            <AdminHeader open={open} setOpen={setOpen} />
            <SideBar sideBarStructure={page} setSideBar={setPage} />
            <div className="l-main">
                <AdminContent content={page} />
            </div>
        </div>
    )
}
