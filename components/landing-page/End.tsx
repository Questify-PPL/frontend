import { Button } from "../ui/button";
import { Head } from "./Head";

export function End() {
  return (
    <section className="flex flex-col items-center justify-center w-full px-2 py-6 lg:py-12">
      <Head
        content={
          "Unlock academic success with our streamlined form builder and distributor"
        }
      />
      <Button className="font-bold text-white mt-4 lg:mt-8 text-sm py-4 md:text-base md:py-6 lg:text-xl lg:py-8 lg:px-8">
        Sign Up
      </Button>
    </section>
  );
}
