/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, Layout } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const validateMessages = {
  required: "${label} cần được nhập!",
};

export const NewPass = () => {
  const navigate = useNavigate();

  const onSubmitBtn = () => {
    navigate("/");
  };

  return (
    <div>
      <Layout className="login_box">
        <div>
          <img src="../Img/Logo.png" className="login_logo" alt=""></img>
        </div>
        <span className="forget_repass">Đặt lại mật khẩu mới</span>
        <Form
          className="login_form"
          initialValues={{ remember: true }}
          onFinish={onSubmitBtn}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item
            className="forget_pass"
            label="Mật khẩu"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{ marginTop: "456px" }}
            className="forget_pass"
            label="Nhập lại mật khẩu"
            name="repassword"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ marginTop: "563px" }}
              onClick={onSubmitBtn}
              className="login_submit"
              type="primary"
              htmlType="submit"
            >
              Xác nhận
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
