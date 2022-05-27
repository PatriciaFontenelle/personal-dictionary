import { Avatar, Button, Form, Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/userContext";
import api from "../../services/api";
import { getUser, USER_FIELD } from "../../services/auth";
import { UserOutlined } from "@ant-design/icons";
import { Logout } from "../../services/auth";
import PasswordInput from "../../components/PasswordInput";

import "./profile.css";

const Profile = () => {
  const [originalEmail, setOriginalEmail] = useState("");
  const [alterarSenha, setAlterarSenha] = useState(false);

  const { user, setUser } = useUser();

  useEffect(() => {
    console.log("user");
    console.log(user);
    if (!user) {
      setUser(getUser());
    }
    setOriginalEmail(user?.email);
  }, []);

  const changedPhoto = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = function () {
      setUser({ ...user, photo: reader.result });
    };
  };

  const save = (values) => {
    api.put(`users/${user.id}/`, user).then((res) => {
      message.success("Alterações salvas com sucesso!");
      localStorage.setItem(USER_FIELD, JSON.stringify(user));
      if (user.email !== originalEmail) Logout();
    });
  };

  const changePassword = (values) => {
    setUser({ ...user, new_password: values.password, new_password2: values.password2 });
    api.put(`users/${user.id}/`, user).then((res) => {
      setTimeout(() => {
        setAlterarSenha(false);
        message.success("Senha alterada com sucesso!");
      }, 5000);
      Logout();
    });
  };

  return (
    <div className="profile-container">
      <div className="basic-info">
        <input
          onChange={(e) => changedPhoto(e)}
          style={{ display: "none" }}
          id="avatar"
          type="file"
        />
        <label htmlFor="avatar">
          <Avatar
            src={user ? user.photo : null}
            className="profile-avatar"
            size={100}
            icon={<UserOutlined />}
          />
        </label>
        <span className="user-name">{`${user?.username} ${user?.lastname}`}</span>
      </div>
      <div className="info-container">
        <Form layout="vertical" onFinish={save}>
          <Form.Item label="Nome">
            <Input
              value={user?.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Sobrenome">
            <Input
              value={user?.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="E-mail">
            <Input
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              {" "}
              Salvar{" "}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Button onClick={() => setAlterarSenha(true)}>Alterar senha</Button>
      <Modal
        visible={alterarSenha}
        title="Alterar senha"
        footer={null}
        onCancel={() => setAlterarSenha(false)}
      >
        <Form layout="vertical" onFinish={changePassword}>
          <Form.Item label="Senha:" name="password">
            <PasswordInput />
          </Form.Item>
          <Form.Item label="Confirme a senha:" name="password2">
            <PasswordInput />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Alterar senha
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
