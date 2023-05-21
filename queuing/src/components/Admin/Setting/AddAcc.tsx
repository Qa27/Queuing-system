/* eslint-disable no-template-curly-in-string */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Col, Form, Input, Layout, message, Row, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { addDoc, collection } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./AddAcc.css";

const { Option } = Select;

const StartSVG = () => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
      fill="#FF4747"
    />
  </svg>
);

const StartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={StartSVG} {...props} />
);

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const AddAcc = () => {
  const navigate = useNavigate();
  const [userA, setUserA] = useState("");
  const [nameA, setNameA] = useState("");
  const [numA, setNumA] = useState("");
  const [emailA, setEmailA] = useState("");
  const [roleA, setRoleA] = useState("");
  const [sttA, setSttA] = useState("");
  const [passA, setPassA] = useState("");
  const [repassA, setRePassA] = useState("");
  const [openRoleA, setOpenRoleA] = useState<boolean[]>([]);
  const [openRoleB, setOpenRoleB] = useState<boolean[]>([]);

  const onSubmitBtn = async () => {
    if (nameA && numA && emailA && roleA && sttA && passA && repassA) {
      await addDoc(collection(db, "acc"), {
        userA: userA,
        nameA: nameA,
        numA: numA,
        emailA: emailA,
        roleA: roleA,
        sttA: sttA,
        passA: passA,
        repassA: repassA,
      });
      navigate("/manage_account");
    } else {
      message.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const validateMessages = {
    required: "${label} cần được nhập!",
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
          <span className="AD_title">Quản lý tài khoản</span>
          <div className="AD_box">
            <span className="AD_box_title">Thông tin tài khoản</span>
            <Form
              className="AD_form"
              {...layout}
              name="nest-messages"
              onFinish={onSubmitBtn}
              style={{ maxWidth: 600 }}
              validateMessages={validateMessages}
            >
              <Row>
                <Col className="D_col1" span={12}>
                  <Form.Item
                    name={["nameA"]}
                    label="Họ tên"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={nameA}
                      onChange={(e: any) => {
                        setNameA(e.target.value);
                      }}
                      placeholder="Nhập họ tên"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["numA"]}
                    label="Số điện thoại"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={numA}
                      onChange={(e: any) => {
                        setNumA(e.target.value);
                      }}
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["emailA"]}
                    label="Email"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={emailA}
                      onChange={(e: any) => {
                        setEmailA(e.target.value);
                      }}
                      placeholder="Nhập email"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["roleA"]}
                    label="Vai trò"
                    rules={[{ required: true }]}
                  >
                    <Select
                      value={roleA}
                      onChange={(value: string) => {
                        setRoleA(value);
                      }}
                      className="DD_device"
                      placeholder="Chọn vai trò"
                      onDropdownVisibleChange={(open: any) =>
                        setOpenRoleA([open])
                      }
                      suffixIcon={createCustomSuffixIcon(openRoleA)}
                      allowClear
                    >
                      <Option value="Kế toán">Kế toán</Option>
                      <Option value="Quản lý">Quản lý</Option>
                      <Option value="Admin">Admin</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="D_col1" span={12}>
                  <Form.Item
                    name={["userA"]}
                    label="Tên đăng nhập"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={userA}
                      onChange={(e: any) => {
                        setUserA(e.target.value);
                      }}
                      placeholder="Nhập tên đăng nhập"
                    />
                  </Form.Item>
                  <Form.Item
                    className="AA_pass"
                    name={["passA"]}
                    label="Mật khẩu"
                    rules={[{ required: true }]}
                  >
                    <Input.Password
                      value={passA}
                      onChange={(e: any) => {
                        setPassA(e.target.value);
                      }}
                      placeholder="●●●●●●●"
                    />
                  </Form.Item>
                  <Form.Item
                    className="AA_pass"
                    name={["repassA"]}
                    label="Nhập lại mật khẩu"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("passA") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Mật khẩu không trùng khớp")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      value={repassA}
                      onChange={(e: any) => {
                        setRePassA(e.target.value);
                      }}
                      placeholder="●●●●●●●"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["sttA"]}
                    label="Vai trò"
                    rules={[{ required: true }]}
                  >
                    <Select
                      value={sttA}
                      onChange={(value: string) => {
                        setSttA(value);
                      }}
                      className="DD_device"
                      placeholder="Chọn vai trò"
                      onDropdownVisibleChange={(open: any) =>
                        setOpenRoleB([open])
                      }
                      suffixIcon={createCustomSuffixIcon(openRoleB)}
                      allowClear
                    >
                      <Option value="Hoạt động">Hoạt động</Option>
                      <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="AD_note">
                <StartIcon />
                <span className="AD_note_text">
                  Là trường thông tin bắt buộc
                </span>
              </div>
              <Form.Item className="D_bottom">
                <Button
                  className="D_back"
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={onSubmitBtn}
                  className="D_addD"
                  type="primary"
                  htmlType="submit"
                >
                  Thêm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </div>
  );
};
