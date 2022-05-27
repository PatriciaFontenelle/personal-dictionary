import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useState } from "react";

const PasswordInput = ({value, onChange}) => {
    const [seePassword, setSeePassword] = useState(false);
    const [password, setPassword] = useState('')

    return(
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
            value={value}
            onChange={onChange}
        />
    )
}

export default PasswordInput;