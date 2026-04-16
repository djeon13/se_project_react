import { APIkey, latitude, longitude } from './constants.js';


const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};


export const getWeatherData = () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  
  return fetch(weatherUrl)
    .then(checkResponse);
};


export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66) {
    return 'warm';
  } else {
    return 'cold';
  }
};