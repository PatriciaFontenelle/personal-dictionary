import React, { useEffect, useState } from "react";
import { Input, Button, Table, Space, message } from "antd";
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import ExpressionModal from "../ExpressionModal";
import api from "../../services/api";

import './newExpression.css';

const NewExpression = ({ updateDashboard }) => {
  const {Search} = Input;

  const [loading, setLoading] = useState(true);
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
        setLoading(false);
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
      setLoading(true);
      setRecord(null);
      setEdit(false);
      getData();
    }
  }, [modalVisible, search]);

  const handleCloseModal = (text) => {
    message.success(text)
  }

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
      {modalVisible === true && <ExpressionModal handleClose={handleCloseModal} edit={edit} expression={record} visible={modalVisible} setVisible={setModalVisible} />}
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
          loading={loading}
        />
      </div>
    </div>
  );
};

export default NewExpression;
