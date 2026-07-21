import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/Personform";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

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
            setNotification({
              message: `Updated ${newName}'s number to ${newNumber}`,
              success: true,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `Information of ${newName} has already been removed from the server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });

        setNewName("");
        setNewNumber("");
      }
    } else {
      personsService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
          message: `Added ${personObject.name}`,
          success: true,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
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
        .catch((error) => {
          setNotification({
            message: `Information of ${name} has already been removed from the server`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        });
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
      <Notification notification={notification} />
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
