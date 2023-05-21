import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Input, Layout, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

interface MRole {
  id: string;
  nameR: string;
  peopleR: number;
  descriptionR: string;
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

export const MRoles = () => {
  const [role, setRole] = useState<MRole[]>([]);
  const [searchText, setSearchText] = useState("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "role");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as MRole),
      id: doc.id,
    }));
    setRole(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "nameR",
      key: "nameR",
    },
    {
      title: "Số người dùng",
      dataIndex: "peopleR",
      key: "peopleR",
    },
    {
      title: "Mô tả",
      dataIndex: "descriptionR",
      key: "descriptionR",
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/manage_role/${id}`}> Cập nhật </Link>
      ),
    },
  ];

  const filteredData: MRole[] = role.filter((item) =>
    item.nameR.toLowerCase().includes(searchText.toLowerCase())
  );

  const data = filteredData;

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <div className="D_box">
            <span className="title">Danh sách vai trò</span>
            <div style={{ marginLeft: "900px" }} className="D_box3">
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
            <div className="D_table">
              <Table
                className="my_table"
                pagination={false}
                columns={columns}
                dataSource={data}
              />
            </div>
            <section className="section_content">
              <Link to="/manage_role/add_role" className="D_add">
                <AddIcon />
                <span>Thêm vai trò</span>
              </Link>
            </section>
          </div>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
