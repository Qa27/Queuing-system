import { Badge, Layout, Pagination, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import { DownBtn } from "./DownBtn";
import "./Reports.css";

export const Reports = () => {
  const [number, setNumber] = useState<Number[]>([]);

  async function getCities(db: any) {
    const citiesCol = collection(db, "number");
    const q = query(citiesCol, orderBy("createdAt", "desc"));
    const citySnapshot = await getDocs(q);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Number),
      id: doc.id,
      timeN: doc.data().timeN.toDate?.().toLocaleDateString(),
    }));
    setNumber(cityList);
    console.log(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const columns = [
    {
      title: "Ordinal numbers",
      dataIndex: "numN",
      key: "numN",
      render: (text: string, record: any, index: number) =>
        number.length - (current - 1) * pageSize - index,
    },
    {
      title: "Service name",
      dataIndex: "nameN",
      key: "nameN",
    },
    {
      title: "Set time",
      dataIndex: "timeSlotN",
      key: "timeSlotN",
    },
    {
      title: "Set date",
      dataIndex: "timeN",
      key: "timeN",
    },
    {
      title: "Status",
      dataIndex: "sttN",
      key: "sttN",
      render: (sttN: string, record: any) => {
        // Because timeN is in the form of timeStamp
        const [day, month, year] = record.timeN.split("/");
        const formattedTimeN = `${year}-${month}-${day}`;
        const currentTime = new Date().getTime();
        const recordTime = new Date(
          formattedTimeN + " " + record.timeSlotN
        ).getTime();
        let status: "processing" | "success" | "error";
        if (recordTime > currentTime) {
          status = "processing";
        } else if (sttN === "Done") {
          status = "success";
        } else {
          status = "error";
        }
        const text =
          status === "processing"
            ? "Waiting"
            : status === "success"
            ? "Done"
            : "Skip";
        return <Badge status={status} text={text} />;
      },
    },
  ];

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const data = number.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <div className="D_box">
            <span className="title">Data report</span>
            <div className="D_table R_box">
              <Table pagination={false} columns={columns} dataSource={data} />
              <Pagination
                className="D_pagination"
                current={current}
                onChange={(page: any) => setCurrent(page)}
                total={number.length}
                pageSize={pageSize}
              />
            </div>
          </div>
          <section className="section_content">
            <DownBtn columns={columns} data={number} />
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
