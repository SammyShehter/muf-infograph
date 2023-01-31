import {Link} from "react-router-dom"
import Rooms from "../../Components/Admin/Rooms"

export default function FrontPage() {
    return <Rooms admin={false} />
}
