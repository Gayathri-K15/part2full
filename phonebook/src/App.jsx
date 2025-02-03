import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value); // Update the newName state with the input value
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value); // Update the newNumber state with the input value
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the name already exists in the phonebook
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`); // Show alert if name already exists
      return; // Stop further processing if name is already added
    }

    // If name doesn't exist, add new entry
    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName(''); // Clear the name input field
    setNewNumber(''); // Clear the number input field
  };

  return (
    <div>
      <h2>Phonebook</h2>
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

      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name} {person.number}</p>
        ))}
      </div>
    </div>
  );
};

export default App;


