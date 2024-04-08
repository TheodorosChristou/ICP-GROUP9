import { render, waitFor } from '@testing-library/react';
import DynamicMap, { getServerSideProps } from '@/pages/map';
import ObservationModel, { ObservationInterface } from '../models/Observation';
import { GetServerSidePropsContext } from 'next';

const observationData: ObservationInterface[] = [
    {
      _id: '1',
      Observation: 'Sample Observation',
      Lat: 51.5072,
      Lon: 0.1276,
      Response: ['Sample Response'],
      ResponseDescription: 'Sample Response Description',
      Open: true,
      Date: '2024-04-05',
      Time: '12:00 PM',
      WeatherTemperature: 20,
      WeatherDescription: 'Sunny',
      WindSpeed: 10,
      WindDirection: 180,
      AtmosphericPressure: 1013,
      Humidity: 50,
      Visibility: 10,
    },
  ];
  
  
  describe('DynamicMap component', () => {
    it('renders correctly', () => {
      const observationData = []; // Mock or provide observation data here if required
      const { container } = render(<DynamicMap mapData={observationData} />);
      expect(container).toMatchSnapshot();
    });
  });
  describe('getServerSideProps function', () => {
    it('fetches data from the database and returns mapData prop', async () => {
      // Mocking the ObservationModel.find method to return sample observation data
      jest.spyOn(ObservationModel, 'find').mockReturnValue({
        lean: jest.fn().mockResolvedValue(observationData), // Mocking lean() method
      } as any); // Need to cast as any to avoid type errors
  
      // Calling getServerSideProps to fetch data
      const context = {} as GetServerSidePropsContext;
  
      // Since getServerSideProps returns GetServerSidePropsResult<MapPageProps>, we'll use type guards to handle the case where props may not exist
      const result = await getServerSideProps(context);
  
      if ('props' in result) {
        // Expecting the returned props to contain mapData with observation data
        expect(result.props).toEqual({ mapData: observationData });
      } else {
        // If props don't exist, the test fails
        fail('props not returned from getServerSideProps');
      }
    });
  });