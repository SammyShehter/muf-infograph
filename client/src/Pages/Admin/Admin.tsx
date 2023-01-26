import {useContext, useState} from "react"
import AdminContent from "../../Components/AdminContent"
import AdminHeader from "../../Components/AdminHeader"
import NewPlayer from "../../Components/NewPlayer"
import SideBar from "../../Components/SideBar"
import AuthContext from "../../Context/AuthContext"

export default function Admin() {
    const {logout} = useContext(AuthContext)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState([
        {
            title: "New Player",
            icon: "fa-user",
            active: false,
            subMenu: [],
            content: <NewPlayer/>
        },
        {
            title: "Modules",
            icon: "fa-puzzle-piece",
            active: false,
            subMenu: ["Payments", "Maps", "Notifications"],
            content: <h1>Modules</h1>
        },
        {
            title: "Statistics",
            icon: "fa-chart-bar",
            active: false,
            subMenu: [],
            content: <h1>Statistics</h1>
        },
        {
            title: "Gifts",
            icon: "fa-gift",
            active: false,
            subMenu: [],
            content: <h1>Gifts</h1>
        },
        {
            title: "Settings",
            icon: "fa-cogs",
            active: false,
            subMenu: [],
            content: <h1>Settings</h1>
        },
    ]
    )

    return (
        <div className={`body ${open && "sidebar-is-expanded"}`}>
            <AdminHeader open={open} setOpen={setOpen}/>
            <SideBar sideBarStructure={page} setSideBar={setPage}/>
            <div className="l-main">
            <AdminContent content={page}/>
            </div>
        </div>
    )
}
