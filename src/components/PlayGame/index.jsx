import React, { useEffect, useState } from "react";
import { Card, Typography, Input } from "antd";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import api from "../../services/api";
import "./index.css";

const { Text } = Typography;

const Play = ({ match, updateDashboard, category }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [status, setStatus] = useState(null);
  function getData() {
    setLoading(true);
    const params = {
      category
    }
    api
      .get("/play/", {params})
      .then((response) => {
        setData(response.data?.results);
        setMeaning("");
        setStatus(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  function onSubmit() {
    if (!meaning) return;
    if (!data?.id) return;
    if (status !== null) return;
    setLoading(true);
    const values = { id: data.id, meaning };
    api
      .post("/play/", values)
      .then((response) => {
        setStatus(response.data?.results?.correct);
        setLoading(false);
        updateDashboard();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Card
        title={data?.phrase}
        extra={
          <div
            className="play-custom-card"
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={(e) => getData()}
          >
            <div>
              <RedoOutlined
                spin={loading}
                style={{ fontSize: "16px", color: "#08c" }}
              />
            </div>
            <div>Novo</div>
          </div>
        }
        style={{ width: 300, height: 300 }}
        loading={loading}
      >
        <div>
          {data?.description && <Text disabled>{data?.description}</Text>}
          <Input
            style={{ marginTop: "0.5rem" }}
            placeholder="Informe aqui a tradução"
            addonAfter={
              status === null && (
                <SearchOutlined
                  style={{ cursor: "pointer", fontSize: "1rem" }}
                  onClick={(e) => onSubmit()}
                />
              )
            }
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") onSubmit();
            }}
          />
          <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
          <div>
            <h4>Resultado: </h4>
            {status === null && (
              <h4 style={{ color: "#ccc" }}>Não informado</h4>
            )}
            {status === true && (
              <>
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Correto
                </span>
                <span
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {` (${data?.meaning})`}
                </span>
              </>
            )}
            {status === false && (
              <>
                <span
                  style={{ color: "red", fontWeight: "bold", fontSize: "1rem" }}
                >
                  Errado
                </span>
                <span
                  style={{
                    color: "orange",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {` (${data?.meaning})`}
                </span>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Play;
