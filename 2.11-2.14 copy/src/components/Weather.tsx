import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherProps {
  city: string;
}

const Weather = ({ city }: WeatherProps) => {
  const [weather, setWeather] = useState<any>(null);
  const api_key = import.meta.env.VITE_API_KEY || process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!api_key) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      )
      .then((response) => setWeather(response.data));
  }, [city, api_key]);

  if (!weather) return <div>Loading weather...</div>;

  return (
    <div>
      <h4>Weather in {city}</h4>
      <div>Temperature: {weather.main.temp} °C</div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
      </div>
      <div>Wind: {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Weather;
