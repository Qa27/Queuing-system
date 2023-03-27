import { Button, Layout, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { addDoc, collection } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./AddNumber.css";

const { Option } = Select;

export const AddNumber = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onSubmitBtn = async () => {
    await addDoc(collection(db, "number"), {
      //   nameN: nameN,
    });
    navigate("/number/list_number");
  };

  const createCustomSuffixIcon = (openState: boolean[]) => (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {openState.length === 0 ? (
        <path
          d="M1 1L7 7L13 1"
          fill="#FF7506"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        openState.map((isOpen) =>
          isOpen ? (
            <path
              d="M13 7L7 0.999999L1 7 M13 7L7 0.999999L1 7L13 7Z"
              fill="#FF7506"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path d="M1 1L7 7L13 1" fill="#FF7506" />
          )
        )
      )}
    </svg>
  );

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="AD_title">Quản lý cấp số</span>
          <div className="AN_box">
            <span className="AN_box_title">CẤP SỐ MỚI</span>
            <span className="AN_box_text">Dịch vụ khách hàng lựa chọn</span>
            <div className="AN_dropdown">
              <Select
                // suffixIcon={createCustomSuffixIcon(openSTT)}
                // onDropdownVisibleChange={(openSTT) =>
                //   setOpenSTT([openSTT as boolean])
                // }
                defaultValue=""
                // onChange={handleSttChange}
              >
                <Option value="1">Chọn dịch vụ</Option>
                <Option value="Khám tim mạch">Khám tim mạch</Option>
                <Option value="Khám sản - Phụ khoa">Khám sản - Phụ khoa</Option>
                <Option value="Khám răng hàm mặt">Khám răng hàm mặt</Option>
                <Option value="Khám tai mũi họng">Khám tai mũi họng</Option>
                <Option value="Khám hô hấp">Khám hô hấp</Option>
                <Option value="Khám tổng quát">Khám tổng quát</Option>
              </Select>
            </div>
            <div>
              <Button
                className="AN_back"
                type="primary"
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={() => setOpen(true)}
                className="AN_addD"
                type="primary"
                htmlType="submit"
              >
                In số
              </Button>
              <Modal
                className="AD_modal"
                title="Số thứ tự được cấp"
                centered
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
              >
                <span className="AD_modal_number">2001201</span>
                <span className="AD_modal_text">
                  DV: Khám răng hàm mặt <strong>(tại quầy số 1)</strong>
                </span>
                <div className="AD_modal_box2">
                  <span className="AD_modal_time">
                    Thời gian cấp: <span>123</span>
                  </span>
                  <span className="AD_modal_box2_expiry">
                    Hạn sử dụng: <span>123</span>
                  </span>
                </div>
              </Modal>
            </div>
          </div>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
