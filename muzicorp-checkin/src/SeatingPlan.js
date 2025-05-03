import React from "react";
import { useParams, Link } from "react-router-dom";

function SeatingPlan() {
  const { table } = useParams();

  return (
    <div className="plan-container">
      <h2>Your Table: {table}</h2>
      <img
        src="/AC.png" // Replace with your actual image
        alt="Seating Plan"
        className="plan-image"
      />
      <div className={`table-marker table-${table}`}></div>
      <Link to="/"><button className="back-btn">Back to Search</button></Link>
    </div>
  );
}

export default SeatingPlan;
