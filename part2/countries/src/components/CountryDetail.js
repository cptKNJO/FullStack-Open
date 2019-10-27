import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState({});

  const languages = country.languages.map(language => (
    <li key={language.name}>{language.name}</li>
  ));

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=a9a74bb936d7d44d9d31e51b8ebdca2e`
      )
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <div>
        <h3>Languages</h3>
        <ul>{languages}</ul>
      </div>
      <div>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
      </div>
      <div>
        <Weather country={country} weather={weather} />
      </div>
    </div>
  );
};

export default CountryDetail;
