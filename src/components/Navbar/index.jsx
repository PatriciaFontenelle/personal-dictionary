import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getUser, Logout } from '../../services/auth'
import { useUser } from '../../contexts/userContext';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo/white.png';

import './navbar.css';
import { useEffect } from 'react';

const Navbar = (props) => {
    const {user, setUser} = useUser();
    const history = useHistory();

    const redirect = (path) => {
        history.push(`/${path}`)
    }

    useEffect(() => {
        if(!user) {
            setUser(getUser());
        }
    }, [])

    return(
        <div className="nav-main">
            <div style={{cursor: 'pointer'}} className='nav-logo' onClick={() => redirect('')}>
                <img className='nav-logo' src={logo} alt="logo" />
            </div>
            <div className='nav-content'>
                <ul>
                    <li>
                        <a href='#' onClick={() => Logout()}>Sair</a>
                    </li>
                    <li>
                        <Avatar src={ user ? user.photo : null} onClick={() => redirect('profile')} size='large' icon={<UserOutlined />} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default(Navbar)