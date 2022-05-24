import { List, Typography } from "antd";
import { useEffect, useState } from "react";
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
      .get("/categories/")
      .then((res) => {
        let categoria
        setCategories([{id: null, name: 'Todas as categorias'}, {id: 'no-category', name: 'Sem categoria'},...res.data.results])
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
      <List
        dataSource={categories}
        renderItem={(item) => (
          <List.Item onClick={() => selectCategory(item)}>
            <Typography.Text mark></Typography.Text> {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryList;
