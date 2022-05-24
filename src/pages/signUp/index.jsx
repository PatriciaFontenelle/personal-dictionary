import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Steps, Divider, Avatar } from "antd";
import api from "../../services/api";
import { UserOutlined } from "@ant-design/icons"

import "./signup.css";

const { Step } = Steps;

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Fields
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  function onFinish() {
    const data = { username, lastname, email, password, photo };
    api
      .post("users/", data)
      .then((response) => history.push("signin/"))
      .catch((error) => {
        console.log("error", error.response.data);
      });
  }

  const pictureChanged = (files) => {
    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result)
    }

    reader.readAsDataURL(files[0]);
  }

  const Footer = () => {
    return (
      <div className="signup-footer">
        <Button style={currentStep == 0 ? {'display': 'none'} : null} onClick={() => setCurrentStep(currentStep - 1)}>Voltar</Button>
        <Button style={currentStep == 2 ? {'display': 'none'} : null} onClick={() => setCurrentStep(currentStep + 1)}>Próximo</Button>
        <Button style={currentStep == 2 ? {} : {'display': 'none'}} onClick={() => onFinish()}>Cadastrar</Button>
      </div>
    )
  }

  return (
    <div className="signup-main">
      <div className="signup-content">
        <div className="steps-container">
          <Steps direction="vertical" current={currentStep}>
            <Step onClick={() => setCurrentStep(0)} title="Dados pessoais" />
            <Step onClick={() => setCurrentStep(1)} title="Dados de Login" />
            <Step onClick={() => setCurrentStep(2)} title="Revisão" />
          </Steps>
        </div>
        <Divider
          className="signup-divider"
          type="vertical"
          style={{ color: "black" }}
        />
        <div className="form-container">
          {currentStep === 0 ? (
            <div className="form-content">
              <Form layout="vertical">
                <Form.Item className="teste">
                  <label htmlFor="profilePic">
                    <Avatar src={photo} size={150} icon={<UserOutlined />}/>
                  </label>
                  <input id="profilePic" type="file" accept="image/*" onChange={(e) => pictureChanged(e.target.files)} style={{"display": "none"}} />
                </Form.Item>
                <Form.Item label="Nome">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Sobrenome">
                  <Input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Form.Item>
              </Form>
              <Footer />
            </div>
          ) : currentStep === 1 ? (
            <div className="form-content">
              <Form layout="vertical">
                <Form.Item label="E-mail">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Senha">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Confirme a sua senha">
                  <Input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </Form.Item>
              </Form>
              <Footer />
            </div>
          ) : (
            <div className="form-content">
              <div className="revisao">
                <Avatar src={photo} size={150} icon={<UserOutlined />}/>
                <span className="signup-username">
                  {`${username} ${lastname}`}   
                </span>
                <h4>{email}</h4>
              </div>
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
