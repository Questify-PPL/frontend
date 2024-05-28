import Image from "next/image";

export function LogicChildren() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <Image
        src={"/assets/future-icon.svg"}
        alt="Under Construction"
        width={200}
        height={200}
      />
      <span className="flex text-center text-xs text-[#95B0B4] mt-2">
        Cool Improvement
      </span>
      <span className="flex text-center font-semibold text-xs text-[#95B0B4]">
        is under Development
      </span>
    </div>
  );
}
