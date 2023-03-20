import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Col, Form, Input, Layout, Row, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import { DeviceType, DType } from "./DeviceType";

interface Props {
  list: DType[];
}

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

const onFinish = (values: any) => {
  console.log(values);
};

export const EditDevice = (props: Props) => {
  const navigate = useNavigate();

  const [idDevice, setIdDevice] = useState("");
  const [nameDevice, setNameDevice] = useState("");
  const [ipDevice, setIPDevice] = useState("");
  const [typeDevice, setTypeDevice] = useState("");
  const [userDevice, setUserDevice] = useState("");
  const [passDevice, setPassDevice] = useState("");
  const [tagsDevice, setTagsDevice] = useState("");

  const onIdDevice = (e: any) => {
    setIdDevice(e.target.value);
  };

  const onNameDevice = (e: any) => {
    setNameDevice(e.target.value);
  };

  const onIPDevice = (e: any) => {
    setIPDevice(e.target.value);
  };

  const onTypeDevice = (e: any) => {
    setTypeDevice(e.target.value);
  };

  const onUserDevice = (e: any) => {
    setUserDevice(e.target.value);
  };

  const onPassDevice = (e: any) => {
    setPassDevice(e.target.value);
  };

  const onTagsDevice = (e: any) => {
    setTagsDevice(e.target.value);
  };

  const onSubmitBtn = (e: any) => {
    e.preventDefault();
    const updData: DType = {
      id: new Date().toJSON().toString(),
      iddevice: idDevice,
      name: nameDevice,
      Ip: ipDevice,
      type: typeDevice,
      username: userDevice,
      password: passDevice,
      tag: tagsDevice,
    };
    DeviceType.push(updData);
    navigate("/device");
  };


  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="AD_title">Quản lý thiết bị</span>
          <div className="AD_box">
            <span className="AD_box_title">Thông tin thiết bị</span>
            <Row>
              <Col span={12}>
                <Form
                  className="AD_form"
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item name={["id"]} label="Mã thiết bị">
                    <Input
                      onChange={onIdDevice}
                      placeholder="Nhập mã thiết bị"
                    />
                  </Form.Item>
                  <Form.Item name={["name"]} label="Tên thiết bị">
                    <Input
                      onChange={onNameDevice}
                      placeholder="Nhập tên thiết bị"
                    />
                  </Form.Item>
                  <Form.Item name={["IP"]} label="Địa chỉ IP">
                    <Input
                      onChange={onIPDevice}
                      placeholder="Nhập địa chỉ IP"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  className="AD_form"
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  style={{ maxWidth: 600 }}
                >
                  <Form.Item name={["type"]} label="Loại thiết bị">
                    <Select
                      onChange={onTypeDevice}
                      className="DD_device"
                      placeholder="Chọn loại thiết bị"
                      allowClear
                    >
                      <Option value="device1">Kiosk</Option>
                      <Option value="device2">Display counter</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name={["username"]} label="Tên đăng nhập">
                    <Input
                      onChange={onUserDevice}
                      placeholder="Nhập tài khoản"
                    />
                  </Form.Item>
                  <Form.Item name={["password"]} label="Mật khẩu">
                    <Input
                      onChange={onPassDevice}
                      placeholder="Nhập mật khẩu"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Form
                id="AD_form"
                className="AD_form"
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  className="AD_form_center"
                  name={["tag"]}
                  label="Dịch vụ thiết bị"
                >
                  <Input
                    onChange={onTagsDevice}
                    placeholder="Nhập dịch vụ thiết bị"
                  />
                </Form.Item>
                <div className="AD_note">
                  <StartIcon />
                  <span className="AD_note_text">
                    Là trường thông tin bắt buộc
                  </span>
                </div>
              </Form>
            </Row>
          </div>
          <Form.Item className="D_bottom">
            <Button
              className="D_back"
              type="primary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              onClick={onSubmitBtn}
              className="D_addD"
              type="primary"
              htmlType="submit"
            >
              Thêm thiết bị
            </Button>
          </Form.Item>
        </Content>
      </Layout>
      <CRbar />
    </div>
  );
};
