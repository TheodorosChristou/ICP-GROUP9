# Header Component

This component represents the header/navigation bar of the application.

## Example Usage

```jsx
import Header from './Header';

const YourComponent = () => {
  return (
    <div>
      <Header />
      {/* Your content */}
    </div>
  );
};

export default YourComponent;
```

## Component Structure

```tsx
<Header>
  <nav data-testid="navbar" className="...">
    {/* Logo and title */}
    <div className="...">
      <div className="...">
        <Link href="/">
          <Image alt="Maritime Logo" src="/img/Anchor.png" width={60} height={60} className="..." />
        </Link>
      </div>
      <div className="...">
        <Link href="/">
          <h1>Maritime</h1>
        </Link>
      </div>
      <div className="...">
        <h1>Emergency</h1>
      </div>
    </div>
    {/* Menu toggle button */}
    <div className="...">
      <button onClick={toggleMenu} className="...">
        {menuOpen ? <XIcon className="..." /> : <MenuIcon className="..." />}
      </button>
    </div>
    {/* Menu items */}
    <div className={`... ${menuOpen ? '...' : 'hidden'}`}>
      <Link href="/" passHref>
        <div className="..." onClick={handleMenuClick}>Home</div>
      </Link>
      <Link href="/map" passHref>
        <div className="..." onClick={handleMenuClick}>Map</div>
      </Link>
      {session && (role === 'admin' || process.env.NEXT_PUBLIC_TESTING) && (
        <Link href="/archive" passHref>
          <div className="..." onClick={handleMenuClick}>Archive</div>
        </Link>
      )}
      {!session && (
        <div className="...">
          <div onClick={() => signIn()} className="..."><LoginIcon className="..." /> Log In</div>
        </div>
      )}
      {session && (
        <div className="...">
          <div className="...">Welcome {session.user.name}</div>
          <div onClick={() => signOut()} className="..."><LogoutIcon className="..." /> Log Out</div>
        </div>
      )}
    </div>
  </nav>
</Header>

```

## Props

This component does not accept any props.

## Implementation Details

- Uses useSession hook from next-auth/react to get user session data.

- Renders different content based on user authentication status and role.

- Provides a toggle button to show/hide the menu on smaller screens.

- Uses Link from Next.js for client-side navigation.