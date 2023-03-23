import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./RBreadcrumb.css";

export const RBreadcrumb = () => {
  const location = useLocation();
  const breadCrumbView = () => {
    const { pathname } = location;
    const pathnames = pathname.split("/").filter((item) => item);
    const capatilize = (s: any) => s.charAt(0).toUpperCase() + s.slice(1);
    return (
      <div className="space">
        <Breadcrumb separator=">" className="breadcrumb">
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
