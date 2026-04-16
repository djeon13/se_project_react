import React from "react";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const isDayTime =
    weatherData &&
    Date.now() / 1000 > weatherData.sys.sunrise &&
    Date.now() / 1000 < weatherData.sys.sunset;

  const weatherClass = isDayTime
    ? "weather-card--day"
    : "weather-card--night";

  return (
    <section className={`weather-card ${weatherClass}`}>
      <p className="weather-card__temp">
        {weatherData?.main?.temp
          ? `${Math.round(weatherData.main.temp)}°F`
          : "Loading..."}
      </p>
    </section>
  );
}

export default WeatherCard;