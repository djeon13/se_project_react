import React, { useContext } from "react";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";


function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  if (!weatherData || !weatherData.temperature) {
    return null;
  }

  return (
    <div className="weather-card weather-card--day">
      <p className="weather-card__temp">
        {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </div>
  );
}

export default WeatherCard;