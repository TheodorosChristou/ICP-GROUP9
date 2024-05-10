import { LoginIcon, LogoutIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();  
  let user, role;

  if (session?.user?.name?.toString()) {
    user = session.user.name;
    role = session.user.role;
  }

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = () => {
    setMenuOpen(false); 
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white">
      <nav data-testid="navbar" className="p-2 items-center w-full flex justify-between">
        <div className="text-black h-12 w-full gap-0 sm:gap-3 flex items-center justify-between">
          <div className="flex align-center">
            <div className="flex space-x-2" data-test="home-ref">
              <Link href="/">
                <Image
                  alt="Maritime Logo"
                  src="/img/Anchor.PNG"
                  width={60}
                  height={60}
                  className="cursor-pointer max-h-sm max-w-lg py-3 mt-0"
                />
              </Link>
            </div>
            <div className="flex space-x-2 ml-1.5 mt-1.5 text-black mb-1 font-bold italic text-3xl py-1 px-1 xs:px-3 sm:px-1">
              <Link href="/">
                <h1>Maritime</h1>
              </Link>
            </div>
            <div className="flex text-black space-x-2 cursor-default mt-3 mb-1 font-semibold italic text-xl py-1 sm:px-1">
              <h1>Emergency</h1>
            </div>
          </div>
          <div className="lg:hidden relative">
            <button
              onClick={toggleMenu}
              className="text-xl text-black hover:bg-gray-300 p-1 rounded-full"
            >
              {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
          <div className={`lg:flex gap-2 ${menuOpen ? 'flex flex-col bg-white absolute w-full top-12 left-0' : 'hidden'}`}>
            <Link href="/" passHref>
              <div
                className="text-xl lg:mt-2 hover:bg-gray-300 py-2 px-4 rounded cursor-pointer"
                onClick={handleMenuClick}
              >
                Home
              </div>
            </Link>
            <Link href="/map" passHref>
              <div
                className="text-xl lg:mt-2 hover:bg-gray-300 py-2 px-4 rounded cursor-pointer"
                onClick={handleMenuClick}
              >
                Map
              </div>
            </Link>
            {session && (role === 'admin' || process.env.NEXT_PUBLIC_TESTING) && (
              <Link data-test="archive-ref" href="/archive" passHref>
                <div
                  className="text-xl lg:mt-2 hover:bg-gray-300 py-2 px-4 rounded cursor-pointer"
                  onClick={handleMenuClick}
                >
                  Archive
                </div>
              </Link>
            )}
            {!session && (
              <div className="flex items-center">
                <div className="text-5xl cursor-default mb-1">|</div>
                <div
                  className="flex items-center text-xl mt-2 hover:bg-gray-300 py-2 px-4 rounded cursor-pointer"
                  onClick={() => signIn()}
                >
                  <LoginIcon className="h-6 w-6 mt-1" /> Log In
                </div>
              </div>
            )}
            {session && (
              <div className="flex items-center">
                <div className="text-5xl cursor-default mb-1">|</div>
                <div className="flex items-center text-xl mt-2 py-2 px-4 rounded cursor-default">
                  <h1>Welcome {session.user.name}</h1>
                </div>
                <div
                  className="flex items-center text-xl mt-2 hover:bg-gray-300 py-2 px-4 rounded cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogoutIcon className="h-6 w-6 mt-1" /> Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
