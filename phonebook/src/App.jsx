import { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState(''); // State for the new name
  const [newNumber, setNewNumber] = useState(''); // State for the new phone number
  const [searchTerm, setSearchTerm] = useState(''); // State for the search filter

  // Handle name input change
  const handleNameChange = (event) => {
    setNewName(event.target.value); // Update the newName state
  };

  // Handle phone number input change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value); // Update the newNumber state
  };

  // Handle the search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update the searchTerm state (case-insensitive)
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the name already exists in the phonebook
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return; // Prevent adding duplicate names
    }

    // Add the new person to the phonebook
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, // Create a new id based on the array length
    };
    setPersons([...persons, newPerson]);

    // Clear the input fields
    setNewName('');
    setNewNumber('');
  };

  // Filter persons based on the search term (case-insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Filter input field */}
      <div>
        filter shown with: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      {/* Add new person form */}
      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* Display filtered phonebook entries */}
      <h3>Numbers</h3>
      <div>
        {filteredPersons.map((person) => (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;







