import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Uploading from '@/pages/archive'; 

jest.mock("axios", () => ({
    ...jest.requireActual("axios"),
    post:jest.fn(),
    put:jest.fn(),
    delete:jest.fn(),

}));

describe('Uploading component', () => {
  it('should fetch observations and render them', async () => {
    // Mock data for observations
    const observations = [
      {
        _id: '1',
        Lat: 0,
        Lon: 0,
        Observation: 'Test observation',
        Open:'',
        Date:'',
        Time:'',
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


    // Render the component
    const { getByText } = render(<Uploading Observations={observations} />);

    // Check if observations are rendered
    expect(getByText('Test observation')).toBeInTheDocument();
    expect(getByText('Latitude: 0')).toBeInTheDocument();
    expect(getByText('Longitude: 0')).toBeInTheDocument();
  });

  it('should delete an observation when delete button is clicked', async () => {
  

    // Render the component
    const { getByText } = render(<Uploading Observations={[]} />);

    // Trigger delete action
    fireEvent.click(getByText('Delete'));

    // Wait for delete API call to be made
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalled();
    });
  });

});
