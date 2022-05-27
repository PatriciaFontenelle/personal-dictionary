import React, { useEffect, useState } from "react";
import { getUser } from "../../services/auth";
import { Button, message } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import api from "../../services/api";

import "./home.css";
import Play from "../../components/PlayGame";
import SubmissionsChart from "../../components/SubmissionsChart";
import StatusChart from "../../components/StatusChart";
import RankingChart from "../../components/RankingChart";
import NewExpression from "../../components/NewExpression";
import { useMenu } from "../../contexts/menuContext";
import CategoryList from "../../components/CategoryList";

const Home = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState({});
  const [gameCategory, setGameCategory] = useState()
  const {menu} = useMenu();
  
  const getData = () => {
    api
      .get("/dashboard/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    setUser(getUser());
    getData();
  }, []);

  const handleEmptyCategory = () => {
    setGameCategory(null);
    message.error("Não existem expressões nessa categoria.")
  }

  return (
    <div style={{'width': '100%'}}>
      {
        menu.title === 'Dashboard' ?
        data ?
        <div className="dashboard-container">
          <div className="status-chart">
            <StatusChart data={data} />
          </div>
          <div className="second-row-charts">
            <div className="submissions-chart">
              <SubmissionsChart adata={data} updateDashboard={(e) => getData()} />
            </div>
            {data?.misses_ranking?.length > 0 && (
              <div className="ranking-chart">
                <RankingChart data={data?.misses_ranking} />
              </div>
            )}
          </div>
        </div> : null
        : 
        menu.title === 'Cadastro' ?
          <div className="cadastro-container">
            <NewExpression updateDashboard={(e) => getData()} />
          </div>
        : 
        menu.title === 'Jogar' ?
          !gameCategory ?
          <CategoryList setCategory={setGameCategory} />
          :
          <div className="jogar-container">
            <Button type="text" onClick={() => setGameCategory(null)}>
              <LeftOutlined />
              Voltar
            </Button>
            <Play category={gameCategory.id} handleEmptyCategory={handleEmptyCategory} setCategory={setGameCategory} updateDashboard={(e) => getData()} />
          </div>
        : null

      }
    </div>

    // <div style={{ width: "100%", height: "100%" }}>
    //   <div style={{ width: "100%", display: "inline-flex" }}>
    //     <div style={{ marginRight: "0.5rem" }}>
    //       <SubmissionsChart adata={data} updateDashboard={(e) => getData()} />
    //     </div>
    //     <div style={{ marginRight: "0.5rem" }}>
    //       <StatusChart data={data} />
    //     </div>
    //     {data?.misses_ranking?.length > 0 && (
    //       <div style={{ marginRight: "0.5rem" }}>
    //         <RankingChart data={data?.misses_ranking} />
    //       </div>
    //     )}
    //   </div>
    //   <div style={{ width: "100%", display: "inline-flex", marginTop: "0.5rem" }}>
    //     <div style={{ marginRight: "0.5rem" }}>
    //       <NewExpression updateDashboard={(e) => getData()} />
    //     </div>
    //     <div>
    //       <Play updateDashboard={(e) => getData()} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
