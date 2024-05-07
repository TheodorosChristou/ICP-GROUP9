import { render, screen, waitFor } from '@testing-library/react';
import MyApp from '@/pages/_app';

beforeAll(() => {
  Object.defineProperty(window, 'navigator', {
    value: {
      serviceWorker: {
        register: jest.fn().mockResolvedValue({}),
      },
    },
    writable: true,
  });
});
// Mock the service worker
import sw from '../__mocks__/sw';
jest.mock('../__mocks__/sw');

describe('MyApp', () => {
  it('renders children components', () => {
    render(
      <MyApp
        Component={() => <div>Mock Component</div>}
        pageProps={{ session: null }}
      />
    );

    expect(screen.getByText('Mock Component')).toBeInTheDocument();
  });

  it('registers service worker on mount', async () => {
    render(<MyApp Component={() => <div />} pageProps={{ session: null }} />);
    await waitFor(() => {
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');
    });
  });
  })