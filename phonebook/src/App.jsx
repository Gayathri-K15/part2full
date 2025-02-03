import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value) // Update the newName state with the input value
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // You can add logic to add the new name to the persons list here
    setPersons([...persons, { name: newName }]) // This would add a new person to the list
    setNewName('') // Clear the input after submitting
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
                  value={newName} // Bind the value of input to newName state
                  onChange={handleNameChange} // Update newName on input change
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person, index) => (
          <p key={index}>{person.name}</p>
        ))}
      </div>

      {/* Debugging output */}
      <div>debug: {newName}</div>
    </div>
  )
}

export default App

