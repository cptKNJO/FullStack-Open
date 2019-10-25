import React, { useState } from "react";

const Display = ({ name }) => <div>{name}</div>;

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const listNames = persons.map(person => (
    <Display key={person.name} name={person.name} />
  ));

  const handleNewName = event => {
    setNewName(event.target.value);
  };

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {listNames}
    </div>
  );
};

export default App;
