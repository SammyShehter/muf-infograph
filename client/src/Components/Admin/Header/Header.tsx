import {useContext} from "react"
import AuthContext from "../../../Context/AuthContext"
import {Props} from "../../../Types"

export default function AdminHeader({open, setOpen}: Props.AdminHeader) {
    const {logout} = useContext(AuthContext)
    return (
        <div className="l-header">
            <div className="l-header__inner clearfix">
                <div
                    className={`c-header-icon js-hamburger ${
                        open && "is-opened"
                    }`}
                    onClick={() => setOpen(!open)}
                >
                    <div className={`hamburger-toggle ${open && "is-opened"}`}>
                        <span className="bar-top"></span>
                        <span className="bar-mid"></span>
                        <span className="bar-bot"></span>
                    </div>
                </div>
                {/* <div className="c-header-icon has-dropdown">
                <span className="c-badge c-badge--red c-badge--header-icon animated swing">
                    13
                </span>
                <i className="fa fa-bell"></i>
                <div className="c-dropdown c-dropdown--notifications">
                    <div className="c-dropdown__header"></div>
                    <div className="c-dropdown__content"></div>
                </div>
            </div>
            <div className="c-search">
                <input
                    className="c-search__input u-input"
                    placeholder="Search..."
                    type="text"
                />
            </div>
            <div className="header-icons-group">
                <div className="c-header-icon basket">
                    <span className="c-badge c-badge--blue c-badge--header-icon animated swing">
                        4
                    </span>
                    <i className="fa fa-shopping-basket"></i>
                </div>

            </div> */}
                <div className="c-header-icon logout" onClick={logout}>
                    <i className="fa fa-power-off"></i>
                </div>
            </div>
        </div>
    )
}
