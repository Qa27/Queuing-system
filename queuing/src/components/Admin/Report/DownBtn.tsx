import { Button } from "antd";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const DownExcelSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23.9166 11.888H20.545C17.78 11.888 15.5283 9.63634 15.5283 6.87134V3.49967C15.5283 2.85801 15.0033 2.33301 14.3616 2.33301H9.41496C5.82163 2.33301 2.91663 4.66634 2.91663 8.83134V19.168C2.91663 23.333 5.82163 25.6663 9.41496 25.6663H18.585C22.1783 25.6663 25.0833 23.333 25.0833 19.168V13.0547C25.0833 12.413 24.5583 11.888 23.9166 11.888ZM14.3266 18.4097L11.9933 20.743C11.9116 20.8247 11.8066 20.8947 11.7016 20.9297C11.5966 20.9763 11.4916 20.9997 11.375 20.9997C11.2583 20.9997 11.1533 20.9763 11.0483 20.9297C10.955 20.8947 10.8616 20.8247 10.7916 20.7547C10.78 20.743 10.7683 20.743 10.7683 20.7313L8.43496 18.398C8.09663 18.0597 8.09663 17.4997 8.43496 17.1613C8.77329 16.823 9.33329 16.823 9.67163 17.1613L10.5 18.013V13.1247C10.5 12.6463 10.8966 12.2497 11.375 12.2497C11.8533 12.2497 12.25 12.6463 12.25 13.1247V18.013L13.09 17.173C13.4283 16.8347 13.9883 16.8347 14.3266 17.173C14.665 17.5113 14.665 18.0713 14.3266 18.4097Z"
      fill="#FF7506"
    />
    <path
      d="M20.335 10.2779C21.4434 10.2896 22.9834 10.2896 24.3017 10.2896C24.9667 10.2896 25.3167 9.50792 24.85 9.04125C23.17 7.34958 20.16 4.30458 18.4334 2.57792C17.955 2.09958 17.1267 2.42625 17.1267 3.09125V7.16292C17.1267 8.86625 18.5734 10.2779 20.335 10.2779Z"
      fill="#FF7506"
    />
  </svg>
);

const DownExcelIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DownExcelSVG} {...props} />
);

interface ButtonDownloadProps {
  columns: {
    title: string | Element;
    dataIndex: string;
    key: string;
    render?: (...args: any[]) => React.ReactNode;
  }[];
  data: any[] | Number[];
}

export const DownBtn = ({ columns, data }: ButtonDownloadProps) => {
  const handleDownload = () => {
    // Tạo một đối tượng Workbook mới
    const workbook = XLSX.utils.book_new();

    // Tạo một Worksheet mới và thêm dữ liệu vào đó
    const columnNames = columns.map((column) => column.dataIndex);
    const worksheet = XLSX.utils.json_to_sheet(data, { header: columnNames });
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };

  return (
    <Button className="R_add" type="primary" onClick={handleDownload}>
      <DownExcelIcon />
      Tải về
    </Button>
  );
};
