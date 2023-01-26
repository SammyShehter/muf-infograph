export default function Button({
    type = "button",
    disabled,
    text,
    onClick = () => {}
}: {
    type?: "button" | "submit" | "reset"
    disabled: boolean
    text: string
    onClick?: any
}) {
    return (
        <button onClick={onClick} className="button" type={type} disabled={disabled}>
            {text}
        </button>
    )
}
