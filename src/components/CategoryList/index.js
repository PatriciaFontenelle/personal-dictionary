import { List, Typography } from "antd";
import { useEffect, useState } from "react";
import { RightOutlined } from '@ant-design/icons';
import api from "../../services/api";

import "./categoryList.css";

const CategoryList = (props) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getExpressions();
  }, []);

  const getExpressions = () => {
    api
      .get("/categories/", {params: {
        used: true
      }})
      .then((res) => {
        let categoria
        setCategories([{id: null, name: 'Todas as categorias'}, {id: 'no-category', name: 'Sem categoria'},...res.data.results])
        setLoading(false)
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const selectCategory = (e) => {
      props.setCategory(e);
  }

  return (
    <div>
      <h2 className="category-list-title">Escolha uma categoria: </h2>
      <List
        dataSource={categories}
        itemLayout="vertical"
        loading={loading}
        renderItem={(item) => (
          <List.Item 
            onClick={() => selectCategory(item)} 
            extra={<RightOutlined />}
            style={{cursor: 'pointer'}}
          >
            <Typography.Text mark></Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryList;
