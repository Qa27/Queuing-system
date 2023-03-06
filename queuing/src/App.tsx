import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Admin/Dashboard";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route index element={<Dashboard />} />
        </Routes>
    </div>
  );
}

export default App;
