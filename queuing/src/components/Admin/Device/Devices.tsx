/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../Server/firebase";
import { Link } from "react-router-dom";
import { Input, Layout, Pagination, Popover, Table } from "antd";
import { Sidebar } from "../../More/Sidebar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import "./Device.css";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { CRbar } from "../../More/CRbar";
import { Content } from "antd/es/layout/layout";

interface Device {
  id: string;
  idD: string;
  name: string;
  ip: string;
  service: string[];
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
  const [searchText, setSearchText] = useState("");

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

  // const onDelete = async (id: any) => {
  //   await deleteDoc(doc(db, "device", id));
  //   window.location.reload();
  // };

  const columns = [
    {
      title: "Device code",
      dataIndex: "idD",
      key: "idD",
    },
    {
      title: "Device name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "IP address",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Service used",
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
                    See more
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
      render: (id: any) => <Link to={`/list_device/${id}`}>Detail</Link>,
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/list_device/edit_device/${id}`}> Update</Link>
      ),
    },
    // {
    //   title: " ",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (id: any) => <button onClick={() => onDelete(id)}>Delete</button>,
    // },
  ];

  const handleOpenChange = (index: number) => (visible: boolean) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = visible;
      return newOpen;
    });
  };

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
          <span className="title">List of devices</span>
          <div className="D_box">
            <span className="D_box_title">Search</span>
            <div className="D_search">
              <Input
                placeholder="Enter keywords"
                onChange={(e: any) => {
                  setSearchText(e.target.value);
                }}
                suffix={<SearchIcon />}
              />
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
              onChange={(page: any) => setCurrent(page)}
              total={filteredData.length}
              pageSize={pageSize}
            />
          </div>
          <section className="section_content">
            <Link to="/list_device/add_device" className="D_add">
              <AddIcon />
              <span>Add device</span>
            </Link>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
