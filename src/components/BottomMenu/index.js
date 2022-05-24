import {
  PieChartFilled,
  FormOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useMenu } from "../../contexts/menuContext";

import "./bottomMenu.css";

const BottomMenu = () => {
  const iconStyle = {'fontSize': 30, 'marginBottom': '5px'}
  const { menu, setMenu } = useMenu();

  const buttons = [
    {
      title: "Dashboard",
      icon: <PieChartFilled style={iconStyle} />,
    },
    {
      title: "Cadastro",
      icon: <FormOutlined style={iconStyle} />,
    },
    {
      title: "Jogar",
      icon: <PlayCircleFilled style={iconStyle} />,
    },
  ];

  useEffect(() => {
    setMenu({ key: 0, title: "Dashboard" });
  }, []);

  const selectMenu = (key, title) => {
    setMenu({ key, title });
  };

  return (
    <div className="bm-main-container">
      <div className="bm-container">
        <ul>
          {buttons.map((btn, i) => {
            return (
              <li>
                <a
                  href="#"
                  className={menu.key === i ? "active" : ""}
                  key={i}
                  onClick={() => selectMenu(i, btn.title)}
                >
                    {btn.icon}
                    {btn.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BottomMenu;
