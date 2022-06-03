import { Divider, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo/blue.png';
import api from '../../services/api';

import './resetPassword.css';

const ResetPassword = (props) => {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(false);
    const [confirmPassword,setConfirmPassword] = useState('');
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

    const onSubmit = (e) => {
        const queryString = props.location.search;
        const urlParams = new URLSearchParams(queryString);
        const key = urlParams.get('key');

        const values = {key, new_password: password, new_password2: confirmPassword}

        api
        .post('/reset-password/', values)
        .then(res => {
            setTimeout(() => {
                message.success('Sucesso')
            }, 3000)
            history.push('/signin')
        })
        .catch(e => {
            console.error(e);
        })
        
    }

    return(
        <div className='rp-main-container'>
            <div className='rp-form-container'>
                <img src={logo} alt='logo' />
                <Divider className='rp-divider' type='vertical' style={{'height': '80%'}} />
                <div className='rp-form'>
                    <Form layout='vertical' onFinish={(e) => onSubmit(e)}>
                        <Form.Item
                            label='Nova Senha'
                            name='password'
                        >
                            <Input
                                suffix={seePassword ? 
                                    <EyeInvisibleOutlined 
                                        onClick={() => setSeePassword(false)} 
                                        style={{'fontSize': '20px'}}
                                        /> 
                                        : 
                                    <EyeOutlined 
                                        onClick={() => setSeePassword(true)} 
                                        style={{'fontSize': '20px'}}
                                    />
                                }
                                type= {seePassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Confirme a Senha'
                            name='confirmPassword'
                        >
                            <Input
                                suffix={seeConfirmPassword ? 
                                    <EyeInvisibleOutlined 
                                        onClick={() => setSeeConfirmPassword(false)} 
                                        style={{'fontSize': '20px'}}
                                        /> 
                                        : 
                                    <EyeOutlined 
                                        onClick={() => setSeeConfirmPassword(true)} 
                                        style={{'fontSize': '20px'}}
                                    />
                                }
                                type= {seeConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' className='rp-save-btn' type='primary'>Alterar Senha</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;