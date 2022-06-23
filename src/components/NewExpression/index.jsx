import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  Space,
  message,
  Tabs,
  Popconfirm,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import ExpressionModal from "../ExpressionModal";
import api from "../../services/api";

import "./newExpression.css";

const NewExpression = ({ updateDashboard }) => {
  const { Search } = Input;
  const { TabPane } = Tabs;

  const [loading, setLoading] = useState(false);
  const [expressions, setExpressions] = useState([]);
  const [originalCategories, setOriginalcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [record, setRecord] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tab, setTab] = useState("");

  const getData = () => {
    setLoading(true);
    const params = {
      limit: 99999,
      search,
    };
    api
      .get("/expressions/", { params })
      .then((response) => {
        setExpressions(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const deleteExpression = (id) => {
    api
      .delete(`/expressions/${id}/`)
      .then((res) => {
        getData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editExpression = (expression) => {
    setEdit(true);
    setRecord(expression);
    setModalVisible(true);
  };

  const getCategories = () => {
    setLoading(true);
    api
      .get("/categories/")
      .then((res) => {
        setCategories(res.data.results);
        setOriginalcategories(res.data.results);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const deleteCategory = () => {
    setDeleteModalVisible(false);
    setLoading(true);
    api
      .delete(`/categories/${selectedCategory}/`)
      .then((res) => {
        message.success("Categoria deletada com sucesso!");
        getCategories();
        getData();
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!modalVisible) {
      setLoading(true);
      setRecord(null);
      setEdit(false);
      getData();
      getCategories();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (search === "") {
      setCategories(originalCategories);
    } else {
      filterCategories();
    }

    getData();
  }, [search]);

  const handleCloseModal = (text) => {
    message.success(text);
  };

  const onTabChange = (t) => {
    setTab(t);
  };

  const openDeleteModal = (category) => {
    setDeleteModalVisible(true);
    setSelectedCategory(category);
  };

  const filterCategories = () => {
    const data = categories.filter((c) => c.name.includes(search));
  };

  const categoriesColumns = [
    {
      title: "Categoria",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => openDeleteModal(record.id)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const expressionsColumns = [
    {
      title: "Palavra/Expressão",
      dataIndex: "phrase",
      key: "phrase",
    },
    {
      title: "Tradução",
      dataIndex: "meaning",
      key: "meaning",
    },
    {
      title: "Categoria",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Ações",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => editExpression(record)}
            type="primary"
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => deleteExpression(record.id)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="ne-main-container">
      <Modal
        visible={deleteModalVisible}
        title="Atenção!"
        okText="Sim"
        cancelText="Não"
        onOk={() => deleteCategory()}
        onCancel={() => setDeleteModalVisible(false)}
      >
        <div className="delete-modal-icon">
          <WarningOutlined style={{ color: "orange", fontSize: "100px" }} />
        </div>
        <div className="delete-modal-text">
          Ao deletar uma categoria, todas as expressões vinculadas à ela também
          serão excluídas. Deseja prosseguir?
        </div>
      </Modal>
      {modalVisible && (
        <ExpressionModal
          handleClose={handleCloseModal}
          edit={edit}
          expression={record}
          visible={modalVisible}
          setVisible={setModalVisible}
        />
      )}
      <div className="ne-header">
        <div className="ne-search">
          <Search
            placeholder="Pesquise aqui"
            onSearch={(value) => setSearch(value)}
            allowClear
          />
        </div>
        <Button
          onClick={() => setModalVisible(true)}
          className="ne-add-btn"
          type="primary"
        >
          <span>
            <PlusOutlined style={{ marginRight: "5px", fontSize: 15 }} />
            Cadastrar
          </span>
        </Button>
      </div>
      <Tabs defaultActiveKey="expressoes" onChange={onTabChange}>
        <TabPane tab="Expressões" key="expressoes">
          <div className="ne-table">
            <Table
              columns={expressionsColumns}
              dataSource={expressions}
              loading={loading}
            />
          </div>
        </TabPane>
        <TabPane tab="Categorias" key="categoria">
          <div className="ne-table">
            <Table
              columns={categoriesColumns}
              dataSource={categories}
              loading={loading}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default NewExpression;
