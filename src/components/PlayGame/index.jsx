import React, { useEffect, useState } from "react";
import { Card, Typography, Input, Button, message } from "antd";
import { RedoOutlined, RightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import "./playGame.css";

const { Text } = Typography;

const Play = ({
  dashboardData,
  updateDashboard,
  category,
  handleEmptyCategory,
  setCategory,
  setCompletedCategory
}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [meaning, setMeaning] = useState("");
  const [status, setStatus] = useState(null);
  
  const history = useHistory();
 
  const getData = (source) => {
    setLoading(true);
    const params = {
      category,
    };
    api
      .get("/play/", { params })
      .then((response) => {
        console.log("response.data.response");
        console.log(response);
        if (response.data.results.length != 0) {
          console.log("response.data?.results");
          console.log(response.data?.results);
          setData(response.data?.results);
          setMeaning("");
          setStatus(null);
        } else {
          !source ? 
          handleEmptyCategory()
          :
          onCategoryFinish()
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const onCategoryFinish = () => {
    message.success('Parabéns! Você completou todas as expressões desta categoria!') 
    setTimeout(() => {
      setCompletedCategory(category);
      setCategory(null)
    }, 5000)
  }

  const onSubmit = () => {
    console.log("dashboardData");
    console.log(dashboardData);
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
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data.length === 0 && alert("teste")}
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
            <div>Pular</div>
          </div>
        }
        style={{ width: "100%", height: "fit-content" }}
        loading={loading}
      >
        <div>
          <Input
            style={{ marginTop: "0.5rem" }}
            placeholder="Informe aqui a tradução"
            disabled={status !== null}
            addonAfter={
              status === null && (
                <RightOutlined
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
          <div className="game-result">
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
          {data?.description && (
            <div className="game-example">
              <h4>Exemplo de uso:</h4>
              <h4 style={{ color: "#CCC" }}>{data?.description}</h4>
            </div>
          )}
          <div className="game-footer">
            <Button
              className="game-next-btn"
              block
              type="primary"
              onClick={() => getData('proximo-btn')}
              disabled={!status}
            >
              Próximo
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Play;
