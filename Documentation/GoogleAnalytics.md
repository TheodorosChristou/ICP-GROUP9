# GoogleAnalytics Component

This component integrates Google Analytics into a Next.js application.

## Props

- `GA_MEASUREMENT_ID`: string - Google Analytics measurement ID.

## Example Usage

```tsx
import GoogleAnalytics from './GoogleAnalytics';

const YourComponent = () => {
  return (
    <div>
      <h1>Your Website</h1>
      <GoogleAnalytics GA_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" />
    </div>
  );
};

export default YourComponent;
```

## Implementation Details

- Uses usePathname and useSearchParams hooks from next/navigation to track pageviews and changes in query parameters.

- Uses useEffect hook to send pageview events to Google Analytics on component mount and when pathname or searchParams change.

- Uses pageview function from ../../lib/gtagHelper to send pageview events to Google Analytics.

- Embeds Google Analytics script using Script component from next/script.

- Initializes Google Analytics with the provided measurement ID and sets default consent to deny analytics storage.

- Sends pageview events to Google Analytics using gtag('config', ...).


```tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import { pageview } from "../../lib/gtagHelper"
import Script from 'next/script'

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        const url = pathname + (searchParams ? searchParams.toString() : ''); // Check if searchParams is null
        pageview(GA_MEASUREMENT_ID, url);
    }, [pathname, searchParams]);

    return (
        <>
            <Script strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
            <Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('consent', 'default', {
                        'analytics_storage': 'denied'
                    });
                    
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                    `,
                }}
            />
        </>
    )
}
```