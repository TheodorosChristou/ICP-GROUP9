import Image from "next/image";
import Link from "next/link";
import Heading from "../components/Heading";

export default function notFound() {
  return (
    <div className="flex items-center flex-col">
          <Heading></Heading>
      <div className="">
        <Image src="/img/404.png" width={727} height={500} alt="404 image" />
      </div>
      <h1 className="text-3xl mb-5"> Page not found</h1>
      <Link href="/">
        <h1 className="blue-button w-48 mb-11">Back To Home Page</h1>
      </Link>
    </div>
  );
}
