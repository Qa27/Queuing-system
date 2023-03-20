import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./Device.css";
import { DeviceList } from "./DeviceList";
import { DType, DeviceType } from "./DeviceType";

export const Device = () => {
  const [dList, setDList] = useState(DeviceType as DType[]);

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="title">Danh sách thiết bị</span>
          <div className="D_box">
            <span>Trạng thái hoạt động</span>
            <DeviceList
              list={dList}
              onEdit={function (_data: DType): void {
                throw new Error("Function not implemented.");
              }}
            ></DeviceList>
          </div>
        </Content>
      </Layout>
      <CRbar />
    </div>
  );
};
