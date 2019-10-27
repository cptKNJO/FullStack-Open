import React from "react";

const Weather = ({ country, weather }) => {
  if (Object.keys(weather).length === 0) return <div></div>;

  const image = weather.weather[0].icon;
  const description = weather.weather[0].main;

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>
        {description}
        <img
          src={`http://openweathermap.org/img/wn/${image}@2x.png`}
          alt="Weather icon"
          height="80"
        />
      </div>
      <div>
        <strong>temperature: </strong>
        {weather.main.temp} Celsius
        <div></div>
      </div>
      <div>
        <strong>wind: </strong>
        {weather.wind.speed} kph at {weather.wind.deg} deg
      </div>
    </div>
  );
};

export default Weather;
