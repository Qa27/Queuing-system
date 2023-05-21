/* eslint-disable jsx-a11y/anchor-is-valid */
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Badge, Input, Layout, Pagination, Select, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./Number.css";

const { Option } = Select;

interface Number {
  id: string;
  numN: number;
  nameN: string;
  timeN: Timestamp;
  timeSlotN: string;
  sttN: string;
  createdAt: Timestamp;
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

export const Numbers = () => {
  const [number, setNumber] = useState<Number[]>([]);
  const [openNameN, setOpenNameN] = useState<boolean[]>([]);
  const [nameNValue, setnameNValue] = useState<string>("");
  const [openSttN, setOpenSttN] = useState<boolean[]>([]);
  const [sttNValue, setSttNValue] = useState<string>("");
  const [searchText, setSearchText] = useState("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "number");
    const q = query(citiesCol, orderBy("createdAt", "desc"));
    const citySnapshot = await getDocs(q);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Number),
      id: doc.id,
      timeN: doc.data().timeN.toDate?.().toLocaleDateString(),
    }));
    setNumber(cityList);
    console.log(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const handleUpdate = async (id: string) => {
    const docRef = doc(db, "number", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as Number;
    if (data.sttN === "Done") {
      await updateDoc(docRef, {
        sttN: "Skip",
      });
    } else {
      await updateDoc(docRef, {
        sttN: "Done",
      });
    }
    getCities(db);
  };

  const columns = [
    {
      title: "Ordinal numbers",
      dataIndex: "numN",
      key: "numN",
      render: (text: string, record: any, index: number) =>
        number.length - (current - 1) * pageSize - index,
    },
    {
      title: "Service name",
      dataIndex: "nameN",
      key: "nameN",
    },
    {
      title: "Set time",
      dataIndex: "timeSlotN",
      key: "timeSlotN",
    },
    {
      title: "Set date",
      dataIndex: "timeN",
      key: "timeN",
    },
    {
      title: "Status",
      dataIndex: "sttN",
      key: "sttN",
      render: (sttN: string, record: any) => {
        // Because timeN is in the form of timeStamp
        const [day, month, year] = record.timeN.split("/");
        const formattedTimeN = `${year}-${month}-${day}`;
        const currentTime = new Date().getTime();
        const recordTime = new Date(
          formattedTimeN + " " + record.timeSlotN
        ).getTime();
        let status: "processing" | "success" | "error";
        if (recordTime > currentTime) {
          status = "processing";
        } else if (sttN === "Done") {
          status = "success";
        } else {
          status = "error";
        }
        const text =
          status === "processing"
            ? "Waiting"
            : status === "success"
            ? "Done"
            : "Skip";
        return <Badge status={status} text={text} />;
      },
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => <a onClick={() => handleUpdate(id)}>Update</a>,
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => <Link to={`/list_number/${id}`}>Detail</Link>,
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

  const handleNameNChange = (value: string) => {
    setnameNValue(value);
  };
  const handleSttNChange = (value: string) => {
    setSttNValue(value);
  };

  const filteredData = number.filter((item) => {
    const nameNCondition = nameNValue === "" || item.nameN === nameNValue;
    const sttNCondition = sttNValue === "" || item.sttN === sttNValue;

    return nameNCondition && sttNCondition;
  });

  const searchData: Number[] = number.filter((item) =>
    item.nameN.toLowerCase().includes(searchText.toLowerCase())
  );

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const data =
    searchText === ""
      ? filteredData.slice((current - 1) * pageSize, current * pageSize)
      : searchData.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <Layout>
        <Sidebar />
        <RBreadcrumb />
        <Content>
          <span className="title">List of tickets</span>
          <div className="D_box">
            <span className="D_box_title">Service name</span>
            <div className="N_dropdown">
              <Select
                suffixIcon={createCustomSuffixIcon(openNameN)}
                defaultValue=""
                onChange={handleNameNChange}
                onDropdownVisibleChange={(openNameN: any) =>
                  setOpenNameN([openNameN])
                }
              >
                <Option value="">Total</Option>
                <Option value="Cardiovascular examination">
                  Cardiovascular examination
                </Option>
                <Option value="Obstetrics - Gynecological examination">
                  Obstetrics - Gynecological examination
                </Option>
                <Option value="Dental checkup">Dental checkup</Option>
                <Option value="Ear, nose and throat examination">
                  Ear, nose and throat examination
                </Option>
                <Option value="Respiratory examination">
                  Respiratory examination
                </Option>
                <Option value="General examination">General examination</Option>
              </Select>
            </div>
            <div className="N_box2">
              <span className="D_box_title">Status</span>
              <div className="N_dropdown">
                <Select
                  suffixIcon={createCustomSuffixIcon(openSttN)}
                  onDropdownVisibleChange={(openSttN: any) =>
                    setOpenSttN([openSttN as boolean])
                  }
                  defaultValue=""
                  onChange={handleSttNChange}
                >
                  <Option value="">Total</Option>
                  <Option value="Waiting">Waiting</Option>
                  <Option value="Done">Done</Option>
                  <Option value="Skip">Skip</Option>
                </Select>
              </div>
            </div>
            <div className="N_box5">
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
              <Table pagination={false} columns={columns} dataSource={data} />
              <Pagination
                className="D_pagination"
                current={current}
                onChange={(page: any) => setCurrent(page)}
                total={number.length}
                pageSize={pageSize}
              />
            </div>
          </div>
          <section className="section_content">
            <Link to="/list_number/add_number" className="D_add">
              <AddIcon />
              <span>Take a new ticket</span>
            </Link>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
