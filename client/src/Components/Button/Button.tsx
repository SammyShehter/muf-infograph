export default function Button({
    type,
    disabled,
    text
}: {
    type: "button" | "submit" | "reset" | undefined
    disabled: boolean
    text: string
}) {
    return (
        <button className="button" type={type} disabled={disabled}>
            {text}
        </button>
    )
}
