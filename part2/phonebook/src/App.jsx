import { useState, useEffect } from "react";
import personsService from "./services/persons";

const Filter = ({ value, onChange }) => {
  return (
    <>
      <div>
        filter shown with <input value={value} onChange={onChange} />
      </div>
    </>
  );
};

const Persons = ({ person, removePerson }) => {
  return (
    <>
      <li>
        {person.name} {person.number}
        <button onClick={() => removePerson(person.id, person.name)}>
          delete
        </button>
      </li>
    </>
  );
};

const PersonForm = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div>
          name:{" "}
          <input value={props.nameValue} onChange={props.handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input
            value={props.numberValue}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
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
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace old number with a new one?`,
        )
      ) {
        const oldPerson = persons.filter((obj) => obj.name === newName)[0];
        personsService
          .update(oldPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons
                .filter((person) => person.id !== updatedPerson.id)
                .concat(updatedPerson),
            );
          })
          .catch((error) => console.log("Error updating number ", error));

        setNewName("");
        setNewNumber("");
      }
    } else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const removePerson = (id, name) => {
    console.log(id, name);
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.log("Error deleting: ", error));
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
        <Persons key={person.id} person={person} removePerson={removePerson} />
      ))}
    </div>
  );
};

export default App;
