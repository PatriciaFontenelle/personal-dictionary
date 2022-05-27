import Navbar from "../Navbar"
import BottomMenu from "../BottomMenu"

import "./layout.css"

const Layout = (props) => {
    return (
        <div className="layout-main">
            <Navbar />
            <div className="page-container">
                {window.location.pathname !== '/personal-dictionary/profile' && <BottomMenu />}
                <div className="page-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;