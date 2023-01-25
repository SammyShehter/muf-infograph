import {useState} from "react"

export default function SideBarElem({title, icon, active}: any) {
    return (
        <li
            className={`c-menu__item ${active && "is-active"}`}
            data-toggle="tooltip"
            title={title}
        >
            <div className="c-menu__item__inner">
                <i className={`fa ${icon}`}></i>
                <div className="c-menu-item__title">
                    <span>{title}</span>
                </div>
            </div>
        </li>
    )
}
