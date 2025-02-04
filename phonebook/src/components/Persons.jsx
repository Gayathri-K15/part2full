import Person from './Person';

const Persons = ({ persons, searchTerm }) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person, index) => (
        <Person key={index} person={person} />
      ))}
    </ul>
  );
};

export default Persons;
