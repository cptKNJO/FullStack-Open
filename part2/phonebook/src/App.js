import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      console.log(initialPersons)
      setPersons(initialPersons);
    });
  }, []);

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(response => {
        console.log(`Deleted ${person.name} from server`);
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
  };

  const handleSearch = event => setSearch(event.target.value);

  const personsToShow =
    search === ""
      ? persons
      : persons.filter(person => {
          if (person.name.toLowerCase().includes(search.toLowerCase())) {
            return person;
          }
        });

  const handleNewName = event => setNewName(event.target.value);
  const handleNewNumber = event => setNewNumber(event.target.value);

  const addName = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };

    const matched = persons.find(person => person.name === newName);
    if (matched) {
      if (
        window.confirm(
          `${matched.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(matched.id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson);
            setPersons(
              persons.map(p => (p.id === matched.id ? returnedPerson : p))
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Updated ${matched.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${matched.name} has already been removed from the server`
            );
            setPersons(persons.filter(p => p.id !== matched.id))
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        console.log(returnedPerson, personObject)
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        successMessage={successMessage}
        errorMessage={errorMessage}
      />

      <Filter search={search} onChange={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
