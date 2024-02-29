import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  description: string;
  wind: {
    speed: number;
    direction: number;
  };
  pressure: number;
  humidity: number;
  visibility: number;
}

const WeatherComponent: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const apiKey = '7bd41f736433f1b3ecf0df898c298b99';
  const city = 'New York'; // You can change this to the desired city

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const { main, weather: [{ description, icon }], wind, visibility } = response.data;
        setWeather({
          temperature: main.temp,
          description,
          wind: {
            speed: wind.speed,
            direction: wind.deg,
          },
          pressure: main.pressure,
          humidity: main.humidity,
          visibility,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, [apiKey, city]);

  return (
    <div className="text-white">
      <h2 className="text-white">Weather Information</h2>
      {weather ? (
        <div>
          <p className="text-white">Temperature: {weather.temperature}°C</p>
          <p className="text-white">Description: {weather.description}</p>
          <p className="text-white">Wind Speed: {weather.wind.speed} m/s</p>
          <p className="text-white">Wind Direction: {weather.wind.direction}°</p>
          <p className="text-white">Atmospheric Pressure: {weather.pressure} hPa</p>
          <p className="text-white">Humidity: {weather.humidity}%</p>
          <p className="text-white">Visibility: {weather.visibility} meters</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherComponent;
