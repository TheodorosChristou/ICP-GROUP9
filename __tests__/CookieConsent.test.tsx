import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieBanner from '../src/components/CookieConsent';

it('Decline Button handles click', () => {
    const onClick = jest.fn();
    render(<CookieBanner />);
    const buttonElem = screen.getByText('Decline');
    fireEvent.click(buttonElem);
    expect(onClick).toHaveBeenCalledTimes(1);

})
it('Accept Button handles click', () => {
    const onClick = jest.fn();
    render(<CookieBanner />);
    const buttonElem = screen.getByText('Allow Cookies');
    fireEvent.click(buttonElem);
    expect(onClick).toHaveBeenCalledTimes(1);

})
it('Should have a heading', () => {
    render (<CookieBanner />);
    const Text = screen.getByText('This website uses cookies to enhance the user experience. By clicking "Agree," you consent to the use of cookies, including the collection of your location data for tracking purposes')
    expect(Text).toBeInTheDocument()
})