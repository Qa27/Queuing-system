import React from "react";
import { BellFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import "./CRbar.css";

const items: MenuProps["items"] = [
  {
    label: <Link to="/device">item 1</Link>,
    key: "0",
  },
  {
    label: <Link to="/device">item 2</Link>,
    key: "1",
  },
  {
    label: <Link to="/device">item 3</Link>,
    key: "3",
  },
];

export const CRbar = () => {
  return (

    <div className="right">
      <div className="crbar_1">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <BellFilled className="icon_1" />
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
