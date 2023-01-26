export default function SideBarElem({title, icon, active, toggle}: any) {
    return (
        <li
            className={`c-menu__item${active ? " is-active" : ""}`}
            data-toggle="tooltip"
            title={title}
            onClick={toggle}
        >
            {/* {subMenu.length ? (
                <>
                    <div className="c-menu__item__inner">
                        <i className={`fa ${icon}`}></i>
                        <div className="c-menu-item__title">
                            <span>{title}</span>
                        </div>
                        <div className="c-menu-item__expand js-expand-submenu">
                            <i className="fa fa-angle-down"></i>
                        </div>
                    </div>
                    <ul
                        className="c-menu__submenu u-list"
                        // style={{display: "block"}}
                    >
                        {subMenu.map((item: any, index: number) => {
                            return <li key={item + index}>{item}</li>
                        })}
                    </ul>
                </>
            ) : ( */}
                <div className="c-menu__item__inner">
                    <i className={`fa ${icon}`}></i>
                    <div className="c-menu-item__title">
                        <span>{title}</span>
                    </div>
                </div>
            {/* )} */}
        </li>
    )
}
