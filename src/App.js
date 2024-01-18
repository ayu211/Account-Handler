// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddPerson from './components/AddPerson';
import AccountDetails from './components/AccountDetails';

function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/people')
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error('Error fetching people:', error));
  }, []);

  const addPerson = async (person) => {
    try {
      const response = await fetch('http://localhost:5000/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
      });

      const data = await response.json();

      setPeople([...people, data]);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const removePerson = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/people/${id}`, {
        method: 'DELETE',
      });

      const updatedList = people.filter((person) => person._id !== id);
      setPeople(updatedList);
    } catch (error) {
      console.error('Error removing person:', error);
    }
  };

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add Person</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home people={people} removePerson={removePerson} />} />
          <Route path="/account/:id" element={<AccountDetails people={people} />} />
          <Route path="/add" element={<AddPerson addPerson={addPerson} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
