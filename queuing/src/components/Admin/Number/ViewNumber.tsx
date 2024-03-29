import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { doc, getDoc, Timestamp } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

interface Number {
  id: string;
  numN: number;
  nameN: string;
  timeN: Timestamp;
  timeSlotN: string;
  sttN: string;
  sourceN: string;
}

const BackSVG = () => (
  <svg
    width="28"
    height="29"
    viewBox="0 0 28 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8885 2.54004H9.1235C4.86516 2.54004 2.3335 5.07171 2.3335 9.31837V19.0834C2.3335 23.33 4.86516 25.8617 9.11183 25.8617H18.8768C23.1235 25.8617 25.6552 23.33 25.6552 19.0834V9.31837C25.6668 5.07171 23.1352 2.54004 18.8885 2.54004Z"
      fill="#FF7506"
    />
    <path
      d="M16.2398 10.1H10.2315L10.6165 9.71503C10.9548 9.37669 10.9548 8.81669 10.6165 8.47836C10.2782 8.14003 9.71818 8.14003 9.37985 8.47836L7.54818 10.31C7.20985 10.6484 7.20985 11.2084 7.54818 11.5467L9.37985 13.3784C9.55485 13.5534 9.77652 13.635 9.99818 13.635C10.2198 13.635 10.4415 13.5534 10.6165 13.3784C10.9548 13.04 10.9548 12.48 10.6165 12.1417L10.3132 11.8384H16.2398C17.7332 11.8384 18.9582 13.0517 18.9582 14.5567C18.9582 16.0617 17.7448 17.275 16.2398 17.275H10.4998C10.0215 17.275 9.62485 17.6717 9.62485 18.15C9.62485 18.6284 10.0215 19.025 10.4998 19.025H16.2398C18.7015 19.025 20.7082 17.0184 20.7082 14.5567C20.7082 12.095 18.7015 10.1 16.2398 10.1Z"
      fill="#FFF2E7"
    />
  </svg>
);

const BackIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={BackSVG} {...props} />
);

export const ViewNumber = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nameN, setNameN] = useState("");
  const [timeN, setTimeN] = useState("");
  const [timeSlotN, settimeSlotN] = useState("");

  const decRef = id ? doc(db, "number", id) : null;
  const getd = async () => {
    if (decRef) {
      const deviceSnapshot = await getDoc(decRef);
      const { nameN, timeN, timeSlotN } = deviceSnapshot.data() as Number;
      setNameN(nameN);
      setTimeN(timeN.toDate?.().toLocaleDateString());
      settimeSlotN(timeSlotN);
    }
  };
  getd();

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="V_title">Manage tickets</span>
          <div className="V_table">
            <span className="V_table_title">Ticket information</span>
            <Row>
              <Col className="V_col1" span={12}>
                <span>
                  Service name: <span>{nameN}</span>
                </span>

                <span>
                  Set date: <span>{timeN}</span>
                </span>
                <span>
                  Set time: <span>{timeSlotN}</span>
                </span>
              </Col>
            </Row>
          </div>
          <section className="section_content">
            <Button
              className="V_add"
              type="primary"
              onClick={() => navigate(-1)}
            >
              <BackIcon />
              <span>Back</span>
            </Button>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
