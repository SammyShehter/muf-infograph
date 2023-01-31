import {Props, SideBarStruct} from "../../Types"
import SideBarElem from "../SideBarElem"

export default function SideBar({sideBarStructure, setSideBar}: Props.SideBar) {
    const sideBarBuild = sideBarStructure.map(
        (item: SideBarStruct, index: number) => {
            return (
                <SideBarElem
                    key={index}
                    title={item.title}
                    icon={item.icon}
                    active={item.active}
                    // subMenu={item.subMenu}
                    toggle={() => {
                        const newSideBarStruct = sideBarStructure.map(
                            (item: SideBarStruct) => ({...item, active: false})
                        )
                        newSideBarStruct[index].active =
                            !sideBarStructure[index].active
                        setSideBar(newSideBarStruct)
                    }}
                />
            )
        }
    )

    return (
        <div className="l-sidebar">
            <div className="logo">
                <div className="logo__txt">S</div>
            </div>
            <div className="l-sidebar__content">
                <nav className="c-menu js-menu">
                    <ul className="u-list">{sideBarBuild}</ul>
                </nav>
            </div>
        </div>
    )
}
