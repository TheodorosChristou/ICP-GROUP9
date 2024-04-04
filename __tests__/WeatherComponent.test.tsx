import React from 'react';
import { render } from '@testing-library/react';
import WeatherPage from '@/pages/weatherpage';

describe('WeatherPage', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<WeatherPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
