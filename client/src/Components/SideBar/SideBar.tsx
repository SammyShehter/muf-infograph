import SideBarElem from "../SideBarElem"

export default function SideBar() {
    return (
        <div className="l-sidebar">
            <div className="logo">
                <div className="logo__txt">S</div>
            </div>
            <div className="l-sidebar__content">
                <nav className="c-menu js-menu">
                    <ul className="u-list">
                        <SideBarElem title="Flights" icon="fa-plane" active={true}/>
                        <li
                            className="c-menu__item has-submenu" //is-active
                            data-toggle="tooltip"
                            title="Modules"
                        >
                            <div className="c-menu__item__inner">
                                <i className="fa fa-puzzle-piece"></i>
                                <div className="c-menu-item__title">
                                    <span>Modules</span>
                                </div>
                                <div className="c-menu-item__expand js-expand-submenu">
                                    <i className="fa fa-angle-down"></i>
                                </div>
                            </div>
                            <ul className="c-menu__submenu u-list">
                                <li>Payments</li>
                                <li>Maps</li>
                                <li>Notifications</li>
                            </ul>
                        </li>
                        <li
                            className="c-menu__item has-submenu" // is-active
                            data-toggle="tooltip"
                            title="Statistics"
                        >
                            <div className="c-menu__item__inner">
                                <i className="far fa-chart-bar"></i>
                                <div className="c-menu-item__title">
                                    <span>Statistics</span>
                                </div>
                            </div>
                        </li>
                        <li
                            className="c-menu__item has-submenu" // is-active
                            data-toggle="tooltip"
                            title="Gifts"
                        >
                            <div className="c-menu__item__inner">
                                <i className="fa fa-gift"></i>
                                <div className="c-menu-item__title">
                                    <span>Gifts</span>
                                </div>
                            </div>
                        </li>
                        <li
                            className="c-menu__item has-submenu" //is-active
                            data-toggle="tooltip"
                            title="Settings"
                        >
                            <div className="c-menu__item__inner">
                                <i className="fa fa-cogs"></i>
                                <div className="c-menu-item__title">
                                    <span>Settings</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
