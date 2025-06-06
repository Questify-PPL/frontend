import Image from "next/image";
import { Button } from "../ui/button";
import { LuCoins } from "react-icons/lu";
import { Head } from "./Head";
import Link from "next/link";
import { Highlight } from "../ui/highlight";

export function Hero() {
  return (
    <section
      className="flex flex-col items-center justify-center w-full px-2 py-6 lg:py-12 scroll-mt-48"
      aria-label="hero"
    >
      <Head content="Empower academic communities engagement" />
      <Highlight className="text-primary md:text-xl lg:text-2xl text-center font-bold mt-5 pt-1 px-8">
        through redefined prize-based questionnaire
      </Highlight>
      <Link href="#benefit">
        <Button className="font-bold text-white mt-4 lg:mt-8 text-sm py-4 md:text-base md:py-6 lg:text-xl lg:py-8 lg:px-8">
          Get Started
        </Button>
      </Link>
      <div className="relative flex flex-col rounded-lg w-fit h-fit mt-12 overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-row space-x-1 items-center">
          <div className="bg-[#3D3D3C] rounded-xl px-2 py-1 text-[#E2B720] flex flex-row gap-1 items-center font-bold cursor-pointer">
            <LuCoins className="w-5 h-5" />
            <span className="text-xs">500</span>
          </div>
          <span className="font-bold text-white text-xs">for You!</span>
        </div>
        <Image
          src={
            "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/ee20dhlvwqa9qir2lj7z"
          }
          alt="Background"
          width={300}
          height={115}
          quality={100}
          priority={false}
          className="w-full h-full"
        />
        <div className="flex-1 flex flex-row justify-between items-center px-8 py-4 sm:py-8 bg-[#E5EEF0] md:space-x-16 sm:space-x-2">
          <p className="flex-wrap flex-1 sm:text-base max-w-sm text-sm pr-4 sm:pr-16">
            Ever tried a questionnaire that provides certainity for prize
            distribution?
          </p>
          <Button className="bg-black text-white">Try Now</Button>
        </div>
      </div>
    </section>
  );
}
