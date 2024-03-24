import { Card } from "@/components/ui/card";
import { LuX, LuSave } from "react-icons/lu";

interface SavedAsDraftModalProps {
  className?: string;
  QRETitle?: string;
  onCancel?: () => void;
}

export function SavedAsDraftModal({
  className = "",
  QRETitle = "",
  onCancel = () => {},
}: Readonly<SavedAsDraftModalProps>) {
  return (
    <div
      className={`absolute w-full h-full justify-center items-center bg-[#324B4F]/70 ${className}`}
      data-testid="saved-as-draft-modal"
    >
      <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-6">
        <div className="flex flex-row justify-end items-center w-full">
          <LuX
            className="w-5 h-5"
            onClick={onCancel}
            data-testid="cancel-saved-as-draft"
          ></LuX>
        </div>
        <div className="flex flex-col gap-4 w-full items-center justify-center">
          <LuSave className="w-16 h-16 text-primary"></LuSave>
          <div className="flex flex-col justify-center items-center">
            <span className="flex font-extrabold text-xl">Saved As Draft!</span>
            <span className="flex font-regular text-sm text-primary/40">
              {QRETitle}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SavedAsDraftModal;
