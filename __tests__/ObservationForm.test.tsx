import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ObservationForm, {ObservationValues} from '@/components/ObservationForm';

jest.mock('next-auth/react', () => ({
    useSession: () => ({
      data: {
        user: {
          name: 'Test User',
          role: 'admin',
        },
      },
    }),
  }));
  
  describe('ObservationForm Component', () => {
    it('renders the form fields correctly', () => {
      render(<ObservationForm onSubmit={() => {}} />);
  
      // Assert that the form fields are rendered
      expect(screen.getByPlaceholderText('Latitude')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Longitude')).toBeInTheDocument();
      expect(screen.getByLabelText('Observation')).toBeInTheDocument();
    });
  
    it('calls onSubmit with form data when submitted', () => {
      // Mock the onSubmit function
      const onSubmit = jest.fn();
  
      render(<ObservationForm onSubmit={onSubmit} />);
  
      // Simulate user input
      fireEvent.change(screen.getByPlaceholderText('Latitude'), { target: { value: '40.7128' } });
      fireEvent.change(screen.getByPlaceholderText('Longitude'), { target: { value: '-74.0060' } });
      fireEvent.change(screen.getByLabelText('Observation'), { target: { value: 'Test observation' } });
  
      fireEvent.click(screen.getByTestId('submitButton'));
      waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        Lat: '40.7128',
        Lon: '-74.0060',
        Observation: 'Test observation',
        Response: [],
        })
      });
    });
  });