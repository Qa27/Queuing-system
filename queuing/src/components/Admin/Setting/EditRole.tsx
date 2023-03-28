/* eslint-disable no-template-curly-in-string */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Checkbox, Col, Form, Input, Layout, message, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Content } from "antd/es/layout/layout";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Chức năng x", "Chức năng y", "Chức năng z"];
const defaultCheckedList = ["Chức năng x"];
const plainOptionsB = ["Chức năng x", "Chức năng y", "Chức năng z"];
const defaultCheckedListB = ["Chức năng z"];

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

export const EditRole = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nameR, setNameR] = useState("");
  const [descriptionR, setDescriptionR] = useState("");
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [checkedListB, setCheckedListB] =
    useState<CheckboxValueType[]>(defaultCheckedListB);
  const [indeterminateB, setIndeterminateB] = useState(true);
  const [checkAllB, setCheckAllB] = useState(false);
  const [newNameR, setNewNameR] = useState("");
  const [newDescriptionR, setNewDescriptionR] = useState("");

  const decRef = id ? doc(db, "role", id) : null;
  const getd = async () => {
    if (decRef) {
      const deviceSnapshot = await getDoc(decRef);
      setNewNameR(deviceSnapshot?.data()?.nameR);
      setNewDescriptionR(deviceSnapshot?.data()?.descriptionR);
    }
  };
  getd();

  const onUpdateBtn = async () => {
    if (nameR && descriptionR) {
      if (decRef) {
        await updateDoc(decRef, {
          nameR: nameR,
          descriptionR: descriptionR,
        });
      }
      navigate("/device/list_device");
    } else {
      message.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const validateMessages = {
    required: "${label} cần được nhập!",
  };

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const onChangeB = (list: CheckboxValueType[]) => {
    setCheckedListB(list);
    setIndeterminateB(!!list.length && list.length < plainOptionsB.length);
    setCheckAllB(list.length === plainOptionsB.length);
  };

  const onCheckAllChangeB = (e: CheckboxChangeEvent) => {
    setCheckedListB(e.target.checked ? plainOptionsB : []);
    setIndeterminateB(false);
    setCheckAllB(e.target.checked);
  };

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="AD_title">Danh sách vai trò</span>
          <div
            style={{ marginTop: "172px", width: "1192px" }}
            className="AD_box"
          >
            <span className="AD_box_title">Thông tin vai trò</span>
            <Form
              className="AD_form"
              {...layout}
              name="nest-messages"
              onFinish={onUpdateBtn}
              style={{ maxWidth: 600 }}
              validateMessages={validateMessages}
            >
              <Row>
                <Col className="D_col1" span={12}>
                  <Form.Item
                    name={["nameR"]}
                    label="Tên vai trò"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={newNameR}
                      onChange={(e: any) => {
                        setNameR(e.target.value);
                      }}
                      placeholder={newNameR}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["descriptionR"]}
                    label="Mô tả"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      className="desR"
                      value={newDescriptionR}
                      onChange={(e: any) => {
                        setDescriptionR(e.target.value);
                      }}
                      placeholder={newDescriptionR}
                    />
                  </Form.Item>
                  <div className="AD_note">
                    <StartIcon />
                    <span className="AD_note_text">
                      Là trường thông tin bắt buộc
                    </span>
                  </div>
                </Col>
                <Col className="D_col2" span={12}>
                  <Form.Item
                    name={["roleR"]}
                    label="Phân quyền chức năng"
                    rules={[{ required: true }]}
                  >
                    <div className="role_box">
                      <span className="AR_box_title">Nhóm chức năng A</span>
                      <div className="AR_check">
                        <Checkbox
                          indeterminate={indeterminate}
                          onChange={onCheckAllChange}
                          checked={checkAll}
                        >
                          Tất cả
                        </Checkbox>
                        <CheckboxGroup
                          className="AR_check_group"
                          options={plainOptions}
                          value={checkedList}
                          onChange={onChange}
                        />
                      </div>
                      <span className="AR_box_title">Nhóm chức năng B</span>
                      <div className="AR_check">
                        <Checkbox
                          indeterminate={indeterminateB}
                          onChange={onCheckAllChangeB}
                          checked={checkAllB}
                        >
                          Tất cả
                        </Checkbox>
                        <CheckboxGroup
                          className="AR_check_group"
                          options={plainOptionsB}
                          value={checkedListB}
                          onChange={onChangeB}
                        />
                      </div>
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ marginTop: "155px" }} className="D_bottom">
                <Button
                  className="D_back"
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={onUpdateBtn}
                  className="D_addD"
                  type="primary"
                  htmlType="submit"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
