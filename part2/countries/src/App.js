import React, { useState, useEffect } from "react";
import axios from "axios";
import Display from "./components/Display";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div>
        find countries
        <input value={search} onChange={handleSearch} />
        <Display countries={countries} search={search} />
      </div>
    </div>
  );
};

export default App;
