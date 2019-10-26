import React from "react";

const CountryDetail = ({ country }) => {
  const languages = country.languages.map(language => <li>{language.name}</li>);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <div>
        <h3>languages</h3>
        <ul>{languages}</ul>
      </div>
      <div>
        <img src={country.flag} width="200" />
      </div>
    </div>
  );
};

export default CountryDetail;
