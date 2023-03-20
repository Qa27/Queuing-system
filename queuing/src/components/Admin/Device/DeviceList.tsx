import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";
import { Button } from "antd";
import "./Device.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DType } from "./DeviceType";

interface Props {
  list: DType[];
  onEdit: (data: DType) => void;
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

const AddIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AddSVG} {...props} />
);

export const DeviceList = (props: Props) => {
  const { list } = props;
  const [dList, setDList] = useState([] as DType[]);

  const history = useNavigate();

  const onDelete = (id: any) => {
    var index = list
      .map(function (e) {
        return e.id;
      })
      .indexOf(id);
    list.splice(index, 1);
    history("/device");
  };

  useEffect(() => {
    const listInString = window.localStorage.getItem("DeviceList");
    if (listInString) {
      _setlist(JSON.parse(listInString));
    }
  }, []);

  const _setlist = (list: DType[]) => {
    setDList(list);
    window.localStorage.setItem("DeviceList", JSON.stringify(list));
  };

  const onEdit = (data: DType) => {
    const filteredData = dList.filter((x) => x.id === data.id)[0];
    const indexOfRecord = dList.indexOf(filteredData);
    const tempData = [...dList];
    tempData[indexOfRecord] = data;
    _setlist(tempData);
  };

  return (
    <div>
      <table style={{ position: "absolute", marginTop: "300px" }}>
        <tbody>
          <tr>
            <th>Person 1</th>
            <th>Person 2</th>
            <th>Person 3</th>
            <th>Person 4</th>
            <th>Person 5</th>
            <th>Person 6</th>
            <th>Person 7</th>
          </tr>
          {list && list.length > 0
            ? list.map((device) => {
                console.log(device);
                return (
                  <tr key={device.id}>
                    <td>{`${device.name}`}</td>
                    <td>{`${device.Ip}`}</td>
                    <td>{`${device.name}`}</td>
                    <td>{`${device.type}`}</td>
                    <td>{`${device.username}`}</td>
                    <td>{`${device.password}`}</td>
                    <td>{`${device.tag}`}</td>
                    <td>
                      <div>
                        <Button onClick={() => alert(device.id)}>
                          Chi tiết
                        </Button>
                        &nbsp;
                        <Link to="/device/edit_device">
                          <Button onClick={() => onEdit(device)}>
                            Cập nhật
                          </Button>
                        </Link>
                        &nbsp;
                        <Button onClick={() => onDelete(device.id)}>Xóa</Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            : "Không có dữ liệu"}
        </tbody>
      </table>
      <section className="section_content">
        <Link to="/device/add_device" className="D_add">
          <AddIcon />
          <span>Thêm thiết bị</span>
        </Link>
      </section>
    </div>
  );
};
