import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center h-full min-h-fit">
      <div className="flex flex-col px-[20px] md:w-fit w-full py-[30px] md:py-[190px] md:min-h-screen self-stretch items-center justify-center md:px-[48px] bg-register-pattern bg-cover bg-no-repeat">
        <div className="flex-col items-center justify-center md:flex hidden md:w-[270px] md:p-[24px] lg:w-[380px] lg:p-[40px] gap-[32px] rounded-[6px] h-fit bg-white">
          <div className="flex items-center gap-[6px] self-stretch">
            <span className="w-[4px] self-strech h-full rounded-[2px] bg-destructive"></span>
            <p className="text-primary text-xs font-medium">Trivia</p>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 self-stretch">
            <label className="text-sm font-semibold text-black">
              What sport was featured on the first curved U.S. coin in 2014?
            </label>
            <RadioGroup className="flex flex-col gap-2">
              <div className="flex items-center self-stretch gap-2">
                <RadioGroupItem
                  value="option-one"
                  id="option-one"
                  className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label htmlFor="option-one">Basketball</Label>
              </div>
              <div className="flex items-center self-stretch gap-2">
                <RadioGroupItem
                  value="option-two"
                  id="option-two"
                  className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label htmlFor="option-two">Baseball</Label>
              </div>
              <div className="flex items-center self-stretch gap-2">
                <RadioGroupItem
                  value="option-three"
                  id="option-three"
                  className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label htmlFor="option-three">Football</Label>
              </div>

              <div className="flex items-center self-stretch gap-2">
                <RadioGroupItem
                  value="option-four"
                  id="option-four"
                  className="h-4 w-4 rounded-[2.285px] border-[1px] border-solid border-[#CDDDE1]"
                />
                <Label htmlFor="option-four">Hockey</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="w-full bg-[#606F75]">Submit</Button>
        </div>
      </div>
      {children}
    </section>
  );
}
