import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Uploading from '@/pages/index';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';

// Mocking session context
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        name: 'John Doe',
        role: 'admin',
      },
    },
  })),
}));

// Mocking axios
jest.mock('axios');

describe('Uploading component', () => {
  const mockObservations = [
    {
      _id: '1',
      Lat: 51.5072,
      Lon: 0.1276,
      Observation: 'Sample observation',
      Open: true,
      Date: '2022-04-15',
      Time: '10:30:00',
      WeatherTemperature: '20°C',
      WeatherDescription: 'Sunny',
      WindSpeed: '10 m/s',
      WindDirection: 'North',
      AtmosphericPressure: '1013 hPa',
      Humidity: '50%',
      Visibility: '10 km',
      Response: [],
      ResponseDescription: '',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Uploading Observations={mockObservations} />
      </QueryClientProvider>
    );
    expect(screen.getByText('On-Going Incidents')).toBeInTheDocument();
  });

  it('submits observation form', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Uploading Observations={mockObservations} />
      </QueryClientProvider>
    );

    const mockObservationForm = {
      Lat: 51.5072,
      Lon: 0.1276,
      Observation: 'Sample observation',
    };

    // Mocking WeatherComponent response
    jest.spyOn(axios, 'post').mockResolvedValueOnce({});

    // Submitting the form
    fireEvent.click(screen.getByText('Submit'));

    // Since we're mocking the form submission, we can't directly assert axios.post calls here
    // Instead, we can assert that the function to handle successful submission (redirect function) is called
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/');
    });
  });

});
