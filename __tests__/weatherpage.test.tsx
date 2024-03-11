import React from 'react';
import { render, waitFor } from '@testing-library/react';
import weatherpage from '@/pages/weatherpage';
import WeatherComponent from '@/components/WeatherComponent';
jest.mock('@/components/WeatherComponent', () => ({
    __esModule: true,
  default: jest.fn(),
}));

describe('weatherpage component', () => {
  it('fetches weather data and logs it', async () => {
    // Mock response from WeatherComponent
    const mockWeatherData = {
      WeatherTemperature: 25,
      WeatherDescription: 'Sunny',
      WindSpeed: 10,
      WindDirection: 'N',
      AtmosphericPressure: 1013,
      Humidity: 50,
      Visibility: 10,
    };

    // Mock WeatherComponent to resolve with mockWeatherData
    const mockWeatherComponent = jest.fn().mockResolvedValue(mockWeatherData);

    // Replace WeatherComponent with mock implementation
    jest.mock('@/components/WeatherComponent', () => ({
      __esModule: true,
      default: mockWeatherComponent,
    }));


    // Wait for fetchData function to complete
    await waitFor(() => expect(mockWeatherComponent).toHaveBeenCalled());

    // Check if console.log statements were called with correct data
    expect(console.log).toHaveBeenCalledWith('Temperature:', 25);
    expect(console.log).toHaveBeenCalledWith('Description:', 'Sunny');
    expect(console.log).toHaveBeenCalledWith('Wind Speed:', 10);
    expect(console.log).toHaveBeenCalledWith('Wind Direction:', 'N');
    expect(console.log).toHaveBeenCalledWith('Pressure:', 1013);
    expect(console.log).toHaveBeenCalledWith('Humidity:', 50);
    expect(console.log).toHaveBeenCalledWith('Visibility:', 10);
  });

});
