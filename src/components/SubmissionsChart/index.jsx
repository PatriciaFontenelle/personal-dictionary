import React from "react";
import { Card } from "antd";
import { Pie } from "@ant-design/plots";
import "./index.css";

const SubmissionsChart = ({ adata }) => {
  const data = [
    {
      type: "Enganos",
      value: adata.misses,
    },
    {
      type: "Acertos",
      value: adata.hits,
    },
    
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    legend: {
      layout: "horizontal",
      position: "bottom",
      marker: {
        style: {
            color: ["#f06543", "#4cb944"],
        }
      }
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    color: ["#f06543", "#4cb944"],
  };
  return (
    <>
      <Card style={{ padding: 0, width: '100%', height: '100%' }}>
        <h4>{`Submissões: ${adata.interactions}`}</h4>
        <Pie {...config} />
      </Card>
    </>
  );
};

export default SubmissionsChart;
