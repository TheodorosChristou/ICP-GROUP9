import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Header from '@/components/Header'

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" }
    };
    return {
      __esModule: true,
      ...originalModule,
      useSession: jest.fn(() => {
        return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
      }),
    };
  });

  it('Should have a nav bar', () => {
    render(<Header />);
    const navBar = screen.getByTestId('navbar');
    expect(navBar).toHaveClass('p-2')
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
})
it('Should have an image', () => {
    render(<Header />);
    const image = screen.getByAltText('image');
    expect(image).toBeInTheDocument()
})

it('Should Show Log Out when has session',
    async () => {
    const {container} = render(<Header/>);
  
    expect(container).toMatchSnapshot()
    expect(screen.getByText("Log Out")).toBeInTheDocument();
    });

it('Should Show Log In when no session', () => {
    jest.mock("next-auth/react", () => ({
    useSession: () => ({ data: null })
    }));
      
    render(<Header/>);
      
    expect(screen.queryByText("Log In")).not.toBeInTheDocument();
    });
