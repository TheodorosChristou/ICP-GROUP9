# Heading Component

This component sets the document head metadata for the application.

## Example Usage

```tsx
import Heading from './Heading';

const YourComponent = () => {
  return (
    <div>
      <Heading />
      {/* Your content */}
    </div>
  );
};

export default YourComponent;
```
## Component Structure

```tsx
<Heading>
  <Head>
    <title>Maritime Emergency</title>
    <meta name="description" content="Home" />
    <meta name="theme-color" content="#000000" />
    <link rel="icon" href="/img/Anchor.ico" />
    <link rel="manifest" href="manifest.json" />
  </Head>
</Heading>

```

## Implementation Details

- Uses Head from Next.js to set document metadata like title, description, theme color, and favicon.

- The title is set to "Maritime Emergency".

- The description is set to "Home".

- The theme color is set to black (#000000).

- The favicon is set to "/img/Anchor.ico".

- Manifest link is set to "manifest.json".

```tsx
import Head from "next/head";
export default function Heading() {
    return (
        <div>
            <Head>
                <title>Maritime Emergency</title>
                <meta name="description" content="Home" />
                <meta name="theme-color" content="#000000" />
                <link rel="icon" href="/img/Anchor.ico" />
                <link rel="manifest" href="manifest.json" />
            </Head>
        </div>
    );
}
```