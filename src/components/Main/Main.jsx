import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  if (!weatherData || !weatherData.temperature) {
    return <p>Loading...</p>;
  }

  function getWeatherType(temp) {
    if (temp === undefined || temp === null) return null;

    if (temp >= 75) return "hot";
    if (temp >= 60) return "warm";
    return "cold";
  }

  const weatherType = getWeatherType(
    weatherData.temperature[currentTemperatureUnit]
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <p className="main__description">
        Today is {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      <ul className="cards">
        {clothingItems
          .filter(
            (item) =>
              item.weather.toLowerCase() === weatherType
          )
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
      </ul>
    </main>
  );
}

export default Main;