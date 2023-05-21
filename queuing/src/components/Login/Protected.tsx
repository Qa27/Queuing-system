import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";
import { ReactElement, ReactNode } from "react";

const Protected = ({ children }: { children: ReactNode }): ReactElement => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default Protected;
