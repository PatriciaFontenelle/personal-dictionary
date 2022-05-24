import React from "react";
import { Card } from "antd";

import './StatusChart.css';

const StatusChart = ({ data }) => {
  return (
    <div className="status-container">
      <Card className="nivel-card" style={{ width: '100%', height: 146, padding: 0, background: '#246eb9' }}>
        <h1 style={{color: '#fdfffc'}}>{`Rodada: ${data.level}`}</h1>
        <h2 style={{color: '#fdfffc', padding: 0, marginTop: 0}}>{`${data.level_hits}/${data.words}`}</h2>
      </Card>
      <Card className="enganos-card" style={{ width: '100%', height: 146, padding: 0, background: '#f06543' }}>
        <h1 style={{color: '#fdfffc'}}>{`Enganos: ${data.misses}`}</h1>
        <h2 style={{color: '#fdfffc', padding: 0, marginTop: 0}}>{`Enganos nesta rodada: ${data.level_misses}`}</h2>
      </Card>
    </div>
  );
};

export default StatusChart;
