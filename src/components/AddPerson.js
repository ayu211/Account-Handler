// client/src/components/AddPerson.js
import React, { useState } from 'react';

const AddPerson = ({ addPerson }) => {
  const [newName, setNewName] = useState('');

  const handleAddPerson = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (!response.ok) {
        throw new Error('Failed to add person');
      }
  
      addPerson(data);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Add a New Person</h2>
      <input
        value={newName}
        type="text"
        placeholder="Name"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleAddPerson}>Add Person</button>
    </div>
  );
};

export default AddPerson;
