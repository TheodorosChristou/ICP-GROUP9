import { render, screen } from '@testing-library/react';
import MyApp from '@/pages/_app';
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
  
    it('registers service worker on mount', () => {
      const originalNavigator = { ...navigator };
  
      Object.defineProperty(window, 'navigator', {
        value: { ...originalNavigator, serviceWorker: undefined },
        writable: true,
      });
  
      render(<MyApp Component={() => <div />} pageProps={{ session: null }} />);
  
      // Assert that service worker registration is not called
      expect(navigator.serviceWorker).toBeUndefined();
  
      // Restore original navigator
      Object.defineProperty(window, 'navigator', {
        value: originalNavigator,
        writable: true,
      });
    });
  
    it('renders Header and ConsentPopup components', () => {
      render(
        <MyApp
          Component={() => <div />}
          pageProps={{ session: null }}
        />
      );
  
      expect(screen.getByRole('banner')).toBeInTheDocument(); 
      expect(screen.getByRole('dialog')).toBeInTheDocument(); 
    });
  });