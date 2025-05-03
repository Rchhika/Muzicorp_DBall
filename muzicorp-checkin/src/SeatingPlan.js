import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SeatingPlan() {
  const { table } = useParams();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <div className="container">
        <h2>Your Table: {table}</h2>
        <div className="plan-image-container">
          {!isImageLoaded && <div className="loading"></div>}
          <img
            src="/seatingplan.png"
            alt={`Seating plan showing table ${table}`}
            className="plan-image"
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? 'block' : 'none' }}
          />
          <div
            className={`table-marker table-${table}`}
            role="img"
            aria-label={`Table ${table} location`}
          ></div>
        </div>
      </div>
      <button onClick={handleBack} className="back-button">
        Back
      </button>
    </>
  );
}

export default SeatingPlan;
