import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '@/pages/404';

describe('NotFound component', () => {
  it('renders page not found message', () => {
    render(<NotFound />);
    const pageNotFoundMessage = screen.getByText(/Page not found/i);
    expect(pageNotFoundMessage).toBeInTheDocument();
  });

  it('renders image with correct alt text', () => {
    render(<NotFound />);
    const image = screen.getByAltText('404 image');
    expect(image).toBeInTheDocument();
  });

  it('renders back to home link', () => {
    render(<NotFound />);
    const backToHomeLink = screen.getByText(/Back To Home Page/i);
    expect(backToHomeLink).toBeInTheDocument();
  });

  it('redirects to home page when back to home link is clicked', () => {
    const { container } = render(<NotFound />);
    const backToHomeLink = container.querySelector('a');
    expect(backToHomeLink).toHaveAttribute('href', '/');
  });
});
