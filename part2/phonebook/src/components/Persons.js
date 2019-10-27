import React from "react";
import Person from "./Person"

const Persons = ({ persons, deletePerson }) => {
  const listNames = persons.map(person => (
    <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person)} />
  ));

  return <div>{listNames}</div>;
};

export default Persons;
