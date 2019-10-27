import React, { useState } from "react";
import CountryDetail from "./CountryDetail";
import Country from "./Country";

const Display = ({ countries, search }) => {
  const [showCountry, setShowCountry] = useState({});

  if (search === "") return <div></div>;

  const handleClick = country => () => setShowCountry(country);

  const matched = countries.filter(country =>
    country.name.toLowerCase().includes(search)
  );

  if (matched.length > 10)
    return <div>Too many matches, specify another filter</div>;
  else if (matched.length === 1) return <CountryDetail country={matched[0]} />;

  const showCountries = matched.map(country => (
    <Country
      key={country.numericCode}
      country={country}
      onClick={handleClick}
    />
  ));

  if (showCountry.name !== undefined) {
    return (
      <div>
        {showCountries}
        <CountryDetail country={showCountry} />
      </div>
    );
  }

  return <div>{showCountries}</div>;
};

export default Display;
