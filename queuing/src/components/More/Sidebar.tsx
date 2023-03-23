import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { StepForwardOutlined } from "@ant-design/icons";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const { Sider } = Layout;

// const DashboardSVG = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M18.3333 9.08329V3.41663C18.3333 2.16663 17.8 1.66663 16.475 1.66663H13.1083C11.7833 1.66663 11.25 2.16663 11.25 3.41663V9.08329C11.25 10.3333 11.7833 10.8333 13.1083 10.8333H16.475C17.8 10.8333 18.3333 10.3333 18.3333 9.08329Z"
//       stroke="#A9A9B0"
//       stroke-width="1.5"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//     <path
//       d="M18.3333 16.5834V15.0834C18.3333 13.8334 17.8 13.3334 16.475 13.3334H13.1083C11.7833 13.3334 11.25 13.8334 11.25 15.0834V16.5834C11.25 17.8334 11.7833 18.3334 13.1083 18.3334H16.475C17.8 18.3334 18.3333 17.8334 18.3333 16.5834Z"
//       stroke="#A9A9B0"
//       stroke-width="1.5"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//     <path
//       d="M8.75008 10.9166V16.5833C8.75008 17.8333 8.21675 18.3333 6.89175 18.3333H3.52508C2.20008 18.3333 1.66675 17.8333 1.66675 16.5833V10.9166C1.66675 9.66663 2.20008 9.16663 3.52508 9.16663H6.89175C8.21675 9.16663 8.75008 9.66663 8.75008 10.9166Z"
//       stroke="#A9A9B0"
//       stroke-width="1.5"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//     <path
//       d="M8.75008 3.41663V4.91663C8.75008 6.16663 8.21675 6.66663 6.89175 6.66663H3.52508C2.20008 6.66663 1.66675 6.16663 1.66675 4.91663V3.41663C1.66675 2.16663 2.20008 1.66663 3.52508 1.66663H6.89175C8.21675 1.66663 8.75008 2.16663 8.75008 3.41663Z"
//       stroke="#A9A9B0"
//       stroke-width="1.5"
//       stroke-linecap="round"
//       stroke-linejoin="round"
//     />
//   </svg>
// );

// const DashboardIcon = (props: Partial<CustomIconComponentProps>) => (
//   <Icon component={DashboardSVG} {...props} />
// );

const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <DashboardOutlinedIcon />,
  },
  {
    title: "Thiết bị",
    path: "/device/list_device",
    icon: <TvOutlinedIcon />,
  },
  {
    title: "Dịch vụ",
    path: "/service/list_service",
    icon: <QuestionAnswerOutlinedIcon />,
  },
  {
    title: "Cấp số",
    path: "/number/list_number",
    icon: <StepForwardOutlined />,
  },
  {
    title: "Báo cáo",
    path: "/report/list_report",
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
      <img src="../../../Img/Logo.png" className="logo" alt=""></img>
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
