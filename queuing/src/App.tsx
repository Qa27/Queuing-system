import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Admin/Dashboard/Dashboard";
import { Infor } from "./components/More/Infor";
import { Device } from "./components/Admin/Device/Device";
import { AddDevice } from "./components/Admin/Device/AddDevice";
import { EditDevice } from "./components/Admin/Device/EditDevice";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Dashboard />}></Route>
        <Route path="/infor" element={<Infor />} />
        <Route path="/device" element={<Device />} />
        <Route path="/device/add_device" element={<AddDevice />} />
        <Route path="/device/edit_device" element={<EditDevice list={[]} />} />
      </Routes>
    </div>
  );
}

export default App;
