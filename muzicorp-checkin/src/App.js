import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import GuestLookup from "./Guestlookup";
import SeatingPlan from "./SeatingPlan";
import "./App.css";

function Banner() {
  const location = useLocation();
  const isGuestLookup = location.pathname === "/";
  return (
    <img
      src="Diwali_Ball_Banner.png"
      alt="Diwali Ball Banner"
      className={isGuestLookup ? "header-banner guestlookup-banner" : "header-banner"}
    />
  );
}

function App() {
  return (
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<GuestLookup />} />
        <Route path="/seating/:table" element={<SeatingPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
