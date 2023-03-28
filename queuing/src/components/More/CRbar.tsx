import React, { useState } from "react";
import { BellFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { Dropdown } from "antd";
import "./CRbar.css";

const menu = (
  <Menu className="CR_menu">
    <Menu.Item key="0">Thông báo</Menu.Item>
    <Menu.Item key="1">
      <Link to="/device/list_device/view/:id">item 1</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/device">item 2</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/device">item 3</Link>
    </Menu.Item>
  </Menu>
);

export const CRbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="right">
      <div className="crbar_1">
        <Dropdown overlay={menu} trigger={["click"]}>
          <BellFilled
            className={`icon_1 ${isClicked ? "clicked" : "unclicked"}`}
            onClick={handleClick}
          />
        </Dropdown>
      </div>
      <div className="crbar_2">
        <Link to="/infor">
          <img src="../../../Img/user.png" alt="" className="ava" />
          <span className="crbar_2_text">
            Xin chào <span className="crbar_2_text2">Qa</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
