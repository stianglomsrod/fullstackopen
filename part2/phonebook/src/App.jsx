import { useState, useEffect } from "react";
import axios from 'axios';

const Filter = ({ value, onChange }) => {
  return (
    <>
      <div>
        filter shown with <input value={value} onChange={onChange} />
      </div>
    </>
  );
};

const Persons = ({ person }) => {
  return (
    <>
      <li>
        {person.name} {person.number}
      </li>
    </>
  );
};

const PersonForm = (props) => {


  return (
  <>
    <form onSubmit={props.onSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.numberValue} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </>
  )
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );


  useEffect(() => {
    axios.
    get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])



  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addPerson = (e) => {
    console.log(e.target);
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Persons key={person.id} person={person} />
      ))}
    </div>
  );
};

export default App;
