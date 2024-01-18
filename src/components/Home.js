// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ people, removePerson }) => {
  return (
    <div>
      <h2>People You Are Managing</h2>
      <ul>
        {people.map((person) => (
          <li key={person._id}>
            <Link to={`/account/${person._id}`}>{person.name}</Link>
            <button onClick={() => removePerson(person._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
