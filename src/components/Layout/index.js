import Navbar from "../Navbar"
import BottomMenu from "../BottomMenu"

import "./layout.css"
import { useEffect } from "react"

const Layout = (props) => {
    return (
        <div className="layout-main">
            <Navbar />
            <div className="page-container">
                {props.showMenu && <BottomMenu />}
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;