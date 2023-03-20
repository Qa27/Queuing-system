import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { StepForwardOutlined } from "@ant-design/icons";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

const { Sider } = Layout;
const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardOutlinedIcon />,
  },
  {
    title: "Thiết bị",
    path: "/device",
    icon: <TvOutlinedIcon />,
  },
  {
    title: "Dịch vụ",
    path: "/service",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    title: "Cấp số",
    path: "/numbers",
    icon: <StepForwardOutlined />,
  },
  {
    title: "Báo cáo",
    path: "/report",
    icon: <StepForwardOutlined />,
  },
  {
    title: "Cài đặt hệ thống",
    path: "/setting",
    icon: <StepForwardOutlined />,
  },
];
const LogoutData = [
  {
    title: "Đăng xuất",
    path: "/Logout",
    icon: <StepForwardOutlined />,
  },
];

export const Sidebar = () => {
  return (
    <Sider className="menu_bar">
      <img src="../Img/Logo.png" className="logo" alt=""></img>
      <Menu>
        <ul className="menu_bar_1">
          {SidebarData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <ul className="menu_bar_2">
          {LogoutData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Menu>
    </Sider>
  );
};
