import {Props} from "../../Types"

export default function Input({type, name, label, onChange}: Props.Input) {
    return (
        <div className="group">
            <input type={type} name={name} onChange={onChange} required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className="label">{label}</label>
        </div>
    )
}
