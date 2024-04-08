import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider
import ObservationForm from '@/components/ObservationForm';

describe('ObservationForm', () => {
    const mockOnSubmit = jest.fn();
    
    const renderForm = (props = {}) => {
        render(
            <SessionProvider session={{ user: { id: '1', name: 'Test User', role: 'admin' }, expires: '2024-04-05T12:00:00' }}>
                <ObservationForm onSubmit={mockOnSubmit} {...props} />
            </SessionProvider>
        );
    };
    test('renders ObservationForm with default values', () => {
      renderForm();
      expect(screen.getByText('Latitude')).toBeInTheDocument();
      expect(screen.getByText('Longitude')).toBeInTheDocument(); // Corrected spelling here
      expect(screen.getByText('Observation')).toBeInTheDocument();
      expect(screen.getByText('Submit')).toBeInTheDocument();
  });
  
});
