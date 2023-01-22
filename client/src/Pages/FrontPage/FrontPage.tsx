import {Link} from "react-router-dom"
import Button from "../../Components/Button"

export default function FrontPage() {
    const populateWithLinks = () => {
        const links = []
        for (let index = 1; index < 9; index++) {
            links.push(
                <Link to={`/room/${index}`}>
                    <Button
                        text={`Room #${index}`}
                        disabled={false}
                        type="button"
                    />
                </Link>
            )
        }
        return links
    }

    return <div className="container">{populateWithLinks()}</div>
}
