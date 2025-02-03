import { useState } from 'react';

const App = () => {
  // Initial persons list with some entries
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  
  const [newName, setNewName] = useState(''); // To store the new name input
  const [newNumber, setNewNumber] = useState(''); // To store the new number input
  const [searchTerm, setSearchTerm] = useState(''); // To store the search term

  // Handle the change in the name input field
  const handleNameChange = (event) => {
    setNewName(event.target.value); // Update newName state
  };

  // Handle the change in the number input field
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value); // Update newNumber state
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Update searchTerm (make it lowercase for case-insensitive search)
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Check if the name already exists in the phonebook
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`); // Alert if duplicate name
      return; // Stop the function execution if name exists
    }

    // If name doesn't exist, add new entry to the phonebook
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1, // Assign a new id based on length of the array
    };
    setPersons([...persons, newPerson]); // Update persons state with the new person

    // Clear the input fields after submission
    setNewName('');
    setNewNumber('');
  };

  // Filter the persons list based on the search term (case-insensitive)
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm) // Compare names in a case-insensitive manner
  );

  return (
    <div>
      <h2>Phonebook</h2>

      {/* Search field */}
      <div>
        filter shown with: <input value={searchTerm} onChange={handleSearchChange} />
      </div>

      {/* Add person form */}
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
        {/* Display filtered persons */}
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




