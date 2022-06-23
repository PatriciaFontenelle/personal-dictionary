import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, message } from "antd";
import api from "../../services/api";
import "./signin.css";
import { TOKEN_FIELD, USER_FIELD } from "../../services/auth";
import { useUser } from "../../contexts/userContext";
import logo from "../../assets/logo/blue.png";
import PasswordInput from "../../components/PasswordInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const history = useHistory();

  const signIn = (data) => {
    setLoading(true);
    api
      .post("api-token-auth/", data)
      .then((response) => {
        localStorage.setItem(TOKEN_FIELD, response.data.token);
        localStorage.setItem(USER_FIELD, JSON.stringify(response.data.user));
        setUser(response.data.user);
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        console.log(error)
        const eMessage = Object.values(error.response?.data)[0][0];
        if (eMessage !== "Este campo é obrigatório.") message.error(eMessage);
        setLoading(false);
      });
  };

  const navigate = (path) => {
    history.push(path);
  };

  const changedEmail = (email) => {
    setEmail(email);
  };

  const forgotPassword = () => {
    if (email === "") {
      message.error("Por favor, informe o seu e-mail.");
      return;
    }

    api
      .get(`/reset-password/?email=${email}`)
      .then((res) => {
        message.success("E-mail enviado.");
      })
      .catch((e) => {
        message.error(Object.values(e.response.data)[0][0]);
      });
  };

  return (
    <div className="login-main">
      <div className="login-content">
        <div className="login-form">
          <img className="login-logo" src={logo} alt="logo" />
          <Form layout="vertical" onFinish={signIn}>
            <Form.Item
              label="E-mail"
              name="username"
              requiredMark="optional"
              rules={[
                { required: true, message: "Por favor, informe o seu e-mail." },
              ]}
            >
              <Input onChange={(e) => changedEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              requiredMark="optional"
              rules={[
                { required: true, message: "Por favor, informe a sua senha." },
              ]}
            >
              <PasswordInput />
            </Form.Item>

            <div className="forgot-password">
              <a href="#" onClick={() => forgotPassword()}>
                Esqueceu a senha?
              </a>
            </div>

            <Form.Item>
              <Button
                loading={loading}
                className="signin-btn"
                type="primary"
                htmlType="submit"
                block
              >
                Entrar
              </Button>
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
