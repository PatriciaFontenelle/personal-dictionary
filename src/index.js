import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import '../src/styles/css/antd.css';
import './index.css';

function App() {
  return (
    <Routes />  
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
); 

