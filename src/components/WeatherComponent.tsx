import axios from 'axios';

export interface WeatherData {
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

export interface WeatherResponse {
  WeatherTemperature: number;
  WeatherDescription: string;
  WindSpeed: number;
  WindDirection: number;
  AtmosphericPressure: number;
  Humidity: number;
  Visibility: number;
}


export default async function WeatherComponent(latitude: number, longitude: number): Promise<WeatherResponse> {
  const apiKey = '7bd41f736433f1b3ecf0df898c298b99';

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );

    const { main, weather: [{ description, icon }], wind, visibility } = response.data;

    const weatherData: WeatherResponse = {
      WeatherTemperature: main.temp,
      WeatherDescription: description,
      WindSpeed: wind.speed,
      WindDirection: wind.deg,
      AtmosphericPressure: main.pressure,
      Humidity: main.humidity,
      Visibility: visibility,
    };

    return weatherData;

  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}