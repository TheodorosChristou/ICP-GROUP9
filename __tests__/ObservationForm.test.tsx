import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ObservationForm from '@/components/ObservationForm';

describe('ObservationForm', () => {
    const mockOnSubmit = jest.fn();const renderForm = (props = {}) => {
        render(<ObservationForm onSubmit={mockOnSubmit} {...props} />);
      };
      test('renders ObservationForm with default values', () => {
        renderForm();
    expect(screen.getByText('Latitude')).toBeInTheDocument();
    expect(screen.getByText('Longitute')).toBeInTheDocument();
    expect(screen.getByText('Observation')).toBeInTheDocument();
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

});