
# Cookie Banner Component

This component is used to display a cookie banner for informing users about the use of cookies on the website and obtaining their consent.

## Usage

```jsx
import CookieBanner from 'path/to/CookieBanner';

const YourComponent = () => {
  return (
    <CookieBanner />
  );
};
```

## Implementation Details

- Uses getLocalStorage and setLocalStorage functions from ../../lib/storageHelper for storing the user's cookie consent.

- Uses useState and useEffect hooks from React for managing component state and lifecycle.

- Uses Link from Next.js for routing.

- Tracks user consent with Google Analytics using window.gtag.

- Provides buttons for users to accept or decline cookies.

## Component Structure
```tsx
<CookieBanner>
  <div data-test="cookie-item" role="banner" className="...">
    <div data-test="cookie-text" role="dialog" className="...">
      <p>This website uses cookies to enhance the user experience. By clicking "Agree," you consent to the use of cookies, including the collection of your location data for tracking purposes.</p>
    </div>
    <div className="...">
      <button data-test="cookieDecline-button" className="..." onClick={() => setCookieConsent(false)}>Decline</button>
      <button data-test="cookieAllow-button" className="..." onClick={() => setCookieConsent(true)}>Allow Cookies</button>
    </div>
  </div>
</CookieBanner>
```

- The banner is hidden if the user has already provided consent.

- Provides buttons for users to decline or allow cookies.