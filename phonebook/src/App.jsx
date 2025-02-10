import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';  // Make sure the path is correct

const App = () => {
  const [persons, setPersons] = useState([]);  // State to store the phonebook entries
  const [newName, setNewName] = useState('');  // State for the new person's name
  const [newNumber, setNewNumber] = useState('');  // State for the new person's number

  // Fetch the persons from the backend when the component mounts
  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => {
        setPersons(response.data);  // Update the state with fetched persons
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Handle the form submission to add a new person
  const handleAddPerson = (event) => {
    event.preventDefault();

    // Check if the name already exists in the phonebook
    const duplicate = persons.some((person) => person.name === newName);
    if (duplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // Create a new person object
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Add the new person to the backend
    phonebookService
      .create(newPerson)
      .then((response) => {
        // After the person is successfully added, update the state
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch((error) => {
        console.error('Error adding person:', error);
      });
  };

  // Handle deleting a person from the phonebook
  const handleDeletePerson = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (confirmDelete) {
      phonebookService
        .remove(id)
        .then(() => {
          // Remove the person from the state after successful deletion
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
