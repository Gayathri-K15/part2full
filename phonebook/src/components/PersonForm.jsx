const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={event => setNewName(event.target.value)} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default PersonForm


  
  