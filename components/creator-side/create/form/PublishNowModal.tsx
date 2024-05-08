import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuX, LuGlobe } from "react-icons/lu";

interface PublishNowModalProps {
  className?: string;
  title?: string;
  onCancel?: () => void;
}

export function PublishNowModal({
  className = "",
  title = "",
  onCancel = () => {},
}: Readonly<PublishNowModalProps>) {
  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      data-testid="publish-now-modal"
    >
      <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-end items-center w-full">
          <LuX
            className="w-5 h-5"
            onClick={onCancel}
            data-testid="cancel-publish-now"
          ></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <LuGlobe className="w-16 h-16 text-primary"></LuGlobe>
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">Published!</span>
            <span className="flex font-regular text-sm text-primary/40">
              {title}
            </span>
          </div>
        </div>
        <Button className="w-full" onClick={onCancel}>
          OK
        </Button>
      </Card>
    </div>
  );
}

export default PublishNowModal;
