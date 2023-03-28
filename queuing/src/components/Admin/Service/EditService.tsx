/* eslint-disable no-template-curly-in-string */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Row,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Content } from "antd/es/layout/layout";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

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

export const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [idService, setIdService] = useState("");
  const [nameService, setNameService] = useState("");
  const [desService, setDesService] = useState("");
  const [autoService, setAutoService] = useState<boolean | null>(null);
  const [preService, setPreService] = useState<boolean | null>(null);
  const [surService, setSurService] = useState<boolean | null>(null);
  const [resetService, setResetService] = useState<boolean | null>(null);
  const [numService, setNumService] = useState<number | null>(1);
  const [preNumService, setPreNumService] = useState<number | null>(1);
  const [surNumService, setSurNumService] = useState<number | null>(1);
  const [numService2, setNumService2] = useState<number | null>(9999);
  const [newIdService, setNewIdService] = useState("");
  const [newNameService, setNewNameService] = useState("");
  const [newDesService, setNewDesService] = useState("");
  const [newAutoService, setNewAutoService] = useState<boolean | null>(null);
  const [newPreService, setNewPreService] = useState<boolean | null>(null);
  const [newSurService, setNewSurService] = useState<boolean | null>(null);
  const [newResetService, setNewResetService] = useState<boolean | null>(null);
  const [newNumService, setNewNumService] = useState<number | null>(1);
  const [newPreNumService, setNewPreNumService] = useState<number | null>(1);
  const [newSurNumService, setNewSurNumService] = useState<number | null>(1);
  const [newNumService2, setNewNumService2] = useState<number | null>(9999);

  const decRef = id ? doc(db, "service", id) : null;
  const getd = async () => {
    if (decRef) {
      const deviceSnapshot = await getDoc(decRef);
      setNewIdService(deviceSnapshot?.data()?.idS);
      setNewNameService(deviceSnapshot?.data()?.nameS);
      setNewDesService(deviceSnapshot?.data()?.descriptionS);
      setNewAutoService(deviceSnapshot?.data()?.autoS);
      setNewPreService(deviceSnapshot?.data()?.prefixS);
      setNewSurService(deviceSnapshot?.data()?.surfixS);
      setNewResetService(deviceSnapshot?.data()?.resetS);
      setNewNumService(deviceSnapshot?.data()?.numberS);
      setNewPreNumService(deviceSnapshot?.data()?.preNumS);
      setNewSurNumService(deviceSnapshot?.data()?.surNumS);
      setNewNumService2(deviceSnapshot?.data()?.aumax);
    }
  };
  getd();

  const handleChange = (value: number | null) => {
    setNumService(value);
  };
  const handleChange2 = (value: number | null) => {
    setNumService2(value);
  };
  const handleChange3 = (value: number | null) => {
    setPreNumService(value);
  };
  const handleChange4 = (value: number | null) => {
    setSurNumService(value);
  };

  const formatNumber = (value: number | string | undefined) => {
    if (!value) {
      return "";
    }
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      return "";
    }
    return numberValue.toString().padStart(4, "0");
  };

  const formatNumber2 = (value: number | string | undefined) => {
    if (!value) {
      return "";
    }
    const numberValue2 = Number(value);
    if (isNaN(numberValue2)) {
      return "";
    }
    return numberValue2.toString().padStart(4, "0");
  };

  const onUpdateBtn = async () => {
    if (idService && nameService && desService) {
      if (decRef) {
        await updateDoc(decRef, {
          idS: idService,
          nameS: nameService,
          descriptionS: desService,
          autoS: autoService ?? null,
          prefixS: preService ?? null,
          surfixS: surService ?? null,
          numberS: numService,
          auNumS: numService,
          aumax: numService2,
          preNumS: preNumService ?? null,
          surNumS: surNumService ?? null,
          resetS: resetService ?? null,
        });
      }
      navigate("/service/list_service");
    } else {
      message.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const validateMessages = {
    required: "${label} cần được nhập!",
  };

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="AD_title">Quản lý dịch vụ</span>
          <div className="AD_box">
            <span className="AD_box_title">Thông tin dịch vụ</span>
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
                    name={["id"]}
                    label="Mã dịch vụ"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={newIdService}
                      onChange={(e: any) => {
                        setIdService(e.target.value);
                      }}
                      placeholder={newIdService}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["nameS"]}
                    label="Tên dịch vụ"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={newNameService}
                      onChange={(e: any) => {
                        setNameService(e.target.value);
                      }}
                      placeholder={newNameService}
                    />
                  </Form.Item>
                </Col>
                <Col className="D_col2" span={12}>
                  <Form.Item
                    name={["desS"]}
                    label="Mô tả"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      className="desS"
                      value={newDesService}
                      onChange={(e: any) => {
                        setDesService(e.target.value);
                      }}
                      placeholder={newDesService}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <span className="S_box_title">Quy tắc cấp số</span>
              <div style={{ marginTop: "12px" }} className="autoS">
                <Checkbox
                  checked={newAutoService || false}
                  onChange={(e: CheckboxChangeEvent) => {
                    setAutoService(e.target.checked);
                  }}
                >
                  <span>Tăng tự động từ:</span>
                  <InputNumber
                    className="numS"
                    min={1}
                    max={9999}
                    value={newNumService}
                    onChange={handleChange}
                    formatter={formatNumber}
                  />
                  <span style={{ position: "absolute", marginLeft: "106px" }}>
                    đến
                  </span>
                  <InputNumber
                    className="numS2"
                    min={1}
                    max={9999}
                    value={newNumService2}
                    onChange={handleChange2}
                    formatter={formatNumber2}
                  />
                </Checkbox>
                <div className="autoS">
                  <Checkbox
                    checked={newPreService || false}
                    onChange={(e: CheckboxChangeEvent) => {
                      setPreService(e.target.checked);
                    }}
                  >
                    <span>Prefix:</span>
                    <InputNumber
                      style={{ marginLeft: "85px" }}
                      className="numS"
                      min={1}
                      max={9999}
                      value={newPreNumService}
                      onChange={handleChange3}
                      formatter={formatNumber}
                    />
                  </Checkbox>
                </div>
                <div className="autoS">
                  <Checkbox
                    checked={newSurService || false}
                    onChange={(e: CheckboxChangeEvent) => {
                      setSurService(e.target.checked);
                    }}
                  >
                    <span>Surfix:</span>
                    <InputNumber
                      style={{ marginLeft: "85px" }}
                      className="numS"
                      min={1}
                      max={9999}
                      value={newSurNumService}
                      onChange={handleChange4}
                      formatter={formatNumber}
                    />
                  </Checkbox>
                </div>
                <div style={{ marginTop: "20px" }} className="autoS">
                  <Checkbox
                    checked={newResetService || false}
                    onChange={(e: CheckboxChangeEvent) => {
                      setResetService(e.target.checked);
                    }}
                  >
                    <span>Reset mỗi ngày</span>
                  </Checkbox>
                </div>
              </div>
              <div style={{ marginTop: "14px" }} className="AD_note">
                <StartIcon />
                <span className="AD_note_text">
                  Là trường thông tin bắt buộc
                </span>
              </div>
              <Form.Item style={{ marginTop: "34px" }} className="D_bottom">
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
