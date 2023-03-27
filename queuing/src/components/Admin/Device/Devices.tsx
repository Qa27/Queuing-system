/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../../Server/firebase";
import { Link } from "react-router-dom";
import { Badge, Input, Layout, Pagination, Popover, Select, Table } from "antd";
import { Sidebar } from "../../More/Sidebar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Content } from "antd/es/layout/layout";
import "./Device.css";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { CRbar } from "../../More/CRbar";

const { Option } = Select;

interface Device {
  id: string;
  idD: string;
  name: string;
  ip: string;
  service: string[];
  stt: boolean;
  connect: boolean;
}

const AddSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.8884 2.33301H9.11171C4.86504 2.33301 2.33337 4.86467 2.33337 9.11134V18.8763C2.33337 23.1347 4.86504 25.6663 9.11171 25.6663H18.8767C23.1234 25.6663 25.655 23.1347 25.655 18.888V9.11134C25.6667 4.86467 23.135 2.33301 18.8884 2.33301ZM18.6667 14.8747H14.875V18.6663C14.875 19.1447 14.4784 19.5413 14 19.5413C13.5217 19.5413 13.125 19.1447 13.125 18.6663V14.8747H9.33337C8.85504 14.8747 8.45837 14.478 8.45837 13.9997C8.45837 13.5213 8.85504 13.1247 9.33337 13.1247H13.125V9.33301C13.125 8.85467 13.5217 8.45801 14 8.45801C14.4784 8.45801 14.875 8.85467 14.875 9.33301V13.1247H18.6667C19.145 13.1247 19.5417 13.5213 19.5417 13.9997C19.5417 14.478 19.145 14.8747 18.6667 14.8747Z"
      fill="#FF9138"
    />
  </svg>
);

const SearchSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
      stroke="#FF7506"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17.5 17.5L13.875 13.875"
      stroke="#FF7506"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const AddIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AddSVG} {...props} />
);

const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SearchSVG} {...props} />
);

export const Devices = () => {
  const [device, setDevice] = useState<Device[]>([]);
  const [open, setOpen] = useState<boolean[]>([]);
  const [openSTT, setOpenSTT] = useState<boolean[]>([]);
  const [openConnect, setOpenConnect] = useState<boolean[]>([]);
  const [sttValue, setSttValue] = useState<string>("");
  const [connectValue, setConnectValue] = useState<string>("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "device");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Device),
      id: doc.id,
    }));
    setDevice(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const onDelete = async (id: any) => {
    await deleteDoc(doc(db, "device", id));
    window.location.reload();
  };

  const columns = [
    {
      title: "Mã thiết bị",
      dataIndex: "idD",
      key: "idD",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "stt",
      key: "stt",
      render: (stt: boolean) => (
        <Badge
          status={stt ? "success" : "error"}
          text={stt ? "Hoạt động" : "Ngưng hoạt động"}
        />
      ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "connect",
      key: "connect",
      render: (connect: boolean) => (
        <Badge
          status={connect ? "success" : "error"}
          text={connect ? "Kết nối" : "Mất kết nối"}
        />
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "service",
      key: "service",
      height: 49,
      style: "width:103",
      render: (text: string[] | undefined, record: Device, index: number) => {
        if (Array.isArray(text)) {
          if (text.length > 2) {
            return (
              <>
                {text.slice(0, 2).join(", ")}
                ...
                <Popover
                  className="D_popover"
                  content={
                    <div>
                      {text.map((item, index) => (
                        <span key={index}>
                          {item}
                          {index !== text.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  }
                  trigger="click"
                  open={open[index]}
                  onOpenChange={handleOpenChange(index)}
                >
                  <a className="D_SV_btn" type="link">
                    Xem thêm
                  </a>
                </Popover>
              </>
            );
          } else {
            return text.join(", ");
          }
        }
        return "";
      },
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/device/list_device/view/${id}`}>Chi tiết</Link>
      ),
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/device/list_device/edit_device/${id}`}> Cập nhật </Link>
      ),
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => <button onClick={() => onDelete(id)}>Xóa</button>,
    },
  ];

  const handleOpenChange = (index: number) => (visible: boolean) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = visible;
      return newOpen;
    });
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

  const handleSttChange = (value: string) => {
    setSttValue(value);
    handleFilter(value, connectValue);
  };

  const handleConnectChange = (value: string) => {
    setConnectValue(value);
    handleFilter(sttValue, value);
  };

  const handleFilter = (sttValue: string, connectValue: string) => {
    if (sttValue === "" && connectValue === "") {
      getCities(db);
    } else {
      let filteredDevices = device;
      if (sttValue !== "") {
        filteredDevices = filteredDevices.filter(
          (item) => item.stt === (sttValue === "true")
        );
      }
      if (connectValue !== "") {
        filteredDevices = filteredDevices.filter(
          (item) => item.connect === (connectValue === "true")
        );
      }
      setDevice(filteredDevices);
    }
    setCurrent(1);
  };

  const [searchText, setSearchText] = useState("");

  const filteredData: Device[] = device.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const data = filteredData.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="title">Danh sách thiết bị</span>
          <div className="D_box">
            <span className="D_box_title">Trạng thái hoạt động</span>
            <div className="D_dropdown">
              <Select
                suffixIcon={createCustomSuffixIcon(openSTT)}
                onDropdownVisibleChange={(openSTT) =>
                  setOpenSTT([openSTT as boolean])
                }
                defaultValue=""
                onChange={handleSttChange}
              >
                <Option value="">Tất cả</Option>
                <Option value="true">Hoạt động</Option>
                <Option value="false">Ngưng hoạt động</Option>
              </Select>
            </div>
            <div className="D_box2">
              <span className="D_box_title">Trạng thái kết nối</span>
              <div className="D_dropdown">
                <Select
                  suffixIcon={createCustomSuffixIcon(openConnect)}
                  onDropdownVisibleChange={(openConnect) =>
                    setOpenConnect([openConnect as boolean])
                  }
                  defaultValue=""
                  onChange={handleConnectChange}
                >
                  <Option value="">Tất cả</Option>
                  <Option value="true">Kết nối</Option>
                  <Option value="false">Mất kết nối</Option>
                </Select>
              </div>
              <div className="D_box3">
                <span className="D_box_title">Từ khóa</span>
                <div className="D_search">
                  <Input
                    placeholder="Nhập từ khóa"
                    onChange={(e: any) => {
                      setSearchText(e.target.value);
                    }}
                    suffix={<SearchIcon />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="D_table">
            <Table
              className="my_table"
              pagination={false}
              columns={columns}
              dataSource={data}
            />
            <Pagination
              className="D_pagination"
              current={current}
              onChange={(page) => setCurrent(page)}
              total={filteredData.length}
              pageSize={pageSize}
            />
          </div>
          <section className="section_content">
            <Link to="/device/list_device/add_device" className="D_add">
              <AddIcon />
              <span>Thêm thiết bị</span>
            </Link>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
