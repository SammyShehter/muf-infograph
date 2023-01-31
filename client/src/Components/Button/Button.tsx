import {Props} from "../../Types"

export default function Button({
    text,
    type = "button",
    disabled = false,
    onClick = () => {},
}: Props.Button) {
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
