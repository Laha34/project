import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import { ToastContainer } from "react-toastify";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="app-title">Cinema Booking</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
