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
import { Register } from "./components/Login/Register";
import { AuthContextProvider } from "./components/Login/AuthContext";
import Protected from "./components/Login/Protected";
import { User } from "./components/User/User";
import { UserNumber } from "./components/User/UserNumber";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login/create_account" element={<Register />}></Route>
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/infor"
            element={
              <Protected>
                <Infor />
              </Protected>
            }
          />
          <Route
            path="/list_device"
            element={
              <Protected>
                <Devices />
              </Protected>
            }
          />
          <Route
            path="/list_device/add_device"
            element={
              <Protected>
                <AddDevice />
              </Protected>
            }
          />
          <Route
            path="/list_device/edit_device/:id"
            element={
              <Protected>
                <EditDevice />
              </Protected>
            }
          />
          <Route
            path="/list_device/:id"
            element={
              <Protected>
                <ViewDevice />
              </Protected>
            }
          />
          <Route
            path="/list_service"
            element={
              <Protected>
                <Services />
              </Protected>
            }
          />
          <Route
            path="/list_service/add_service"
            element={
              <Protected>
                <AddService />
              </Protected>
            }
          />
          <Route
            path="/list_service/:id"
            element={
              <Protected>
                <ViewService />
              </Protected>
            }
          />
          <Route
            path="/list_service/edit_service/:id"
            element={
              <Protected>
                <EditService />
              </Protected>
            }
          />
          <Route
            path="/list_number"
            element={
              <Protected>
                <Numbers />
              </Protected>
            }
          />
          <Route
            path="/list_number/add_number"
            element={
              <Protected>
                <AddNumber />
              </Protected>
            }
          />
          <Route
            path="/list_number/:id"
            element={
              <Protected>
                <ViewNumber />
              </Protected>
            }
          />
          <Route
            path="/list_report"
            element={
              <Protected>
                <Reports />
              </Protected>
            }
          />
          <Route
            path="/manage_role"
            element={
              <Protected>
                <MRoles />
              </Protected>
            }
          />
          <Route
            path="/manage_role/add_role"
            element={
              <Protected>
                <AddRole />
              </Protected>
            }
          />
          <Route
            path="/manage_role/:id"
            element={
              <Protected>
                <EditRole />
              </Protected>
            }
          />
          <Route
            path="/manage_account"
            element={
              <Protected>
                <MAcc />
              </Protected>
            }
          />
          <Route
            path="/manage_account/add_account"
            element={
              <Protected>
                <AddAcc />
              </Protected>
            }
          />
          <Route
            path="/manage_account/:id"
            element={
              <Protected>
                <EditAcc />
              </Protected>
            }
          />
          <Route
            path="/manage_user"
            element={
              <Protected>
                <MUsers />
              </Protected>
            }
          />
          <Route path="/user" element={<User />} />
          <Route path="/user_number" element={<UserNumber />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
