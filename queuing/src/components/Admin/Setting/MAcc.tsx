import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Badge, Input, Layout, Pagination, Select, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

const { Option } = Select;

interface Acc {
  id: string;
  userA: string;
  nameA: string;
  numA: number;
  emailA: string;
  roleA: string;
  sttA: string;
  passA: string;
  repassA: string;
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

export const MAcc = () => {
  const [acc, setAcc] = useState<Acc[]>([]);
  const [openRoleA, setOpenRoleA] = useState<boolean[]>([]);
  const [roleAValue, setRoleAValue] = useState<string>("");
  const [searchText, setSearchText] = useState("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "acc");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Acc),
      id: doc.id,
    }));
    setAcc(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "userA",
      key: "userA",
    },
    {
      title: "Họ tên",
      dataIndex: "nameA",
      key: "nameA",
    },
    {
      title: "Số điện thoại",
      dataIndex: "numA",
      key: "numA",
    },
    {
      title: "Email",
      dataIndex: "emailA",
      key: "emailA",
    },
    {
      title: "Vai trò",
      dataIndex: "roleA",
      key: "roleA",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "sttA",
      key: "sttA",
      render: (sttA: string) => (
        <Badge
          text={sttA}
          status={sttA === "Hoạt động" ? "success" : "error"}
        />
      ),
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/setting/manage_account/edit_account/${id}`}>Cập nhật</Link>
      ),
    },
  ];

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

  const handleRoleChange = (value: string) => {
    setRoleAValue(value);
  };

  const filteredData = acc.filter((item) => {
    const roleACondition =
      roleAValue === "" || (item.roleA && item.roleA.toString() === roleAValue);
    return roleACondition;
  });

  const searchData: Acc[] = filteredData.filter((item) =>
    item.emailA.toLowerCase().includes(searchText.toLowerCase())
  );

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const data = searchData.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="title">Danh sách tài khoản</span>
          <div className="D_box">
            <span className="D_box_title">Tên vai trò</span>
            <div className="D_dropdown">
              <Select
                suffixIcon={createCustomSuffixIcon(openRoleA)}
                defaultValue=""
                onChange={handleRoleChange}
                onDropdownVisibleChange={(open: any) => setOpenRoleA([open])}
              >
                <Option value="">Tất cả</Option>
                <Option value="Kế toán">Kế toán</Option>
                <Option value="Quản lý">Quản lý</Option>
                <Option value="Admin">Admin</Option>
              </Select>
            </div>
            <div className="D_table">
              <Table pagination={false} columns={columns} dataSource={data} />
              <Pagination
                className="D_pagination"
                current={current}
                onChange={(page: any) => setCurrent(page)}
                total={acc.length}
                pageSize={pageSize}
              />
            </div>
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
          </div>
          <section className="section_content">
            <Link to="/setting/manage_account/add_account" className="D_add">
              <AddIcon />
              <span>Thêm tài khoản</span>
            </Link>
          </section>
        </Content>
      </Layout>
    </div>
  );
};
