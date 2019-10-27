import React from "react";

const Country = ({ country, onClick }) => {
  return (
    <div>
      {country.name}
      <button onClick={onClick(country)}>Show</button>
    </div>
  );
};

export default Country;
