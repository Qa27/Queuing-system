import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Badge, Input, Layout, Pagination, Select, Table } from "antd";
import { DatePicker } from "antd";
import { Content } from "antd/es/layout/layout";
import { Dayjs } from "dayjs";
import { collection, getDocs, Timestamp } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";
import "./Number.css";

const { Option } = Select;
const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface Number {
  id: string;
  numN: number;
  nameUser: string;
  nameN: string;
  timeN: Timestamp;
  expiryN: Timestamp;
  sttN: string;
  sourceN: string;
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

const CalendarSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.66666 4.79199C6.32499 4.79199 6.04166 4.50866 6.04166 4.16699V1.66699C6.04166 1.32533 6.32499 1.04199 6.66666 1.04199C7.00832 1.04199 7.29166 1.32533 7.29166 1.66699V4.16699C7.29166 4.50866 7.00832 4.79199 6.66666 4.79199Z"
      fill="#FF7506"
    />
    <path
      d="M13.3333 4.79199C12.9917 4.79199 12.7083 4.50866 12.7083 4.16699V1.66699C12.7083 1.32533 12.9917 1.04199 13.3333 1.04199C13.675 1.04199 13.9583 1.32533 13.9583 1.66699V4.16699C13.9583 4.50866 13.675 4.79199 13.3333 4.79199Z"
      fill="#FF7506"
    />
    <path
      d="M7.08333 12.0829C6.975 12.0829 6.86667 12.058 6.76667 12.0163C6.65833 11.9746 6.575 11.9163 6.49167 11.8413C6.34167 11.6829 6.25 11.4746 6.25 11.2496C6.25 11.1413 6.275 11.0329 6.31667 10.9329C6.35833 10.8329 6.41667 10.7413 6.49167 10.6579C6.575 10.5829 6.65833 10.5246 6.76667 10.4829C7.06667 10.3579 7.44167 10.4246 7.675 10.6579C7.825 10.8163 7.91667 11.0329 7.91667 11.2496C7.91667 11.2996 7.90833 11.358 7.9 11.4163C7.89167 11.4663 7.875 11.5163 7.85 11.5663C7.83333 11.6163 7.80834 11.6663 7.775 11.7163C7.75 11.7579 7.70833 11.7996 7.675 11.8413C7.51667 11.9913 7.3 12.0829 7.08333 12.0829Z"
      fill="#FF7506"
    />
    <path
      d="M9.99999 12.0837C9.89166 12.0837 9.78332 12.0587 9.68332 12.0171C9.57499 11.9754 9.49166 11.917 9.40832 11.842C9.25832 11.6837 9.16666 11.4754 9.16666 11.2504C9.16666 11.142 9.19166 11.0337 9.23332 10.9337C9.27499 10.8337 9.33332 10.7421 9.40832 10.6587C9.49166 10.5837 9.57499 10.5254 9.68332 10.4837C9.98332 10.3504 10.3583 10.4254 10.5917 10.6587C10.7417 10.8171 10.8333 11.0337 10.8333 11.2504C10.8333 11.3004 10.825 11.3587 10.8167 11.4171C10.8083 11.4671 10.7917 11.5171 10.7667 11.5671C10.75 11.6171 10.725 11.667 10.6917 11.717C10.6667 11.7587 10.625 11.8004 10.5917 11.842C10.4333 11.992 10.2167 12.0837 9.99999 12.0837Z"
      fill="#FF7506"
    />
    <path
      d="M12.9167 12.0837C12.8083 12.0837 12.7 12.0587 12.6 12.0171C12.4917 11.9754 12.4083 11.917 12.325 11.842C12.2917 11.8004 12.2583 11.7587 12.225 11.717C12.1917 11.667 12.1667 11.6171 12.15 11.5671C12.125 11.5171 12.1083 11.4671 12.1 11.4171C12.0917 11.3587 12.0833 11.3004 12.0833 11.2504C12.0833 11.0337 12.175 10.8171 12.325 10.6587C12.4083 10.5837 12.4917 10.5254 12.6 10.4837C12.9083 10.3504 13.275 10.4254 13.5083 10.6587C13.6583 10.8171 13.75 11.0337 13.75 11.2504C13.75 11.3004 13.7417 11.3587 13.7333 11.4171C13.725 11.4671 13.7083 11.5171 13.6833 11.5671C13.6667 11.6171 13.6417 11.667 13.6083 11.717C13.5833 11.7587 13.5417 11.8004 13.5083 11.842C13.35 11.992 13.1333 12.0837 12.9167 12.0837Z"
      fill="#FF7506"
    />
    <path
      d="M7.08333 15C6.975 15 6.86667 14.975 6.76667 14.9333C6.66667 14.8917 6.575 14.8333 6.49167 14.7583C6.34167 14.6 6.25 14.3833 6.25 14.1667C6.25 14.0583 6.275 13.95 6.31667 13.85C6.35833 13.7417 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.95 7.91667 14.1667C7.91667 14.3833 7.825 14.6 7.675 14.7583C7.51667 14.9083 7.3 15 7.08333 15Z"
      fill="#FF7506"
    />
    <path
      d="M9.99999 15C9.78332 15 9.56666 14.9083 9.40832 14.7583C9.25832 14.6 9.16666 14.3833 9.16666 14.1667C9.16666 14.0583 9.19166 13.95 9.23332 13.85C9.27499 13.7417 9.33332 13.65 9.40832 13.575C9.71666 13.2667 10.2833 13.2667 10.5917 13.575C10.6667 13.65 10.725 13.7417 10.7667 13.85C10.8083 13.95 10.8333 14.0583 10.8333 14.1667C10.8333 14.3833 10.7417 14.6 10.5917 14.7583C10.4333 14.9083 10.2167 15 9.99999 15Z"
      fill="#FF7506"
    />
    <path
      d="M12.9167 15.0004C12.7 15.0004 12.4833 14.9087 12.325 14.7587C12.25 14.6837 12.1917 14.5921 12.15 14.4838C12.1083 14.3838 12.0833 14.2754 12.0833 14.1671C12.0833 14.0587 12.1083 13.9504 12.15 13.8504C12.1917 13.7421 12.25 13.6504 12.325 13.5754C12.5167 13.3838 12.8083 13.2921 13.075 13.3504C13.1333 13.3587 13.1833 13.3754 13.2333 13.4004C13.2833 13.4171 13.3333 13.4421 13.3833 13.4754C13.425 13.5004 13.4667 13.5421 13.5083 13.5754C13.6583 13.7338 13.75 13.9504 13.75 14.1671C13.75 14.3837 13.6583 14.6004 13.5083 14.7587C13.35 14.9087 13.1333 15.0004 12.9167 15.0004Z"
      fill="#FF7506"
    />
    <path
      d="M17.0833 8.2002H2.91666C2.57499 8.2002 2.29166 7.91686 2.29166 7.5752C2.29166 7.23353 2.57499 6.9502 2.91666 6.9502H17.0833C17.425 6.9502 17.7083 7.23353 17.7083 7.5752C17.7083 7.91686 17.425 8.2002 17.0833 8.2002Z"
      fill="#FF7506"
    />
    <path
      d="M13.3333 18.9587H6.66667C3.625 18.9587 1.875 17.2087 1.875 14.167V7.08366C1.875 4.04199 3.625 2.29199 6.66667 2.29199H13.3333C16.375 2.29199 18.125 4.04199 18.125 7.08366V14.167C18.125 17.2087 16.375 18.9587 13.3333 18.9587ZM6.66667 3.54199C4.28333 3.54199 3.125 4.70033 3.125 7.08366V14.167C3.125 16.5503 4.28333 17.7087 6.66667 17.7087H13.3333C15.7167 17.7087 16.875 16.5503 16.875 14.167V7.08366C16.875 4.70033 15.7167 3.54199 13.3333 3.54199H6.66667Z"
      fill="#FF7506"
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

const DatePickerSVG = () => (
  <svg
    width="12"
    height="10"
    viewBox="0 0 12 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.13346 4.46129L6.9735 3.75776L5.08342 2.61138C4.68302 2.37211 4 2.54353 4 2.88637V5.11126V7.11474C4 7.45758 4.68302 7.629 5.08342 7.38616L8.13346 5.53624C8.62218 5.2434 8.62218 4.75771 8.13346 4.46129Z"
      fill="#535261"
    />
  </svg>
);

const AddIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AddSVG} {...props} />
);

const CalendarIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CalendarSVG} {...props} />
);

const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SearchSVG} {...props} />
);

const DatePickerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DatePickerSVG} {...props} />
);

export const Numbers = () => {
  const [number, setNumber] = useState<Number[]>([]);
  const [openNameN, setOpenNameN] = useState<boolean[]>([]);
  const [nameNValue, setnameNValue] = useState<string>("");
  const [openSttN, setOpenSttN] = useState<boolean[]>([]);
  const [sttNValue, setSttNValue] = useState<string>("");
  const [openSourceN, setOpenSourceN] = useState<boolean[]>([]);
  const [sourceNValue, setSourceNValue] = useState<string>("");
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [searchText, setSearchText] = useState("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "number");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as Number),
      id: doc.id,
      timeN: doc
        .data()
        .timeN.toDate()
        .toLocaleString("vi-VN", { hour12: false })
        .replace(/:\d{2}\s/, " - "),
      expiryN: doc
        .data()
        .expiryN.toDate()
        .toLocaleString("vi-VN", { hour12: false })
        .replace(/:\d{2}\s/, " - "),
    }));
    setNumber(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  // const onDelete = async (id: any) => {
  //   await deleteDoc(doc(db, "number", id));
  //   window.location.reload();
  // };

  const columns = [
    {
      title: "STT",
      dataIndex: "numN",
      key: "numN",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "nameUser",
      key: "nameUser",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "nameN",
      key: "nameN",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "timeN",
      key: "timeN",
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expiryN",
      key: "expiryN",
    },
    {
      title: "Trạng thái",
      dataIndex: "sttN",
      key: "sttN",
      render: (sttN: string) => (
        <Badge
          status={
            sttN === "Đang chờ"
              ? "processing"
              : sttN === "Đã sử dụng"
              ? "default"
              : "error"
          }
          text={sttN}
        />
      ),
    },
    {
      title: "Nguồn cấp",
      dataIndex: "sourceN",
      key: "sourceN",
    },
    {
      title: " ",
      dataIndex: "id",
      key: "id",
      render: (id: any) => (
        <Link to={`/number/list_number/view/${id}`}>Chi tiết</Link>
      ),
    },
    // {
    //   title: " ",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (id: any) => <button onClick={() => onDelete(id)}>Xóa</button>,
    // },
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
  const handleSourceNChange = (value: string) => {
    setSourceNValue(value);
  };

  const filteredData = number.filter((item) => {
    const nameNCondition =
      nameNValue === "" || (item.nameN && item.nameN.toString() === nameNValue);
    const sttNCondition =
      sttNValue === "" || (item.sttN && item.sttN.toString() === sttNValue);
    const sourceNCondition =
      sourceNValue === "" ||
      (item.sourceN && item.sourceN.toString() === sourceNValue);
    return nameNCondition && sttNCondition && sourceNCondition;
  });

  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") >= 7;
    const tooEarly = dates[1] && dates[1].diff(current, "days") >= 7;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const searchData: Number[] = filteredData.filter(
    (item) =>
      item.nameUser &&
      typeof item.nameUser === "string" &&
      item.nameUser.toLowerCase().includes(searchText.toLowerCase())
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
          <span className="title">Quản lý cấp số</span>
          <div className="D_box">
            <span className="D_box_title">Tên dịch vụ</span>
            <div className="N_dropdown">
              <Select
                suffixIcon={createCustomSuffixIcon(openNameN)}
                defaultValue=""
                onChange={handleNameNChange}
                onDropdownVisibleChange={(openNameN: any) =>
                  setOpenNameN([openNameN])
                }
              >
                <Option value="">Tất cả</Option>
                <Option value="Khám tim mạch">Khám tim mạch</Option>
                <Option value="Khám sản - Phụ khoa">Khám sản - Phụ khoa</Option>
                <Option value="Khám răng hàm mặt">Khám răng hàm mặt</Option>
                <Option value="Khám tai mũi họng">Khám tai mũi họng</Option>
                <Option value="Khám hô hấp">Khám hô hấp</Option>
                <Option value="Khám tổng quát">Khám tổng quát</Option>
              </Select>
            </div>
            <div className="N_box2">
              <span className="D_box_title">Tình trạng</span>
              <div className="N_dropdown">
                <Select
                  suffixIcon={createCustomSuffixIcon(openSttN)}
                  onDropdownVisibleChange={(openSttN: any) =>
                    setOpenSttN([openSttN as boolean])
                  }
                  defaultValue=""
                  onChange={handleSttNChange}
                >
                  <Option value="">Tất cả</Option>
                  <Option value="Đang chờ">Đang chờ</Option>
                  <Option value="Đã sử dụng">Đã sử dụng</Option>
                  <Option value="Bỏ qua">Bỏ qua</Option>
                </Select>
              </div>
            </div>
            <div className="N_box3">
              <span className="D_box_title">Nguồn cấp</span>
              <div className="N_dropdown">
                <Select
                  suffixIcon={createCustomSuffixIcon(openSourceN)}
                  onDropdownVisibleChange={(openSourceN: any) =>
                    setOpenSourceN([openSourceN as boolean])
                  }
                  defaultValue=""
                  onChange={handleSourceNChange}
                >
                  <Option value="">Tất cả</Option>
                  <Option value="Kiosk">Kiosk</Option>
                  <Option value="Hệ thống">Hệ thống</Option>
                </Select>
              </div>
              <div className="N_box4">
                <span className="D_box_title">Chọn thời gian</span>
                <div className="S_time">
                  <RangePicker
                    placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                    value={dates || value}
                    disabledDate={disabledDate}
                    onCalendarChange={(val: any) => setDates(val)}
                    onChange={(val: any) => setValue(val)}
                    onOpenChange={onOpenChange}
                    suffixIcon={<CalendarIcon />}
                    separator={<DatePickerIcon />}
                  />
                </div>
              </div>
              <div className="N_box5">
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
            <Link to="/number/list_number/add_number" className="D_add">
              <AddIcon />
              <span>Cấp số mới</span>
            </Link>
          </section>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
