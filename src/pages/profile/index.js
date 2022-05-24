import { Avatar, Button, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/userContext';
import api from "../../services/api";
import { getUser, USER_FIELD } from '../../services/auth';
import { UserOutlined } from '@ant-design/icons';

import './profile.css';

const Profile = () => {
    const {user, setUser} = useUser();
    const [active, setActive] = useState('personal');

    useEffect(() => {
        console.log('user')
        console.log(user)
        if(!user) {
            console.log('Entrou, não tem')
            setUser(getUser())
        }
    }, [])

    const onInfoChange = (e) => {
        setActive(e.target.value)
    }

    const changedPhoto = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = function () {
            setUser({...user, photo: reader.result})
        }
    }

    const save = () => {
        api.put(`users/${user.id}/`, user).then((res) => localStorage.setItem(USER_FIELD, JSON.stringify(user)))
    }

    return (
        <div className="profile-container">
            <div className='basic-info'>
                <input onChange={(e) => changedPhoto(e)} style={{'display': 'none'}} id='avatar' type="file" />
                <label htmlFor="avatar">
                    <Avatar src={ user ? user.photo : null} className='profile-avatar' size={100} icon={<UserOutlined />} />
                </label>
                <span className='user-name'>{user?.username}</span>
            </div>
            <div className='filter-btns'>
                <Radio.Group onChange={onInfoChange} defaultValue="personal" buttonStyle='solid'>
                    <Radio.Button value="personal">Informações Pessoais</Radio.Button>
                    <Radio.Button value="login">Autenticação</Radio.Button>
                    <Radio.Button value="address">Endereço</Radio.Button>
                </Radio.Group>
            </div>
            <div className='info-container'>
                {active === 'personal' ?

                    <div>
                        {active}
                    </div>

                : active === 'login' ?
            
                    <div>
                        {active}
                    </div>
                    
                :

                    <div>
                        {active}
                    </div>
            
                }
            </div>
            <Button onClick={() => save()} type='primary'> Salvar </Button>
        </div>
    )
}

export default Profile;