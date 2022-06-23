import Navbar from "../Navbar"
import BottomMenu from "../BottomMenu"

import "./layout.css"
import { useEffect } from "react"

const Layout = (props) => {
    useEffect(() => {
        console.log('props.location')
        console.log(props.location)
    }, [])
    return (
        <div className="layout-main">
            <Navbar />
            <div className="page-container">
                {props.showMenu && <BottomMenu />}
                <div className="page-content" style={props.location.pathname === '/profile' ? {maxHeight: 'calc(100vh - 75px)'} : {}}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;