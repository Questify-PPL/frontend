import Image from "next/image";
import { Button } from "../ui/button";
import { LuCoins } from "react-icons/lu";
import { Head } from "./Head";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center w-full px-2 py-6 lg:py-12">
      <Head content="Empower academic communities engagement" />
      <p className="text-base md:text-xl lg:text-2xl text-primary text-center font-medium mt-2 pt-2 px-8">
        through redefined prize-based questionnaire
      </p>
      <Button className="font-bold text-white mt-4 lg:mt-8 text-sm py-4 md:text-base md:py-6 lg:text-xl lg:py-8 lg:px-8">
        Get Started
      </Button>
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
            "https://res.cloudinary.com/dicmrrmdr/image/upload/f_auto,q_auto/v1/questify/wzgalujjo3q4x1weie5l"
          }
          alt="Background"
          width={384}
          height={96}
          quality={100}
          priority={false}
          className="w-full h-full"
        />
        <div className="flex-1 sm:flex hidden flex-row items-center px-8 py-8 bg-[#E5EEF0] md:space-x-16 space-x-8">
          <p className="flex-wrap flex-1 text-base max-w-sm pr-16">
            Ever tried a questionnaire that provides certainity for prize
            distribution?
          </p>
          <Button className="bg-black text-white">Try Now</Button>
        </div>
      </div>
    </section>
  );
}
