import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardTemplate from "./pages/DashboardTemplate";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardTemplate />} />
        {/* 여기에 다른 페이지 추가 가능 */}
      </Routes>
    </Router>
  );
}
