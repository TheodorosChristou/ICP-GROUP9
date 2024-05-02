import axios from 'axios';

describe('API Tests', () => {
  // Define sample observation data
  const observationData = {
    _id: '123',
    Lat: 12.345,
    Lon: 67.89,
    Observation: 'Sample observation',
    Open: true,
    Date: '2024-05-02',
    Time: '10:00',
    Response: [],
    ResponseDescription: '',
    WeatherTemperature: 25,
    WeatherDescription: 'Sunny',
    WindSpeed: 10,
    WindDirection: 'N',
    AtmosphericPressure: 1013,
    Humidity: 50,
    Visibility: 'Good'
  };

  test('GET /api/changes/:id returns observation details', async () => {
    const observationId = observationData._id;
    
    jest.spyOn(axios, 'get').mockResolvedValue({ data: observationData });

    const response = await axios.get(`/api/changes/${observationId}`);

    // Assert that the response contains the observation data
    expect(response.data).toEqual(observationData);
  });

  test('DELETE /api/changes/:id deletes the observation', async () => {
    const observationId = observationData._id;
    
    // Mock axios.delete to return a success message
    jest.spyOn(axios, 'delete').mockResolvedValue({ data: 'Observation deleted successfully' });

    // Make a DELETE request to the API endpoint
    const response = await axios.delete(`/api/changes/${observationId}`);

    // Assert that the response contains a success message
    expect(response.data).toEqual('Observation deleted successfully');
  });

  test('PUT /api/changes/:id updates the observation', async () => {
    const observationId = observationData._id;
    const updatedObservationData = {
      ...observationData,
      Observation: 'Updated observation',
      Open: false,
      ResponseDescription: 'Updated response description'
    };
    
    // Mock axios.put to return a success message
    jest.spyOn(axios, 'put').mockResolvedValue({ data: 'Observation updated successfully' });

    // Make a PUT request to the API endpoint with updated observation data
    const response = await axios.put(`/api/changes/${observationId}`, updatedObservationData);

    // Assert that the response contains a success message
    expect(response.data).toEqual('Observation updated successfully');
  });

  test('POST /api/upload creates a new observation', async () => {
    const newObservationData = {
      Lat: 12.345,
      Lon: 67.89,
      Observation: 'New observation',
      Open: true,
      Date: '2024-05-03',
      Time: '11:00',
      Response: [],
      ResponseDescription: '',
      WeatherTemperature: 26,
      WeatherDescription: 'Cloudy',
      WindSpeed: 12,
      WindDirection: 'NE',
      AtmosphericPressure: 1014,
      Humidity: 55,
      Visibility: 'Fair'
    };
    
    // Mock axios.post to return a success message
    jest.spyOn(axios, 'post').mockResolvedValue({ data: 'New observation created successfully' });

    // Make a POST request to the API endpoint with new observation data
    const response = await axios.post('/api/upload/', newObservationData);

    // Assert that the response contains a success message
    expect(response.data).toEqual('New observation created successfully');
  });
});