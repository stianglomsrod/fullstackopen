import { useState } from "react";

const Name = ({ name }) => {
  return (
    <>
      <li>{name}</li>
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const addName = (e) => {
    console.log(e.target);
    e.preventDefault();
    const nameObject = {
      name: newName,
    };
    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      alert(`${newName} is already in the phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map((person) => (
        <Name key={person.name} name={person.name} />
      ))}
    </div>
  );
};

export default App;
