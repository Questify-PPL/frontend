import { Button } from "../ui/button";

export function End() {
  return (
    <section className="flex flex-col items-center justify-center w-full px-2 py-6 lg:py-12">
      <h1 className="text-2xl max-w-xs  sm:text-4xl sm:max-w-lg md:text-5xl md:max-w-2xl lg:text-6xl lg:max-w-4xl font-bold text-primary text-center">
        Unlock academic success with our streamlined form builder and
        distributor
      </h1>
      <Button className="font-bold text-white mt-4 lg:mt-8 text-sm py-4 md:text-base md:py-6 lg:text-xl lg:py-8 lg:px-8">
        Sign Up
      </Button>
    </section>
  );
}
