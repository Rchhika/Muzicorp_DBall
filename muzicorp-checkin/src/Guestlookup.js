import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GuestLookup() {
  const [guests, setGuests] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://sheetdb.io/api/v1/sap8zsspohs90");
        if (!response.ok) {
          throw new Error('Failed to fetch guest data');
        }
        const data = await response.json();
        setGuests(data);
        setError(null);
      } catch (err) {
        setError('Unable to load guest data. Please try again later.');
        console.error('Error fetching guests:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuests();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedGuest(null);

    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    const filtered = guests.filter((g) =>
      `${g.first_name} ${g.last_name}`.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSuggestionClick = (guest) => {
    setQuery(`${guest.first_name} ${guest.last_name}`);
    setSuggestions([]);
    setSelectedGuest(guest);
  };

  return (
    <div className="container">
      <h1>Guest Check-In</h1>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Enter your name or surname"
          value={query}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        {isLoading && <div className="loading"></div>}
      </div>

      {suggestions.length > 0 && !selectedGuest && (
        <ul className="suggestions">
          {suggestions.map((g, idx) => (
            <li
              key={idx}
              onClick={() => handleSuggestionClick(g)}
              onKeyPress={(e) => e.key === 'Enter' && handleSuggestionClick(g)}
              tabIndex={0}
            >
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
              <button className="view-map-btn">
                View Seating Plan
              </button>
            </Link>
          </div>
        </div>
      )}

      {!isLoading && !error && query.length > 0 && suggestions.length === 0 && !selectedGuest && (
        <div className="no-results">
          No guests found matching "{query}"
        </div>
      )}
    </div>
  );
}

export default GuestLookup;
