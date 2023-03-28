import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Admin/Dashboard/Dashboard";
import { Infor } from "./components/More/Infor";
import { Devices } from "./components/Admin/Device/Devices";
import { AddDevice } from "./components/Admin/Device/AddDevice";
import { EditDevice } from "./components/Admin/Device/EditDevice";
import { ViewDevice } from "./components/Admin/Device/ViewDevice";
import { Services } from "./components/Admin/Service/Services";
import { AddService } from "./components/Admin/Service/AddService";
import { ViewService } from "./components/Admin/Service/ViewService";
import { Numbers } from "./components/Admin/Number/Numbers";
import { ViewNumber } from "./components/Admin/Number/ViewNumber";
import { AddNumber } from "./components/Admin/Number/AddNumber";
import { Reports } from "./components/Admin/Report/Reports";
import { MRoles } from "./components/Admin/Setting/MRoles";
import { AddRole } from "./components/Admin/Setting/AddRole";
import { EditRole } from "./components/Admin/Setting/EditRole";
import { EditService } from "./components/Admin/Service/EditService";
import { MAcc } from "./components/Admin/Setting/MAcc";
import { AddAcc } from "./components/Admin/Setting/AddAcc";
import { EditAcc } from "./components/Admin/Setting/EditAcc";
import { MUsers } from "./components/Admin/Setting/MUsers";
import { Login } from "./components/Login/Login";
import { LoginForget } from "./components/Login/LoginForget";
import { NewPass } from "./components/Login/NewPass";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login/forget" element={<LoginForget />}></Route>
        <Route path="/login/NewPassword" element={<NewPass />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/infor" element={<Infor />} />
        <Route path="/device/list_device" element={<Devices />} />
        <Route path="/device/list_device/add_device" element={<AddDevice />} />
        <Route
          path="/device/list_device/edit_device/:id"
          element={<EditDevice />}
        />
        <Route path="/device/list_device/view/:id" element={<ViewDevice />} />
        <Route path="/service/list_service" element={<Services />} />
        <Route
          path="/service/list_service/add_service"
          element={<AddService />}
        />
        <Route
          path="/service/list_service/view/:id"
          element={<ViewService />}
        />
        <Route
          path="/service/list_service/edit_service/:id"
          element={<EditService />}
        />
        <Route path="/number/list_number" element={<Numbers />} />
        <Route path="/number/list_number/add_number" element={<AddNumber />} />
        <Route path="/number/list_number/view/:id" element={<ViewNumber />} />
        <Route path="/report/list_report" element={<Reports />} />
        <Route path="/setting/manage_role" element={<MRoles />} />
        <Route path="/setting/manage_role/add_role" element={<AddRole />} />
        <Route
          path="/setting/manage_role/edit_role/:id"
          element={<EditRole />}
        />
        <Route path="/setting/manage_account" element={<MAcc />} />
        <Route
          path="/setting/manage_account/add_account"
          element={<AddAcc />}
        />
        <Route
          path="/setting/manage_account/edit_account/:id"
          element={<EditAcc />}
        />
        <Route path="/setting/manage_user" element={<MUsers />} />
      </Routes>
    </div>
  );
}

export default App;
