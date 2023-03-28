import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./RBreadcrumb.css";
import Icon, {
  CustomIconComponentProps,
} from "@ant-design/icons/lib/components/Icon";

const RBSVG = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3583 9.40825L8.825 5.87492C8.74753 5.79681 8.65536 5.73481 8.55381 5.69251C8.45226 5.6502 8.34334 5.62842 8.23333 5.62842C8.12332 5.62842 8.0144 5.6502 7.91285 5.69251C7.8113 5.73481 7.71913 5.79681 7.64166 5.87492C7.48646 6.03105 7.39934 6.24226 7.39934 6.46242C7.39934 6.68257 7.48646 6.89378 7.64166 7.04992L10.5917 9.99992L7.64166 12.9499C7.48646 13.1061 7.39934 13.3173 7.39934 13.5374C7.39934 13.7576 7.48646 13.9688 7.64166 14.1249C7.71953 14.2022 7.81188 14.2633 7.91341 14.3047C8.01494 14.3462 8.12366 14.3672 8.23333 14.3666C8.343 14.3672 8.45172 14.3462 8.55325 14.3047C8.65478 14.2633 8.74713 14.2022 8.825 14.1249L12.3583 10.5916C12.4364 10.5141 12.4984 10.4219 12.5407 10.3204C12.583 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.583 9.78098 12.5407 9.67944C12.4984 9.57789 12.4364 9.48572 12.3583 9.40825Z"
      fill="#7E7D88"
    />
  </svg>
);

const RBIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RBSVG} {...props} />
);

export const RBreadcrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div className="space">
        <Breadcrumb separator={<RBIcon />} className="breadcrumb">
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>{/* <Link to="/"></Link> */}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Breadcrumb.Item>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item>
                <Link to={`${routeTo}`} className="RB_click">
                  {capatilize(name)}
                </Link>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };
  return <>{breadCrumbView()}</>;
};
