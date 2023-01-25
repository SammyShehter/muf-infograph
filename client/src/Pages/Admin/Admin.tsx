import {useContext, useState} from "react"
import SideBar from "../../Components/SideBar"
import AuthContext from "../../Context/AuthContext"

export default function Admin() {
    const {logout} = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    return (
        <div className={`body ${open && "sidebar-is-expanded"}`}>
            <header className="l-header">
                <div className="l-header__inner clearfix">
                    <div
                        className={`c-header-icon js-hamburger ${
                            open && "is-opened"
                        }`}
                        onClick={() => setOpen(!open)}
                    >
                        <div
                            className={`hamburger-toggle ${
                                open && "is-opened"
                            }`}
                        >
                            <span className="bar-top"></span>
                            <span className="bar-mid"></span>
                            <span className="bar-bot"></span>
                        </div>
                    </div>
                    <div className="c-header-icon has-dropdown">
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
                        <div className="c-header-icon logout" onClick={logout}>
                            <i className="fa fa-power-off"></i>
                        </div>
                    </div>
                </div>
            </header>
            <SideBar />

            <main className="l-main">
                <div className="content-wrapper content-wrapper--with-bg">
                    <h1 className="page-title">Dashboard</h1>
                    <div className="page-content">Content goes here</div>
                </div>
            </main>
        </div>
    )
}
