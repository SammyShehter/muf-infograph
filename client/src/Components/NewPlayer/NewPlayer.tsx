import {FormEvent, useContext, useState} from "react"
import Button from "../Button"
import ImageEdit from "../ImageEdit"
import Input from "../Input"
import AuthContext from "../../Context/AuthContext"
import {newPlayerReq} from "../../Utils/axios.http"

export default function NewPlayer() {
    const {token} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [name, setName] = useState("")
    const [picture, setPicture] = useState({
        cropperOpen: false,
        img: "",
        zoom: 2,
        croppedImg: "/Herald.jpg",
    })

    const handleFileChange = (e: any) => {
        setMessage("")
        let url = URL.createObjectURL(e.target.files[0])
        setPicture({
            ...picture,
            img: url,
            cropperOpen: true,
        })
    }

    const changeHandler = (event: any) => {
        setMessage("")
        setName(event.currentTarget.value)
    }
    const newPlayerHandler = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)
            const creds = await newPlayerReq(
                {name, image: picture.croppedImg},
                token
            )
            if (creds.status === "SUCCESS") {
                setMessage("Added new Player")
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    return (
        <div className="new-player-wrapper">
            {message && <h3 className="welcome-message">{message}</h3>}
            <form onSubmit={newPlayerHandler}>
                <div>
                    <img
                        src={picture.croppedImg}
                        style={{
                            width: "100%",
                            height: "auto",
                            padding: "5",
                        }}
                    />
                    <button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </button>
                </div>
                {picture.cropperOpen && (
                    <ImageEdit picture={picture} setPicture={setPicture} />
                )}
                <br />
                <br />
                <br />
                <Input
                    name="username"
                    label="Name"
                    type="text"
                    onChange={changeHandler}
                />
                <Button
                    type="submit"
                    disabled={loading}
                    text="Create new player"
                />
            </form>
        </div>
    )
}
