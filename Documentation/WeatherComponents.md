# WeatherComponent Function

This function fetches weather data from the OpenWeatherMap API based on latitude and longitude coordinates.

## Parameters

- `latitude`: Number - The latitude coordinate.
- `longitude`: Number - The longitude coordinate.

## Return Value

- Promise<WeatherResponse> - Promise that resolves to an object containing weather data.

## Example Usage

```tsx
import WeatherComponent from './WeatherComponent';

const latitude = 51.5074;
const longitude = 0.1278;

const fetchData = async () => {
  try {
    const weatherData = await WeatherComponent(latitude, longitude);
    console.log(weatherData);
  } catch (error) {
    console.error('Error:', error);
  }
};

fetchData();
```

## Implementation Details

- Uses Axios to make a GET request to the OpenWeatherMap API.

- API key is required for authentication, which is provided as apiKey.

- The API response is destructured to extract weather data such as temperature, description, wind speed, wind direction, atmospheric pressure, humidity, and visibility.

- Constructs a WeatherResponse object with the extracted weather data.

- The function returns a Promise that resolves to the WeatherResponse object.

- If there is an error during the API call, it will be caught and logged, and then rethrown to be handled by the caller.

```tsx
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
```