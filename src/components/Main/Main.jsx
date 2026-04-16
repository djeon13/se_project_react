import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  function getWeatherType(temp) {
    if (temp === undefined || temp === null) return null;

    if (temp >= 75) return "hot";
    if (temp >= 60) return "warm";
    return "cold";
  }

  const weatherType = getWeatherType(weatherData?.main?.temp);

  if (!weatherType) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

     
      <p className="main__description">
        Today is {Math.round(weatherData.main.temp)}° F / You may want to wear:
      </p>

      <ul className="cards">
        {clothingItems
          .filter((item) => item.weather.toLowerCase() === weatherType)
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
