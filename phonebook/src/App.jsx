import { useState, useEffect } from 'react';
import personService from './services/phonebook.jsx';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState(null); // For success notifications
  const [errorMessage, setErrorMessage] = useState(null); // For error messages

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  // Add a new person
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Check if person with the same name exists
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number?`)) {
        updatePerson(existingPerson.id); // Update if confirmed
      }
      return;
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${returnedPerson.name}`); // Show success notification
        setTimeout(() => {
          setNotification(null); // Hide notification after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage('Failed to add person.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // Update a person's number
  const updatePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    const updatedPerson = { ...person, number: newNumber };

    personService
      .update(id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
        setNewNumber('');
        setNotification(`Updated ${returnedPerson.name}'s number`); // Show success notification
        setTimeout(() => {
          setNotification(null); // Hide notification after 3 seconds
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage('Failed to update person.');
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  // Delete a person
  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          setNotification(`Deleted ${person.name}`); // Show success notification
          setTimeout(() => {
            setNotification(null); // Hide notification after 3 seconds
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  // Notification component
  const Notification = ({ message, isError }) => {
    if (message === null) {
      return null;
    }

    return (
      <div
        style={{
          color: isError ? 'red' : 'green',
          backgroundColor: '#e0f7e0',
          border: '1px solid green',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        {message}
      </div>
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {/* Display Success and Error Notifications */}
      <Notification message={notification} isError={false} />
      <Notification message={errorMessage} isError={true} />

      {/* Add Person Form */}
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {/* List all people in phonebook with delete and update functionality */}
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => updatePerson(person.id)}>update</button>
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;


  
