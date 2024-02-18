import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-4 sm:px-12 md:px-16 lg:px-24">
      <div className="flex items-center space-x-4 cursor-pointer py-2">
        <Image
          src={"/assets/Questify.svg"}
          alt="Questify"
          className="lg:w-28 w-20 h-8"
          width={180}
          height={16}
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <Button className="text-white font-bold sm:text-sm text-xs">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
}
