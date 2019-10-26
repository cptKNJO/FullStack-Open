import React from "react";
import CountryDetail from "./CountryDetail";
import Country from "./Country";

const Display = ({ countries, search }) => {
  if (search === "") return <div></div>;

  const matched = countries.filter(country =>
    country.name.toLowerCase().includes(search)
  );

  if (matched.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (matched.length === 1) {
    return <CountryDetail country={matched[0]} />;
  }

  const showCountries = matched.map(country => (
    <Country key={country.numericCode} country={country} />
  ));

  return <div>{showCountries}</div>;
};

export default Display;
