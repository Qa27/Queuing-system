/* eslint-disable no-template-curly-in-string */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Col, Form, Input, Layout, message, Row, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import { doc, getDoc, updateDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

const { Option } = Select;

const OPTIONS = [
  "Cardiovascular examination",
  "Obstetrics - Gynecological examination",
  "Dental checkup",
  "Ear, nose and throat examination",
  "Respiratory examination",
  "General examination",
];

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

export const EditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [idDevice, setIdDevice] = useState("");
  const [nameDevice, setNameDevice] = useState("");
  const [ipDevice, setIPDevice] = useState("");
  const [typeDevice, setTypeDevice] = useState("");
  const [userDevice, setUserDevice] = useState("");
  const [passDevice, setPassDevice] = useState("");
  const [serviceDevice, setserviceDevice] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !serviceDevice.includes(o));
  const [newIdDevice, setNewIdDevice] = useState("");
  const [newnameDevice, setNewNameDevice] = useState("");
  const [newipDevice, setNewIPdevice] = useState("");
  const [newtypeDevice, setNewTypeDevice] = useState("");
  const [newuserDevice, setNewUserDevice] = useState("");
  const [newpassDevice, setNewPassDevice] = useState("");
  const [newserviceDevice, setNewServiceDevice] = useState<string[]>([]);
  const [openSTT, setOpenSTT] = useState<boolean[]>([]);

  const decRef = id ? doc(db, "device", id) : null;
  const getd = async () => {
    if (decRef) {
      const deviceSnapshot = await getDoc(decRef);
      setNewIdDevice(deviceSnapshot?.data()?.idD);
      setNewNameDevice(deviceSnapshot?.data()?.name);
      setNewIPdevice(deviceSnapshot?.data()?.ip);
      setNewTypeDevice(deviceSnapshot?.data()?.type);
      setNewUserDevice(deviceSnapshot?.data()?.username);
      setNewPassDevice(deviceSnapshot?.data()?.password);
      setNewServiceDevice(deviceSnapshot?.data()?.service);
    }
  };
  getd();

  const handleChange = (value: any) => {
    setserviceDevice(value);
  };

  const onUpdateBtn = async () => {
    if (
      idDevice &&
      nameDevice &&
      ipDevice &&
      typeDevice &&
      userDevice &&
      passDevice &&
      serviceDevice
    ) {
      if (decRef) {
        await updateDoc(decRef, {
          idD: idDevice,
          name: nameDevice,
          ip: ipDevice,
          type: typeDevice,
          username: userDevice,
          password: passDevice,
          service: serviceDevice,
        });
      }
      navigate("/list_device");
    } else {
      message.error("Please complete all information!");
    }
  };

  const validateMessages = {
    required: "${label} need to be entered!",
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
          <span className="AD_title">Equipment management</span>
          <div className="AD_box">
            <span className="AD_box_title">Device Information</span>
            <Form
              className="AD_form"
              {...layout}
              name="nest-messages"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              validateMessages={validateMessages}
            >
              <Row>
                <Col className="D_col1" span={12}>
                  <Form.Item
                    name={["id"]}
                    label="Device code"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={newIdDevice}
                      onChange={(e: any) => {
                        setIdDevice(e.target.value);
                      }}
                      placeholder={newIdDevice}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["name"]}
                    label="Device name"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={nameDevice}
                      onChange={(e: any) => {
                        setNameDevice(e.target.value);
                      }}
                      placeholder={newnameDevice}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["IP"]}
                    label="IP address"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={ipDevice}
                      onChange={(e: any) => {
                        setIPDevice(e.target.value);
                      }}
                      placeholder={newipDevice}
                    />
                  </Form.Item>
                </Col>
                <Col className="D_col1" span={12}>
                  <Form.Item
                    name={["type"]}
                    label="Type of device"
                    rules={[{ required: true }]}
                  >
                    <Select
                      suffixIcon={createCustomSuffixIcon(openSTT)}
                      onDropdownVisibleChange={(open: any) =>
                        setOpenSTT([open])
                      }
                      value={typeDevice}
                      onChange={(value: string) => {
                        setTypeDevice(value);
                      }}
                      className="DD_device"
                      placeholder={newtypeDevice}
                      allowClear
                    >
                      <Option value="Kiosk">Kiosk</Option>
                      <Option value="Display counter">Display counter</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["username"]}
                    label="Username"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={userDevice}
                      onChange={(e: any) => {
                        setUserDevice(e.target.value);
                      }}
                      placeholder={newuserDevice}
                    />
                  </Form.Item>
                  <Form.Item
                    name={["password"]}
                    label="Password"
                    rules={[{ required: true }]}
                  >
                    <Input
                      value={passDevice}
                      onChange={(e: any) => {
                        setPassDevice(e.target.value);
                      }}
                      placeholder={newpassDevice}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                className="AD_form_center"
                name={["tag"]}
                label="Equipment service"
                rules={[{ required: true }]}
              >
                <Select
                  mode="multiple"
                  placeholder={newserviceDevice.join(", ")}
                  value={serviceDevice}
                  onChange={handleChange}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </Form.Item>
              <div className="AD_note">
                <StartIcon />
                <span className="AD_note_text">This is a required field</span>
              </div>
              <Form.Item className="D_bottom">
                <Button
                  className="D_back"
                  type="primary"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button
                  onClick={onUpdateBtn}
                  className="D_addD"
                  type="primary"
                  htmlType="submit"
                >
                  Device update
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
