import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [calls, setCalls] = useState([]);
  const [filteredCalls, setFilteredCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Adjust the path if needed
        const data = await response.json();
        setCalls(data);
        setFilteredCalls(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value) {
      setFilteredCalls(calls.filter(call => call.estado === value));
    } else {
      setFilteredCalls(calls);
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Call Dashboard</h1>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Exitosa">Exitosa</option>
          <option value="Fallida">Fallida</option>
          <option value="En Proceso">En Proceso</option>
        </select>
      </div>

      <table className="call-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Duration (minutes)</th>
            <th>Status</th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCalls.map(call => (
            <tr key={call.id}>
              <td>{call.id}</td>
              <td>{call.duracion}</td>
              <td>{call.estado}</td>
              <td>{call.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;