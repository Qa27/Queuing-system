import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { DatePicker, Input, Layout, Pagination, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { Dayjs } from "dayjs";
import { collection, getDocs, Timestamp } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { db } from "../../../Server/firebase";
import { CRbar } from "../../More/CRbar";
import { RBreadcrumb } from "../../More/RBreadcrumb";
import { Sidebar } from "../../More/Sidebar";

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

interface MUser {
  id: string;
  nameU: string;
  timeU: Timestamp;
  ipU: string;
  actU: string;
}

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

const CalendarIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={CalendarSVG} {...props} />
);

const DatePickerIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DatePickerSVG} {...props} />
);

const SearchIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SearchSVG} {...props} />
);

export const MUsers = () => {
  const [userU, setUserU] = useState<MUser[]>([]);
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
  const [value, setValue] = useState<RangeValue>(null);
  const [searchText, setSearchText] = useState("");

  async function getCities(db: any) {
    const citiesCol = collection(db, "user");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => ({
      ...(doc.data() as MUser),
      id: doc.id,
      timeU: doc.data().timeU.toDate().toLocaleString("vi-VN", {
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }));
    setUserU(cityList);
  }

  useEffect(() => {
    getCities(db);
  }, []);

  const columns = [
    {
      title: "Tên đăng nhập",
      dataIndex: "nameU",
      key: "nameU",
    },
    {
      title: "Thời gian tác động",
      dataIndex: "timeU",
      key: "timeU",
    },
    {
      title: "IP thực hiện",
      dataIndex: "ipU",
      key: "ipU",
    },
    {
      title: "Thao tác thực hiện",
      dataIndex: "actU",
      key: "actU",
    },
  ];

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

  const filteredData: MUser[] = userU.filter((item) =>
    item.nameU.toLowerCase().includes(searchText.toLowerCase())
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
          <div className="D_box">
            <div className="N_box">
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
            <div className="D_table">
              <Table pagination={false} columns={columns} dataSource={data} />
              <Pagination
                className="D_pagination"
                current={current}
                onChange={(page: any) => setCurrent(page)}
                total={userU.length}
                pageSize={pageSize}
              />
            </div>
          </div>
        </Content>
        <CRbar />
      </Layout>
    </div>
  );
};
