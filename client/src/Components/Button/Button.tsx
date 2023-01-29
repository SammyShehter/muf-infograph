import {ReactNode} from "react"

export default function Button({
    text,
    type = "button",
    disabled = false,
    onClick = () => {},
}: {
    children?: ReactNode
    text?: string
    type?: "button" | "submit" | "reset"
    disabled?: boolean
    onClick?: any
}) {
    return (
        <button
            onClick={onClick}
            className="button"
            type={type}
            disabled={disabled}
        >
            {text}
        </button>
    )
}
