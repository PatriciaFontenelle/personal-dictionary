import { List, Typography } from "antd";
import { useEffect, useState } from "react";
import { RightOutlined, CheckCircleFilled } from "@ant-design/icons";
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
      .get("/categories/", {
        params: {
          used: true,
        },
      })
      .then((res) => {
        console.log("res.data.results");
        console.log(res.data.results);
        setCategories([
          { id: null, name: "Todas as categorias" },
          { id: "no-category", name: "Sem categoria" },
          ...res.data.results,
        ]);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const selectCategory = (e) => {
    console.log('e')
    console.log(e)
    props.setCategory(e);
  };

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
            extra={
              item.complete ? (
                <CheckCircleFilled
                  style={{ fontSize: "20px", color: "green" }}
                />
              ) : (
                <RightOutlined />
              )
            }
            style={{ cursor: "pointer" }}
          >
            {item.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoryList;
