import React from "react";
import Person from "./Person"

const Persons = ({ persons }) => {
  const listNames = persons.map(person => (
    <Person key={person.name} name={person.name} number={person.number} />
  ));

  return <div>{listNames}</div>;
};

export default Persons;
