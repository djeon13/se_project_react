import { apiKey, latitude, longitude } from "./constants.js";
import { checkResponse } from "./api.js";

export const getWeatherData = () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

  return fetch(weatherUrl)
    .then(checkResponse)
    .then((data) => {
      const weather = {
        name: data.name,
        temperature: {
          F: data.main.temp,
          C: Math.round(((data.main.temp - 32) * 5) / 9),
        },
      };

      return weather;
    });
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
