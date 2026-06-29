import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick, onCardLike, isLoggedIn,}) {
  console.log("Main isLoggedIn:", isLoggedIn);
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("weatherData:", weatherData);
  console.log("clothingItems:", clothingItems);

  if (!weatherData || !weatherData.temperature) {
    return <p>Loading...</p>;
  }

  function getWeatherType(temp) {
    if (temp === undefined || temp === null) return null;

    if (temp >= 75) return "hot";
    if (temp >= 60) return "warm";
    return "cold";
  }

  const weatherType = getWeatherType(weatherData.temperature.F);

console.log("weatherType:", weatherType);
console.log("clothingItems:", clothingItems);
console.log(
  "filteredItems:",
  clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherType
  )
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
  .filter((item) => item.weather.toLowerCase() === weatherType)
  .map((item) => (
    <ItemCard
      key={item._id}
      item={item}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      isLoggedIn={isLoggedIn}
    />
  ))}
      </ul>
    </main>
  );
}

export default Main;
