import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Layout } from "antd";
import { Rightbar } from "../../More/Rightbar";
import { Link } from "react-router-dom";
import { Chart } from "./Chart";
import { Sidebar } from "../../More/Sidebar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../Server/firebase";

const { Content } = Layout;

interface Number {
  id: string;
  sttN: string;
}

export const Dashboard: React.FC = () => {
  const [number, setNumber] = useState<Number[]>([]);

  const sttN1 = number.filter((item) => item.sttN === "Done").length;
  const sttN2 = number.filter((item) => item.sttN === "Waiting").length;
  const sttN3 = number.filter((item) => item.sttN === "Skip").length;

  async function getNumbers(db: any) {
    const citiesCol = collection(db, "number");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Number),
      id: doc.id,
    }));
    setNumber(cityList);
  }

  useEffect(() => {
    getNumbers(db);
  }, []);

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <RBreadcrumb />
        <Content>
          <p className="C_Text2">Mixed charts</p>
          <div className="T_box">
            <Link to="/number/list_number" className="box">
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
              <span style={{ marginTop: "22px" }} className="box_text">
                Issued serial number
              </span>
              <span className="box_text2">{number?.length}</span>
            </Link>
            <Link to="/number/list_number" className="box">
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
              <span className="box_text">Number of tickets done</span>
              <span className="box_text2">{sttN1}</span>
            </Link>
            <Link to="/number/list_number" className="box">
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
              <span className="box_text">Number of tickets waiting</span>
              <span className="box_text2">{sttN2}</span>
            </Link>
            <Link to="/number/list_number" className="box">
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
              <span className="box_text">Number of tickets skipped</span>
              <span className="box_text2">{sttN3}</span>
            </Link>
          </div>
          <Chart />
        </Content>
      </Layout>
      <Rightbar />
    </Layout>
  );
};
