import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);       // store API data
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null);   // error state
  const [search, setSearch] = useState("");   // search state

  // Fetch API data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  // Auto load data when app starts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>React API Fetching Project</h1>
      <button onClick={fetchData}>Refresh Data</button>

      {/* 🔎 Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{color:"red"}}>{error}</p>}

      <div className="card-container">
        {data
          .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0,6)
          .map((user) => (
            <div className="card" key={user.id}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>City: {user.address.city}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
