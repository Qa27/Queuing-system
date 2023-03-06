import React from "react";
import { CRbar } from "../More/CRbar";
import "./Rightbar.css";

export const Rightbar: React.FC = () => {
  return (
    <div className="Rightbar">
      <CRbar />
      <p className="Rbar_text">Tổng quan</p>
      <div className="Stt"></div>
    </div>
  );
};
