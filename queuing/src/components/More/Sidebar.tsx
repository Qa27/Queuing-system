import React from "react";
import "./Sidebar.css";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const { Sider } = Layout;

const DashboardSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.3333 9.08329V3.41663C18.3333 2.16663 17.8 1.66663 16.475 1.66663H13.1083C11.7833 1.66663 11.25 2.16663 11.25 3.41663V9.08329C11.25 10.3333 11.7833 10.8333 13.1083 10.8333H16.475C17.8 10.8333 18.3333 10.3333 18.3333 9.08329Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.3333 16.5834V15.0834C18.3333 13.8334 17.8 13.3334 16.475 13.3334H13.1083C11.7833 13.3334 11.25 13.8334 11.25 15.0834V16.5834C11.25 17.8334 11.7833 18.3334 13.1083 18.3334H16.475C17.8 18.3334 18.3333 17.8334 18.3333 16.5834Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.75008 10.9166V16.5833C8.75008 17.8333 8.21675 18.3333 6.89175 18.3333H3.52508C2.20008 18.3333 1.66675 17.8333 1.66675 16.5833V10.9166C1.66675 9.66663 2.20008 9.16663 3.52508 9.16663H6.89175C8.21675 9.16663 8.75008 9.66663 8.75008 10.9166Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.75008 3.41663V4.91663C8.75008 6.16663 8.21675 6.66663 6.89175 6.66663H3.52508C2.20008 6.66663 1.66675 6.16663 1.66675 4.91663V3.41663C1.66675 2.16663 2.20008 1.66663 3.52508 1.66663H6.89175C8.21675 1.66663 8.75008 2.16663 8.75008 3.41663Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DeviceSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.36666 1.66699H14.625C17.5917 1.66699 18.3333 2.40866 18.3333 5.36699V10.642C18.3333 13.6087 17.5917 14.342 14.6333 14.342H5.36666C2.40833 14.3503 1.66666 13.6087 1.66666 10.6503V5.36699C1.66666 2.40866 2.40833 1.66699 5.36666 1.66699Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 14.3496V18.3329"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1.66666 10.833H18.3333"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.25 18.333H13.75"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const ServiceSVG = () => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4.57986" cy="14.4026" r="0.708276" fill="#A9A9B0" />
    <circle cx="6.9407" cy="14.4016" r="0.708276" fill="#A9A9B0" />
    <circle cx="9.30154" cy="14.4016" r="0.708276" fill="#A9A9B0" />
    <g clip-path="url(#clip0_66396_7501)">
      <path
        d="M13.0697 5.19043C13.5212 5.19043 13.9317 5.31846 14.2862 5.60012C14.9579 6.1415 15.0549 7.05966 14.4915 7.71078C14.3161 7.91562 14.1071 8.09852 13.9093 8.28142C13.663 8.50822 13.4839 8.7533 13.4988 9.11178C13.51 9.3715 13.2899 9.54342 13.0324 9.53611C12.7898 9.52513 12.6219 9.33858 12.6107 9.07886C12.5883 8.60332 12.7562 8.20094 13.0846 7.86075C13.3085 7.62664 13.5548 7.41814 13.775 7.18037C14.0772 6.85847 14.0101 6.4378 13.622 6.21466C13.5026 6.14516 13.357 6.09761 13.2152 6.07932C12.7674 6.02445 12.3644 6.15979 12.1927 6.72678C12.1218 6.96821 11.8718 7.09258 11.6404 7.02308C11.3979 6.95357 11.271 6.72312 11.3382 6.47072C11.5397 5.68791 12.2077 5.19409 13.0697 5.19043Z"
        fill="#A9A9B0"
      />
      <path
        d="M13.0732 9.98947C13.327 9.99679 13.5136 10.1907 13.5061 10.4321C13.4987 10.6808 13.2934 10.8637 13.0359 10.8528C12.7896 10.8418 12.6031 10.6443 12.6142 10.4028C12.6217 10.1614 12.8195 9.98216 13.0732 9.98947Z"
        fill="#A9A9B0"
      />
    </g>
    <path
      d="M20.9999 8.18601C20.9999 10.0609 19.9886 11.7464 18.3784 12.9193C18.3226 12.9583 18.292 13.0251 18.2892 13.092L18.2196 14.9168C18.2112 15.1619 17.941 15.304 17.7348 15.1731L16.1886 14.2008C16.1886 14.2008 16.1886 14.2008 16.1858 14.2008C16.0967 14.1423 15.9881 14.1256 15.8878 14.1562C14.9684 14.4431 13.9683 14.6019 12.9208 14.6019C12.9068 14.6019 12.8929 14.6019 12.879 14.6019C12.9068 14.4181 12.9208 14.2314 12.9208 14.042C12.9208 11.426 10.2519 9.30594 6.95894 9.30594C6.28196 9.30594 5.63285 9.39509 5.02552 9.55946C4.90294 9.1165 4.83887 8.65404 4.83887 8.18044C4.83887 4.63398 8.45497 1.76172 12.918 1.76172C17.3838 1.76729 20.9999 4.64234 20.9999 8.18601Z"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M5.02842 9.56445C2.68547 10.2024 1 11.9687 1 14.047C1 15.4288 1.74662 16.6741 2.93342 17.5405C2.97521 17.5711 2.99749 17.6185 3.00028 17.6686L3.05042 19.0142C3.056 19.1953 3.25658 19.2984 3.40981 19.2037L4.55203 18.4849C4.56038 18.4793 4.57153 18.471 4.57989 18.4654C4.62167 18.432 4.67739 18.4208 4.72754 18.4376C5.41844 18.6604 6.17064 18.783 6.96183 18.783C10.0152 18.783 12.5336 16.9582 12.8819 14.6069"
      stroke="#A9A9B0"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <defs>
      <clipPath id="clip0_66396_7501">
        <rect
          width="3.54138"
          height="5.66621"
          fill="white"
          transform="translate(11.3193 5.18945)"
        />
      </clipPath>
    </defs>
  </svg>
);

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

const SettingSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.68578 18.0437L8.68301 18.0421L4.11493 15.4093C3.16175 14.7663 2.78258 14.4693 2.59073 14.1388C2.40772 13.8237 2.36667 13.4258 2.36667 12.4087V7.59199C2.36667 6.57339 2.40559 6.17441 2.58449 5.86024C2.77032 5.53392 3.13834 5.24176 4.07395 4.60765L8.67509 1.94996L8.67617 1.94933C9.02135 1.74879 9.49263 1.63574 9.9875 1.63574C10.4824 1.63574 10.9537 1.74879 11.2988 1.94933L11.3004 1.95024L15.8851 4.59142C16.8383 5.23437 17.2174 5.5314 17.4093 5.86181C17.5923 6.177 17.6333 6.57483 17.6333 7.59199V12.4003C17.6333 13.4189 17.5944 13.8179 17.4155 14.1321C17.2297 14.4584 16.8617 14.7506 15.9261 15.3847L11.3261 18.0417C11.3259 18.0418 11.3257 18.0419 11.3255 18.042C10.9669 18.2477 10.4907 18.3587 10 18.3587C9.50799 18.3587 9.03359 18.2472 8.68578 18.0437ZM4.23307 4.81747L4.21803 4.82616L4.20364 4.83587L4.18752 4.84675C3.86164 5.06666 3.59376 5.24744 3.38776 5.41047C3.17516 5.57872 2.99255 5.7551 2.86229 5.97965C2.72902 6.2094 2.67395 6.44876 2.64865 6.70466C2.62498 6.94414 2.62499 7.23234 2.625 7.56891L2.625 7.59199V12.4003L2.625 12.4238C2.62499 12.76 2.62498 13.0487 2.64928 13.2892C2.67533 13.5468 2.73203 13.7872 2.86795 14.0184C3.00031 14.2434 3.18561 14.4215 3.40206 14.5926C3.61237 14.7588 3.88614 14.9441 4.22055 15.1703L4.23646 15.1811L4.2513 15.1911L4.26681 15.2001L8.81681 17.8251L8.81702 17.8252C9.16297 18.0246 9.60364 18.1045 10.0042 18.1045C10.4047 18.1045 10.8454 18.0246 11.1913 17.8252L11.1919 17.8249L15.7753 15.1748L15.7909 15.1658L15.8059 15.1556L15.822 15.1447C16.1458 14.9248 16.4121 14.744 16.6169 14.5809C16.8284 14.4125 17.01 14.236 17.1394 14.0115C17.2718 13.782 17.3264 13.5429 17.3515 13.2874C17.375 13.048 17.375 12.76 17.375 12.4233V12.4003V7.59199V7.56856C17.375 7.23229 17.375 6.94359 17.3507 6.70316C17.3247 6.44552 17.268 6.20512 17.132 5.97396C16.9997 5.74887 16.8144 5.57082 16.5979 5.39973C16.3876 5.23349 16.1138 5.04824 15.7794 4.82195L15.7635 4.81122L15.7487 4.80118L15.7332 4.79223L11.1862 2.16898C11.1857 2.16867 11.1851 2.16836 11.1846 2.16805C10.8382 1.96552 10.3984 1.89199 10 1.89199C9.60156 1.89199 9.1617 1.96554 8.81523 2.16814L4.23307 4.81747Z"
      stroke="#A9A9B0"
    />
    <path
      d="M10 12.625C8.55114 12.625 7.375 11.4489 7.375 10C7.375 8.55114 8.55114 7.375 10 7.375C11.4489 7.375 12.625 8.55114 12.625 10C12.625 11.4489 11.4489 12.625 10 12.625ZM10 7.625C8.69052 7.625 7.625 8.69052 7.625 10C7.625 11.3095 8.69052 12.375 10 12.375C11.3095 12.375 12.375 11.3095 12.375 10C12.375 8.69052 11.3095 7.625 10 7.625Z"
      fill="#292D32"
      stroke="#A9A9B0"
    />
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

const MSetSVG = () => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 16.6667C10.4602 16.6667 10.8333 16.2936 10.8333 15.8333C10.8333 15.3731 10.4602 15 10 15C9.53976 15 9.16666 15.3731 9.16666 15.8333C9.16666 16.2936 9.53976 16.6667 10 16.6667Z"
      fill="#A9A9B0"
      stroke="#A9A9B0"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 10.8337C10.4602 10.8337 10.8333 10.4606 10.8333 10.0003C10.8333 9.54009 10.4602 9.16699 10 9.16699C9.53976 9.16699 9.16666 9.54009 9.16666 10.0003C9.16666 10.4606 9.53976 10.8337 10 10.8337Z"
      fill="#A9A9B0"
      stroke="#A9A9B0"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 4.99967C10.4602 4.99967 10.8333 4.62658 10.8333 4.16634C10.8333 3.7061 10.4602 3.33301 10 3.33301C9.53976 3.33301 9.16666 3.7061 9.16666 4.16634C9.16666 4.62658 9.53976 4.99967 10 4.99967Z"
      fill="#A9A9B0"
      stroke="#A9A9B0"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const DashboardIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DashboardSVG} {...props} />
);

const DeviceIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DeviceSVG} {...props} />
);

const ServiceIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ServiceSVG} {...props} />
);

const NumberIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={NumberSVG} {...props} />
);

const SettingIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SettingSVG} {...props} />
);

const LogoutIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogoutSVG} {...props} />
);

const MSetIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MSetSVG} {...props} />
);

const SidebarData = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Thiết bị",
    path: "/device/list_device",
    icon: <DeviceIcon />,
  },
  {
    title: "Dịch vụ",
    path: "/service/list_service",
    icon: <ServiceIcon />,
  },
  {
    title: "Cấp số",
    path: "/number/list_number",
    icon: <NumberIcon />,
  },
  {
    title: "Báo cáo",
    path: "/report/list_report",
    icon: (
      <img
        src="../../../Img/ReportSVG.png"
        alt=""
        style={{ width: "20px", height: "20px" }}
      />
    ),
  },
  {
    title: "Cài đặt hệ thống",
    path: "/setting",
    icon: <SettingIcon />,
  },
];
const LogoutData = [
  {
    title: "Đăng xuất",
    path: "/",
    icon: <LogoutIcon />,
  },
];

export const Sidebar = () => {
  const subMenu = (
    <Menu className="SB_menu">
      <Menu.Item>
        <NavLink className="SB_menu_link" to="/setting/manage_role">
          Quản lý vai trò
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink className="SB_menu_link" to="/setting/manage_account">
          Quản lý tài khoản
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink className="SB_menu_link" to="/setting/manage_user">
          Quản lý người dùng
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const { SubMenu } = Menu;

  return (
    <Sider className="menu_bar">
      <img src="../../../Img/Logo.png" className="logo" alt=""></img>
      <Menu>
        <ul className="menu_bar_1">
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className="SB_item">
                {item.title === "Cài đặt hệ thống" ? (
                  <SubMenu
                    title={
                      <span className="SB_set_icon">
                        {item.icon}
                        <span className="SB_set_text">
                          {item.title}
                          <MSetIcon />
                        </span>
                      </span>
                    }
                  >
                    {subMenu}
                  </SubMenu>
                ) : (
                  <NavLink to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                )}
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
