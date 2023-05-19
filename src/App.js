import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  async function getWeatherData(e) {
    try {
      if (e.key === "Enter") {
        const response = await fetch("https://api.weatherapi.com/v1/current.json?Key=3445bb98ac60461c93275807231805&q=" +city);
        const data = await response.json();
        setWeather(data);
        setCity(" ");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div id="container">
      <div className="container">
        <input
          type="text"
          value={city}
          placeholder="Enter city or country"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          onKeyDown={getWeatherData}
          required
        />
      </div>

      {Object.keys(weather).length === 0 ? (
        <p>Enter a Location...</p>
      ) : (
        <div className="container-data">
          <h4>
            {weather.location.name}, {weather.location.country}
          </h4>
          <h3>{Math.round(weather.current.temp_c)}&deg;C</h3>
          <p>{weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
