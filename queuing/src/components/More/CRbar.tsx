import React from "react";
import { Link } from "react-router-dom";
import "./CRbar.css";
import { auth } from "../../Server/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const CRbar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="right">
      <div className="crbar_2">
        <Link to="/infor">
          <img src="../../../Img/user.png" alt="" className="ava" />
          <span className="crbar_2_text">
            Hello <span className="crbar_2_text2">{user?.displayName}</span>
          </span>
        </Link>
      </div>
    </div>
  );
};
