/* eslint-disable no-template-curly-in-string */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button, Form, Input, Layout } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const WarningSVG = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_66859_3695)">
      <path
        d="M10.228 18.8327C14.8304 18.8327 18.5613 15.1017 18.5613 10.4993C18.5613 5.89698 14.8304 2.16602 10.228 2.16602C5.62561 2.16602 1.89465 5.89698 1.89465 10.4993C1.89465 15.1017 5.62561 18.8327 10.228 18.8327Z"
        stroke="#E73F3F"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.228 13.834H10.2364"
        stroke="#E73F3F"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.228 7.16602V10.4993"
        stroke="#E73F3F"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_66859_3695">
        <rect
          width="20"
          height="20"
          fill="white"
          transform="translate(0.228027 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const WarningIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={WarningSVG} {...props} />
);

const validateMessages = {
  required: "${label} cần được nhập!",
};

export const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userL, setUserL] = useState("");
  const [passL, setPassL] = useState("");

  const onSubmitBtn = (e: any) => {
    e.preventDefault();
    if (userL === "admin" && passL === "123456") {
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Layout className="login_box">
        <div>
          <img src="Img/Logo.png" className="login_logo" alt=""></img>
        </div>
        <Form
          className="login_form"
          initialValues={{ remember: true }}
          onFinish={onSubmitBtn}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            className="login_user"
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e: any) => {
                setUserL(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            className="login_pass"
            label="Mật khẩu"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              onChange={(e: any) => {
                setPassL(e.target.value);
              }}
            />
          </Form.Item>
          {error && (
            <span className="login_error">
              <WarningIcon />
              <span className="login_error_title">
                Sai mật khẩu hoặc tên đăng nhập
              </span>
            </span>
          )}
          <Link to="/login/forget" className="login_forget">
            Quên mật khẩu?
          </Link>
          <Form.Item>
            <Button
              onClick={onSubmitBtn}
              className="login_submit"
              type="primary"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div className="login_right">
          <img src="Img/loginImg.jpg" alt="" className="login_img" />
          <span className="login_title1">Hệ thống</span>
          <span className="login_title2">QUẢN LÝ XẾP HÀNG</span>
        </div>
      </Layout>
    </div>
  );
};
