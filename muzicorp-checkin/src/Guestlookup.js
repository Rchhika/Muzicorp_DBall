import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GuestLookup() {
  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/sap8zsspohs90")
      .then((res) => res.json())
      .then((data) => setGuests(data));
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedGuest(null); // Clear any selected guest if user types

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = guests.filter((g) =>
      `${g.first_name} ${g.last_name}`.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5)); // Limit to top 5 suggestions
  };

  const handleSuggestionClick = (guest) => {
    setQuery(`${guest.first_name} ${guest.last_name}`);
    setSuggestions([]);
    setSelectedGuest(guest);
  };

  return (
    <div className="container">
      <h1>Guest Check-In</h1>
      <input
        className="search"
        type="text"
        placeholder="Enter your name or surname"
        value={query}
        onChange={handleInputChange}
      />

      {suggestions.length > 0 && !selectedGuest && (
        <ul className="suggestions">
          {suggestions.map((g, idx) => (
            <li key={idx} onClick={() => handleSuggestionClick(g)}>
              {g.first_name} {g.last_name}
            </li>
          ))}
        </ul>
      )}

      {selectedGuest && (
        <div className="results">
          <div className="card">
            <p>
              <strong>{selectedGuest.first_name} {selectedGuest.last_name}</strong>
            </p>
            <p>Table: <strong>{selectedGuest.table_number}</strong></p>
            <Link to={`/seating/${selectedGuest.table_number}`}>
              <button className="view-map-btn">View Seating Plan</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuestLookup;
