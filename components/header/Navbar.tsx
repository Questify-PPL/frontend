import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Session } from "next-auth";

type Props = {
  user: Session | null;
};

export function Navbar({ user }: Readonly<Props>) {
  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-12 md:px-16 lg:px-24">
      <Link
        className="flex items-center space-x-4 cursor-pointer py-2"
        href={"/"}
      >
        <Image
          src={"/assets/Questify.svg"}
          alt="Questify"
          className="lg:w-28 w-20 h-8"
          width={180}
          height={16}
        />
      </Link>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Link href={user ? "/home" : "/login"}>
          <Button className="text-primary bg-white font-bold sm:text-sm text-xs hover:bg-[#E5EEF0]">
            {user ? "Home" : "Sign In"}
          </Button>
        </Link>
        <Link href={user ? "/home" : "/register"}>
          <Button className="text-white font-bold sm:text-sm text-xs">
            {user ? "Home" : "Sign Up"}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
