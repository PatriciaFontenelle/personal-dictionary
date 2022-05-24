import React, { useEffect, useState } from "react";
import { Card, Input, Form, Button, List, Table, Space } from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import ExpressionModal from "../ExpressionModal";
import api from "../../services/api";

import './newExpression.css';

const NewExpression = ({ updateDashboard }) => {
  const {Search} = Input;

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState("");
  const [meaning, setMeaning] = useState("");
  const [description, setDescription] = useState("");
  const [expressions, setExpressions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [record, setRecord] = useState(null);
  const [search, setSearch] = useState('');

  function getData() {
    const params = {
      limit: 99999,
      search
    }
    api
      .get("/expressions/", {params})
      .then((response) => {
        setExpressions(response.data.results);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  function onSubmit() {
    if (!meaning) return;
    setLoading(true);
    const values = { phrase, meaning, description };
    api
      .post("/expressions/", values)
      .then((response) => {
        setLoading(false);
        setPhrase("");
        setMeaning("");
        setDescription("");
        updateDashboard();
        getData();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  function deleteExpression(id) {
    api
    .delete(`/expressions/${id}/`)
    .then((res => {
      console.log('Deletou');
      getData();
    }))
    .catch(e => {
      console.log(e)
    })
  }
  
  function editExpression(expression) {
    setEdit(true);
    setRecord(expression);
    setModalVisible(true);
  }

  useEffect(() => {
    if(!modalVisible) {
      setRecord(null);
      setEdit(false);
      getData();
    }
  }, [modalVisible, search]);

  const columns = [
    {
      title: 'Palavra/Expressão',
      dataIndex: 'phrase',
      key: 'phrase'

    },
    {
      title: 'Tradução',
      dataIndex: 'meaning',
      key: 'meaning'
    },
    {
      title: 'Categoria',
      dataIndex: 'categoryName',
      key: 'categoryName'
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => editExpression(record)} type="primary" icon={<EditOutlined />} />
          <Button onClick={() => deleteExpression(record.id)} type="primary" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ]
  return (
    <div className="ne-main-container">
      {modalVisible === true && <ExpressionModal edit={edit} expression={record} visible={modalVisible} setVisible={setModalVisible} />}
      <div className="ne-header">
        <div className="ne-search">
          <Search placeholder="Pesquise aqui" onSearch={value => setSearch(value)} />
        </div>
        <Button onClick={() => setModalVisible(true)} className="ne-add-btn" type="primary">  
          <span>
            <PlusOutlined style={{'marginRight': '5px', 'fontSize': 15}} />
            Cadastrar
          </span>
        </Button>

      </div>

      <div className="ne-table">
        <Table
          columns={columns}
          dataSource={expressions}
        >

        </Table>
      </div>
    </div>
    // <>
    //   <Card style={{ width: 300, height: 300 }} loading={loading}>
    //     <Form layout="vertical">
    //       <Form.Item label="Frase:" style={{ marginBottom: 10 }}>
    //         <Input
    //           placeholder="Informe aqui a expressão"
    //           value={phrase}
    //           onChange={(e) => setPhrase(e.target.value)}
    //         />
    //       </Form.Item>
    //       <Form.Item label="Significado:" style={{ marginBottom: 10 }}>
    //         <Input
    //           placeholder="Informe aqui a expressão"
    //           value={meaning}
    //           onChange={(e) => setMeaning(e.target.value)}
    //         />
    //       </Form.Item>
    //       <Form.Item label="Descrição (Opcional):" style={{ marginBottom: 10 }}>
    //         <Input
    //           placeholder="Informe aqui a descrição"
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //         />
    //       </Form.Item>
    //       <Form.Item style={{ textAlign: "center" }}>
    //         <Button
    //           type="primary"
    //           htmlType="button"
    //           style={{ background: "#4cb944" }}
    //           onClick={(e) => onSubmit()}
    //         >
    //           Adicionar Nova Expressão
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </Card>
    //   <Card style={{ width: 300, height: 300, overflowY: 'auto' }} loading={loading}>
    //     <List
    //       size="small"
    //       bordered
    //       dataSource={expressions}
    //       renderItem={(item) => <List.Item>{item.phrase}</List.Item>}
    //     />
    //   </Card>
    // </>
  );
};

export default NewExpression;
