import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Steps, Divider, Avatar, message } from "antd";
import api from "../../services/api";
import { UserOutlined } from "@ant-design/icons";

import "./signup.css";
import { capitalize } from "../../utils/utils";
import PasswordInput from "../../components/PasswordInput";

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
  const [btnDisabled, setBtnDisabled] = useState(true);

  const history = useHistory();

  const [formRef] = Form.useForm();

  function onFinish() {
    const data = { username, lastname, email, password, photo };
    api
      .post("users/", data)
      .then((response) => history.push("signin/"))
      .catch((error) => {
        message.error(capitalize(Object.values(error.response.data)[0][0]));

        if(Object.keys(error.response.data)[0] === 'email') {
          setCurrentStep(1)
        }
      });
  }

  const pictureChanged = (files) => {
    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(files[0]);
  };

  const Footer = () => {
    return (
      <div className="signup-footer">
        <Button
          danger
          style={currentStep == 0 ? { display: "none" } : null}
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Voltar
        </Button>
        <Button
          type="primary"
          style={currentStep == 2 ? { display: "none" } : null}
          onClick={() => formRef.submit()}
        >
          Próximo
        </Button>
        <Button
          type="primary"
          style={currentStep == 2 ? {} : { display: "none" }}
          onClick={() => onFinish()}
        >
          Cadastrar
        </Button>
      </div>
    );
  };

  const nextStep = async () => {
    if (photo === "") {
      message.error("Por favor, adicione uma foto.");
      return;
    } else if (currentStep === 1 && password !== password2) {
      message.error(
        "Os campos 'Senha' e 'Confira a senha' possuem valores diferentes."
      );
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const validateMessages = {
    required: "Por favor, informe o seu ${name}",
  };

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
              <Form
                layout="vertical"
                form={formRef}
                validateMessages={validateMessages}
                onFinish={nextStep}
              >
                <Form.Item>
                  <label htmlFor="profilePic">
                    <Avatar src={photo} size={150} icon={<UserOutlined />} />
                  </label>
                  <input
                    id="profilePic"
                    type="file"
                    accept="image/*"
                    onChange={(e) => pictureChanged(e.target.files)}
                    style={{ display: "none" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Nome"
                  name="nome"
                  rules={[{ required: true }]}
                  requiredMark="optional"
                >
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Sobrenome"
                  name="sobrenome"
                  rules={[{ required: true }]}
                  requiredMark="optional"
                >
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
              <Form
                form={formRef}
                layout="vertical"
                onFinish={nextStep}
                validateMessages={validateMessages}
              >
                <Form.Item
                  label="E-mail"
                  name={"email"}
                  rules={[{ required: true }]}
                  requiredMark="optional"
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Senha"
                  name="password"
                  rules={[{ required: true, message: 'Informe uma senha.' }]}
                  requiredMark="optional"
                >
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirme a sua senha"
                  name="password2"
                  rules={[{ required: true, message: 'Confirme a sua senha.' }]}
                  requiredMark="optional"
                >
                  <PasswordInput
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
                <Avatar src={photo} size={150} icon={<UserOutlined />} />
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
