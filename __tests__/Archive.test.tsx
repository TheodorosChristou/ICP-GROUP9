import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Uploading from '@/pages/archive'; 
import { SessionProvider } from 'next-auth/react'; 
import { QueryClient, QueryClientProvider } from 'react-query'; 

jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

describe('Uploading component', () => {
  it('should render observations correctly', async () => {
    const observations = [
      {
        _id: '1',
        Lat: 0,
        Lon: 0,
        Observation: 'Test observation',
        Open: true,
        Date: '2022-01-01',
        Time: '12:00',
        Response: [],
        ResponseDescription: '',
        WeatherTemperature: 20,
        WeatherDescription: 'Sunny',
        WindSpeed: 10,
        WindDirection: 'N',
        AtmosphericPressure: 1013,
        Humidity: 50,
        Visibility: 'Good',
      },
    ];

    // Mock expiration time (e.g., 1 hour from now) and format it as string
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const expires = expirationTime.toISOString();

    const queryClient = new QueryClient();

    // Wrap Uploading component with SessionProvider
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>

      <SessionProvider session={{ user: { id: '1', name: 'Test User', role: 'admin' }, expires: expires }}>
        <Uploading Observations={observations} />
      </SessionProvider>
      </QueryClientProvider>

    );
    
    expect(getByText(/Test observation/)).toBeInTheDocument();
    expect(getByText('Latitude: 0')).toBeInTheDocument();
    expect(getByText('Longitude: 0')).toBeInTheDocument();
  });

  it('should delete an observation when delete button is clicked', async () => {
    const observations = [
      {
        _id: '1',
        Lat: 0,
        Lon: 0,
        Observation: 'Test observation',
        Open: true,
        Date: '2022-01-01',
        Time: '12:00',
        Response: [],
        ResponseDescription: '',
        WeatherTemperature: 20,
        WeatherDescription: 'Sunny',
        WindSpeed: 10,
        WindDirection: 'N',
        AtmosphericPressure: 1013,
        Humidity: 50,
        Visibility: 'Good',
      },
    ];

    // Mock expiration time (e.g., 1 hour from now) and format it as string
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const expires = expirationTime.toISOString();
    const queryClient = new QueryClient();

    // Wrap Uploading component with SessionProvider
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>

      <SessionProvider session={{ user: { id: '1', name: 'Test User', role: 'admin' }, expires: expires }}>
        <Uploading Observations={observations} />
      </SessionProvider>
      </QueryClientProvider>

    );
    
    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });

  it('should update an observation when update button is clicked', async () => {
    const observations = [
      {
        _id: '1',
        Lat: 0,
        Lon: 0,
        Observation: 'Test observation',
        Open: true,
        Date: '2022-01-01',
        Time: '12:00',
        Response: [],
        ResponseDescription: '',
        WeatherTemperature: 20,
        WeatherDescription: 'Sunny',
        WindSpeed: 10,
        WindDirection: 'N',
        AtmosphericPressure: 1013,
        Humidity: 50,
        Visibility: 'Good',
      },
    ];

    // Mock expiration time (e.g., 1 hour from now) and format it as string
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const expires = expirationTime.toISOString();
    const queryClient = new QueryClient();

    // Wrap Uploading component with SessionProvider
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>

      <SessionProvider session={{ user: { id: '1', name: 'Test User', role: 'admin' }, expires: expires }}>
        <Uploading Observations={observations} />
      </SessionProvider>
      </QueryClientProvider>

    );
   // Find the update button
  const updateButton = getByText('Update');

  // Mock axios.put function
  jest.spyOn(axios, 'put');
  // Simulate a click event on the update button
  fireEvent.click(updateButton);


  // Wait for any asynchronous updates to complete
  await waitFor(() => {
    // Assert that axios.put was called
    expect(axios.put).toHaveBeenCalled();
  });
  });

  it('should close an observation when close button is clicked', async () => {
    const observations = [
      {
        _id: '1',
        Lat: 0,
        Lon: 0,
        Observation: 'Test observation',
        Open: true,
        Date: '2022-01-01',
        Time: '12:00',
        Response: [],
        ResponseDescription: '',
        WeatherTemperature: 20,
        WeatherDescription: 'Sunny',
        WindSpeed: 10,
        WindDirection: 'N',
        AtmosphericPressure: 1013,
        Humidity: 50,
        Visibility: 'Good',
      },
    ];

    // Mock expiration time (e.g., 1 hour from now) and format it as string
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);
    const expires = expirationTime.toISOString();
    const queryClient = new QueryClient();

    // Wrap Uploading component with SessionProvider
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>

      <SessionProvider session={{ user: { id: '1', name: 'Test User', role: 'admin' }, expires: expires }}>
        <Uploading Observations={observations} />
      </SessionProvider>
      </QueryClientProvider>

    );
    
    fireEvent.click(getByText('Close'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalled();
    });
  });

});
