import React from "react";
import "./Dashboard.css";
import { Layout, Statistic } from "antd";
import { Rightbar } from "../../More/Rightbar";
import { Link } from "react-router-dom";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Chart } from "./Chart";
import { Sidebar } from "../../More/Sidebar";
import { RBreadcrumb } from "../../More/RBreadcrumb";

const { Content } = Layout;

export const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
      <RBreadcrumb/>
        <Content>
          <p className="C_Text2">Biểu đồ cấp số</p>
          <div className="T_box">
            <Link to="/numbers" className="box">
              <div className="icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24"
                    cy="24"
                    r="23.5"
                    fill="#6695FB"
                    stroke="#DADADA"
                  />
                </svg>
                <img className="img" src="./Img/calendar.png" alt="" />
              </div>
              <span style={{marginTop:"22px"}} className="box_text">Số thứ tự đã cấp</span>
              <span className="box_text2">4.221</span>
              <div className="box_up">
                <Statistic
                  className=""
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    fontSize: "9px",
                    padding: "2.5px 4px",
                    color: "#FF9138",
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </div>
            </Link>
            <Link to="/numbers" className="box">
              <div className="icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24"
                    cy="24"
                    r="23.5"
                    fill="#35C75A"
                    stroke="#35C75A"
                    strokeWidth="2"
                  />
                </svg>
                <img className="img" src="./Img/calendar2.png" alt="" />
              </div>
              <span className="box_text">Số thứ tự đã sử dụng</span>
              <span className="box_text2">3.721</span>
              <div className="box_down">
                <Statistic
                  className=""
                  value={32.41}
                  precision={2}
                  valueStyle={{
                    fontSize: "9px",
                    padding: "2.5px 4px",
                    color: "#E73F3F",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </div>
            </Link>
            <Link to="/numbers" className="box">
              <div className="icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24"
                    cy="24"
                    r="23.5"
                    fill="#FFAC6A"
                    stroke="#DADADA"
                  />
                </svg>
                <img className="img" src="./Img/capso.png" alt="" />
              </div>
              <span className="box_text">Số thứ tự đang chờ</span>
              <span className="box_text2">468</span>
              <div className="box_up">
                <Statistic
                  className=""
                  value={56.41}
                  precision={2}
                  valueStyle={{
                    fontSize: "9px",
                    padding: "2.5px 4px",
                    color: "#FF9138",
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </div>
            </Link>
            <Link to="/numbers" className="box">
              <div className="icon">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.15"
                    cx="24"
                    cy="24"
                    r="23.5"
                    fill="#F86D6D"
                    stroke="#DADADA"
                  />
                </svg>
                <img className="img" src="./Img/boqua.png" alt="" />
              </div>
              <span className="box_text"> Số thứ tự đã bỏ qua</span>
              <span className="box_text2">32</span>
              <div className="box_down">
                <Statistic
                  className=""
                  value={22.41}
                  precision={2}
                  valueStyle={{
                    fontSize: "9px",
                    padding: "2.5px 4px",
                    color: "#E73F3F",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </div>
            </Link>
          </div>
          <Chart/>
        </Content>
      </Layout>
      <Rightbar />
    </Layout>
  );
};
