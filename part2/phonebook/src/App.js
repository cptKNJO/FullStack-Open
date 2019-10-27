import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          console.log(`Deleted ${person.name} from server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

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
      return alert(`${newName} is already added to the phonebook`);
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
