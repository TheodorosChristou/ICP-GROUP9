import {LoginIcon, LogoutIcon} from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react"


export default function Header() {

  const{data: session} = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white">
      <nav className="p-2 items-center w-full flex justify-between">
        <div className="text-black h-12 w-full gap-0 sm:gap-3 flex items-center justify-between">
          <div className="flex align-center">
            <div className="flex space-x-2">
              <Link href="/">
                <Image
                  alt="image"
                  src="/img/iq.png"
                  width={60}
                  height={60}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <div className="flex space-x-2 ml-1.5 mt-1.5 text-black	 mb-1 font-bold italic text-3xl py-1 px-1 xs:px-3 sm:px-1"><a href="/"><h1>EuroTech</h1></a></div>
            <div className="flex text-black space-x-2 cursor-default mt-3 mb-1 font-semibold italic text-xl py-1 sm:px-1"><h1>Tasker</h1></div>
          </div>
          <div className="justify-center items-center gap-1 flex 3xl:flex-1 flex-row 3xl:justify-end">
            <div className="mx-2.5 gap-1 hidden lg:flex">
              <div className="flex"><a className="text-xl hover:bg-gray-300 py-1 px-1 xs:px-3 sm:px-3 rounded-full" href="/">Home</a></div>
              <div className="flex"><a className="text-xl hover:bg-gray-300 py-1 px-1 xs:px-3 sm:px-3 rounded-full" href="/archive">Archive</a></div>
            </div>
            {!session &&(<div className="flex items-center mb-2 mx-2.5">
              <div><h1 className="text-5xl cursor-default mb-1">|</h1></div>
              <div className="flex cursor-pointer" onClick={()=> signIn()}><a className="flex items-center text-xl mt-2 hover:bg-gray-300 py-1 px-1 xs:px-3 sm:px-3 rounded-full"><LoginIcon className="h-6 w-6 mt-1" /> Log In</a></div>
            </div>)}
            {session &&(<div className="flex items-center mb-2 mx-2.5">
              <div><h1 className="text-5xl cursor-default mb-1">|</h1></div>
              <div className="flex items-center text-xl mt-2 py-1 px-1 xs:px-3 sm:px-3 cursor-default"><h1>Welcome {session.user!.name}</h1></div>
              <div className="flex cursor-pointer"onClick={()=> signOut()}><a className="flex items-center text-xl mt-2 hover:bg-gray-300 py-1 px-1 xs:px-3 sm:px-3 rounded-full"><LogoutIcon className="h-6 w-6 mt-1" /> Log Out</a></div>
            </div>)}
          </div>
          </div>
      </nav>
    </div>
  );
}
