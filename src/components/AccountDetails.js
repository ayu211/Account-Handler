// client/src/components/AccountDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AccountDetails = ({ people }) => {
  const { id } = useParams();
  const [person, setPerson] = useState({ name: '', transactions: [] });
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const selectedPerson = people.find((p) => p._id === id);
    setPerson(selectedPerson || {});

    // Fetch transactions for the selected person
    fetch(`http://localhost:5000/api/people/${id}`)
      .then((response) => response.json())
      .then((data) => setPerson(data))
      .catch((error) => console.error('Error fetching transactions:', error));
  }, [id, people]);

  const handleAddTransaction = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/people/${id}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason, amount }),
      });

      const data = await response.json();

      setPerson((prevPerson) => ({
        ...prevPerson,
        transactions: [...prevPerson.transactions, data],
      }));

      setReason('');
      setAmount('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleRemoveTransaction = async (transactionId) => {
    try {
      await fetch(`http://localhost:5000/api/people/${id}/transactions/${transactionId}`, {
        method: 'DELETE',
      });

      const updatedTransactions = person.transactions.filter(
        (transaction) => transaction._id !== transactionId
      );

      setPerson((prevPerson) => ({
        ...prevPerson,
        transactions: updatedTransactions,
      }));
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  return (
    <div>
      <h2>Account Details - {person.name}</h2>
      <div>
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>
      <div>
        <h3>Transactions</h3>
        <ul>
          {person.transactions &&
            person.transactions.map((transaction) => (
              <li key={transaction._id}>
                {transaction.reason} - {transaction.amount}
                <button onClick={() => handleRemoveTransaction(transaction._id)}>Remove</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountDetails;
