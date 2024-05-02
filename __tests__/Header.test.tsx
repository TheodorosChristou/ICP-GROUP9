import Header from '@/components/Header'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signIn, signOut, useSession } from 'next-auth/react';

// Mock the useSession hook
jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    // Mock the useSession hook behavior
    (useSession as jest.Mock).mockImplementation(() => ({
      data: null,
      status: 'loading', // or 'authenticated', 'unauthenticated' depending on your test scenario
      error: null,
    }));
  });

  test('renders logo and title', () => {
    render(<Header />);
    expect(screen.getByAltText('Maritime Logo')).toBeInTheDocument();
    expect(screen.getByText('Maritime')).toBeInTheDocument();
    expect(screen.getByText('Emergency')).toBeInTheDocument();
  });

  test('displays login button when user is not authenticated', () => {
    render(<Header />);
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });

  test('displays logout button when user is authenticated', () => {
    // Mock the useSession hook to return authenticated status
    (useSession as jest.Mock).mockImplementation(() => ({
      data: { user: { name: 'TestUser' } },
      status: 'authenticated',
      error: null,
    }));
    render(<Header />);
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('displays user name when user is authenticated', () => {
    // Mocking the useSession hook to return authenticated status with user data
    (useSession as jest.Mock).mockImplementation(() => ({
      data: { user: { name: 'TestUser' } },
      status: 'authenticated',
      error: null,
    }));
    render(<Header />);
    expect(screen.getByText('Welcome TestUser')).toBeInTheDocument();
  });

  test('displays menu when menu icon is clicked', async () => {
      render(<Header />);
      // Menu should not be visible initially
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
      // Click on menu icon
      fireEvent.click(screen.getByRole('button', { name: /menu/i }));
      // Menu should be visible after clicking
      expect(screen.getByText('Home')).toBeInTheDocument();
      // Click again to close the menu
      fireEvent.click(screen.getByRole('button', { name: /menu/i }));
      // Menu should be hidden again
      await waitFor(() => {
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
      });
    });

});