import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

const NumberSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_66393_1806)">
      <path
        d="M1.66666 14.167L10 18.3337L18.3333 14.167"
        stroke="#A9A9B0"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.66666 10L10 14.1667L18.3333 10"
        stroke="#A9A9B0"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 1.66699L1.66666 5.83366L10 10.0003L18.3333 5.83366L10 1.66699Z"
        stroke="#A9A9B0"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_66393_1806">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const LogoutSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3333 14.1663L17.5 9.99967L13.3333 5.83301"
      stroke="#FF7506"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 10H7.5"
      stroke="#FF7506"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
      stroke="#FF7506"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const NumberIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={NumberSVG} {...props} />
);

const LogoutIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogoutSVG} {...props} />
);

const SidebarData = [
  {
    title: "Take a ticket",
    path: "/user_number",
    icon: <NumberIcon />,
  },
];
const LogoutData = [
  {
    title: "Log out",
    path: "/",
    icon: <LogoutIcon />,
  },
];

export const UserSidebar = () => {
  return (
    <Sider className="menu_bar">
      <img src="../../../Img/Logo.png" className="logo" alt=""></img>
      <Menu>
        <ul className="menu_bar_1">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="SB_item">
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
