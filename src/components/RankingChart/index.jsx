import React from "react";
import { Card } from "antd";
import { Bar } from "@ant-design/plots";
import "./rankingChart.css";

const RankingChart = ({ data }) => {
  const config = {
    // height: '100%',
    data,
    xField: "value",
    yField: "label",
    barWidthRatio: 0.5,
    meta: {
      label: {
        alias: "Enganos",
      },
      value: {
        alias: "Enganos",
      },
    },
  };
  return (
    <>
      <Card style={{padding: 0, height: '100%'}}>
        <div className="table-words-scroll">
          <h4>Top 10 Equívocos</h4>
          <Bar {...config} />;
        </div>
      </Card>
    </>
  )
}

export default RankingChart;
