import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Col, Layout, Row } from "antd";
import { doc, getDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import { db } from "../../../Server/firebase";
import "./ViewDevice.css";
import { Content } from "antd/es/layout/layout";

interface Device {
  id: string;
  idD: string;
  name: string;
  ip: string;
  service: string[];
  username: string;
  password: string;
  type: string;
}

const UpdSVG = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.443 0.345066C19.1213 0.240174 20.7762 0.822905 22.0233 1.96506C23.1655 3.2121 23.7482 4.86705 23.655 6.55697V17.4424C23.7599 19.1323 23.1655 20.7873 22.035 22.0343C20.7879 23.1764 19.1213 23.7592 17.443 23.6543H6.55751C4.86758 23.7592 3.21261 23.1764 1.96556 22.0343C0.823397 20.7873 0.240662 19.1323 0.345554 17.4424V6.55697C0.240662 4.86705 0.823397 3.2121 1.96556 1.96506C3.21261 0.822905 4.86758 0.240174 6.55751 0.345066H17.443ZM10.8115 17.6522L18.6551 9.7853C19.366 9.06271 19.366 7.89725 18.6551 7.18632L17.14 5.67122C16.4174 4.94864 15.2519 4.94864 14.5293 5.67122L13.7485 6.46374C13.6319 6.58028 13.6319 6.77841 13.7485 6.89496C13.7485 6.89496 15.6016 8.73638 15.6365 8.783C15.7647 8.92286 15.8463 9.10933 15.8463 9.31911C15.8463 9.73868 15.5083 10.0883 15.0771 10.0883C14.879 10.0883 14.6925 10.0067 14.5643 9.87854L12.618 7.94387C12.5247 7.85063 12.3616 7.85063 12.2683 7.94387L6.70902 13.5031C6.32442 13.8877 6.10298 14.4005 6.09132 14.9483L6.02139 17.7104C6.02139 17.8619 6.06801 18.0018 6.17291 18.1067C6.2778 18.2116 6.41765 18.2699 6.56917 18.2699H9.30802C9.86745 18.2699 10.4036 18.0484 10.8115 17.6522Z"
      fill="#FF9138"
    />
  </svg>
);

const UpdIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UpdSVG} {...props} />
);

export const ViewDevice = () => {
  const { id } = useParams();
  const [idD, setIdD] = useState("");
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  const [service, setService] = useState<string[]>([]);

  const decRef = id ? doc(db, "device", id) : null;
  const getd = async () => {
    if (decRef) {
      const deviceSnapshot = await getDoc(decRef);
      const { idD, name, ip, service, username, password, type } =
        deviceSnapshot.data() as Device;
      setIdD(idD);
      setName(name);
      setIp(ip);
      setUsername(username);
      setPassword(password);
      setType(type);
      setService(service);
    }
  };
  getd();

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="V_title"> Equipment management</span>
          <div className="V_table">
            <span className="V_table_title">Device Information</span>
            <Row>
              <Col className="V_col1" span={12}>
                <span>
                  Device code: <span>{idD}</span>
                </span>
                <span>
                  Device name: <span>{name}</span>
                </span>
                <span>
                  IP address: <span>{ip}</span>
                </span>
              </Col>
              <Col className="V_col2" span={12}>
                <span>
                  Type of device: <span>{type}</span>
                </span>
                <span>
                  Username: <span>{username}</span>
                </span>
                <span>
                  Password: <span>{password}</span>
                </span>
              </Col>
              <span className="V_col_center">
                Service used:<span>{service.join(", ")}</span>
              </span>
            </Row>
          </div>
          <section className="section_content">
            <Link to={`/list_device/edit_device/${id}`} className="V_add">
              <UpdIcon />
              <span>Device update</span>
            </Link>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
