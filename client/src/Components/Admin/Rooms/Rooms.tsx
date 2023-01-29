import {Link} from "react-router-dom"
import Button from "../../Button"

export default function Rooms() {
    const buttons = new Array(8).fill(0).map((_, index) => (
        <div key={index}>
                <Link to={`/room/admin/${index + 1}`}>
                <Button text={`Room #${index + 1}`}/>
                </Link>  
        </div>
    ))

    return <>{buttons}</>
}
