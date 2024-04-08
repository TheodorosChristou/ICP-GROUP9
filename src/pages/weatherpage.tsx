import React, { useEffect,useState } from 'react';
import WeatherComponent, { WeatherResponse } from '../components/WeatherComponent'; // Adjust the import path as needed

export default function weatherpage(){
  // const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const latitude = 40.7128; // Replace with your desired latitude
            const longitude = -74.0060; // Replace with your desired longitude
    
            const { WeatherTemperature, WeatherDescription, WindSpeed, WindDirection, AtmosphericPressure, Humidity, Visibility }: WeatherResponse = await WeatherComponent(latitude, longitude);
    
            console.log('Temperature:', WeatherTemperature);
            console.log('Description:', WeatherDescription);
            console.log('Wind Speed:', WindSpeed);
            console.log('Wind Direction:', WindDirection);
            console.log('Pressure:', AtmosphericPressure);
            console.log('Humidity:', Humidity);
            console.log('Visibility:', Visibility);
    
            // Now you can use individual weather values in this component
          } catch (error) {
            console.error('Error in ExamplePage:', error);
          }
        };
    
        fetchData();
      }, []);
      // Needed for testing
      //return (
        //<div>
          //{weatherData && (
            //<div>
              //<p>Temperature: {weatherData.WeatherTemperature}</p>
              //<p>Description: {weatherData.WeatherDescription}</p>
          //     <p>Wind Speed: {weatherData.WindSpeed}</p>
          //     <p>Wind Direction: {weatherData.WindDirection}</p>
          //     <p>Atmospheric Pressure: {weatherData.AtmosphericPressure}</p>
          //     <p>Humidity: {weatherData.Humidity}</p>
          //     <p>Visibility: {weatherData.Visibility}</p>
          //   </div>
          // )}
      //   </div>
      // );
    }
