import React, { useState } from "react";
import { CRbar } from "./CRbar";
import { Sidebar } from "./Sidebar";
import "./Infor.css";
import { Input, Layout, Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { CameraOutlined } from "@ant-design/icons";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const Infor: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div className="up_img">
      <CameraOutlined />
    </div>
  );

  return (
    <div>
      <Layout>
        <Sidebar />
        <div className="infor">
          <span>Personal information</span>
          <div className="box_infor">
            <div className="box_img">
              <div className="img_circle">
                <img src="Img/user.png" alt="" className="in_img"/>
              </div>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-circle"
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
              <span className="infor_name">Qa</span>
            </div>
            <div className="admin_infor">
              <div className="infor_admin">
                <div className="infor_admin_box">
                  <label>Name</label>
                  <Input className="infor_admin_input" prefix="Qa" disabled />
                </div>
                <div className="infor_admin_box">
                  <label>Phone number</label>
                  <Input
                    className="infor_admin_input"
                    prefix="0123456789"
                    disabled
                  />
                </div>
                <div className="infor_admin_box">
                  <label>Email</label>
                  <Input
                    className="infor_admin_input"
                    prefix="qaqa123@gmail.com"
                    disabled
                  />
                </div>
              </div>
              <div className="infor_admin2">
                <div className="infor_admin_box">
                  <label>Username</label>
                  <Input
                    className="infor_admin_input"
                    prefix="qaqa123"
                    disabled
                  />
                </div>
                <div className="infor_admin_box">
                  <label>Password</label>
                  <Input
                    className="infor_admin_input"
                    prefix="123456"
                    disabled
                  />
                </div>
                <div className="infor_admin_box">
                  <label>Role</label>
                  <Input
                    className="infor_admin_input"
                    prefix="Admin"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <CRbar />
    </div>
  );
};
