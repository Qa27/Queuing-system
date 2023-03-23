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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Dashboard />}></Route>
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
        <Route path="/service/list_service/view/:id" element={<ViewService />} />
      </Routes>
    </div>
  );
}

export default App;
