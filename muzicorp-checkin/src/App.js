import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GuestLookup from "./Guestlookup";
import SeatingPlan from "./SeatingPlan";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestLookup />} />
        <Route path="/seating/:table" element={<SeatingPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
