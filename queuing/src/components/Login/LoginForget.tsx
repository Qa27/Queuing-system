/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, Layout } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForget.css";

const validateMessages = {
  required: "${label} cần được nhập!",
};

export const LoginForget = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [emailL, setEmailL] = useState("");

  const onSubmitBtn = (e: any) => {
    e.preventDefault();
    if (emailL === "admin@test.com") {
      navigate("/login/NewPassword");
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Layout className="login_box">
        <div>
          <img src="../Img/Logo.png" className="login_logo" alt=""></img>
        </div>
        <span className="forget_repass">Đặt lại mật khẩu</span>
        <Form
          className="login_form"
          initialValues={{ remember: true }}
          onFinish={onSubmitBtn}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            className="forget_email"
            label="Vui lòng nhập email để đặt lại mật khẩu của bạn"
            name="email"
            rules={[{ required: true }]}
          >
            <Input
              onChange={(e: any) => {
                setEmailL(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="forget_cancel"
              type="primary"
              onClick={() => navigate(-1)}
            >
              Hủy
            </Button>
            <Button
              onClick={onSubmitBtn}
              className="forget_submit"
              type="primary"
              htmlType="submit"
            >
              Tiếp tục
            </Button>
          </Form.Item>
        </Form>
        <div className="login_right">
          <img src="../Img/LoginForget.jpg" alt="" className="login_img" />
        </div>
      </Layout>
    </div>
  );
};
