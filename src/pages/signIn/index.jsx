import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import api from "../../services/api";
import "./signin.css";
import { TOKEN_FIELD, USER_FIELD } from "../../services/auth";
import { useUser } from "../../contexts/userContext";
import logo from '../../assets/logo/blue.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const {setUser} = useUser();

  const history = useHistory();
  function onFinish(data) {
    api
      .post("api-token-auth/", data)
      .then((response) => {
        localStorage.setItem(TOKEN_FIELD, response.data.token);
        localStorage.setItem(USER_FIELD, JSON.stringify(response.data.user))       
        setUser(response.data.user)
        history.push("/");
      })
      .catch((error) => setErrorMessage({login: 'Credenciais inválidas, tente novamente.'}));
  }

  function navigate(path) {
    history.push(path);
  }

  const changedEmail = (email) => {
    setErrorMessage({ ...errorMessage, username: "", login: "" })
    setEmail(email)
  }

  const signIn = (e) => {
    console.log("Entrou");

    const messages = {};

    if (e.username === "" || !e.username)
      messages.username = "Por favor, informe o nome do usuário.";

    if (e.password === "" || !e.password)
      messages.password = "Por favor, informe a senha.";

    if (Object.keys(messages).length > 0) {
        setErrorMessage(messages);
    } else {
        onFinish(e)
    }

    console.log(e);
  };

  const forgotPassword = () => {
    api
    .get(`/reset-password/?email=${email}`)
    .then(res => {
      alert('E-mail enviado')
    })
    .catch(e => {
      console.error(e)
    })
  }

  return (
    <div className="login-main">
      <div className="login-content">
        <div className="login-form">
          <img className="login-logo" src={logo} alt='logo'/>
          <Form layout="vertical" onFinish={(e) => signIn(e)}>
            <Form.Item label="E-mail">
              <Form.Item name="username">
                <Input
                  onChange={(e) =>
                    changedEmail(e.target.value)
                  }
                />
              </Form.Item>
              <div className="erro-login mt-20">{errorMessage?.username}</div>
            </Form.Item>

            <Form.Item label="Senha">
              <Form.Item name="password">
                <Input
                  type="password"
                  onChange={() =>
                    setErrorMessage({ ...errorMessage, password: "", login: "" })
                  }
                />
              </Form.Item>
              <div className="erro-login mt-20">{errorMessage?.password}</div>
              <a href="#" className="forgot-password" onClick={() => forgotPassword()}>Esqueceu a senha?</a>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" block>
                Entrar
              </Button>
              <div className="erro-login">{errorMessage?.login}</div>
            </Form.Item>
          </Form>
          <Divider>ou</Divider>
          <Button onClick={() => navigate("/signup")} block>
            Cadastre-se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
