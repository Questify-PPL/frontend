import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LuX, LuGlobe, LuCopy } from "react-icons/lu";
import { useQuestionnaireContext } from "@/lib/hooks";
import { useCopyClick } from "@/lib/utils";

interface PublishNowModalProps {
  title?: string;
}

export function PublishNowModal({
  title = "",
}: Readonly<PublishNowModalProps>) {
  const { isPublishNow, setIsPublishNow, link } = useQuestionnaireContext();
  const { handleCopyClick, fullLink } = useCopyClick(link);

  return (
    <>
      {isPublishNow && (
        <div
          className={`flex absolute w-full h-full justify-center items-center bg-[#324B4F]/70`}
          data-testid="publish-now-modal"
        >
          <Card className="flex flex-col w-[35%] p-5 justify-center items-center gap-6">
            <div className="flex flex-row justify-end items-center w-full">
              <LuX
                className="w-5 h-5"
                onClick={() => {
                  setIsPublishNow(false);
                }}
                data-testid="cancel-publish-now"
              ></LuX>
            </div>
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <LuGlobe className="w-16 h-16 text-primary"></LuGlobe>
              <div className="flex flex-col w-full justify-center items-center">
                <span className="flex font-extrabold text-xl">Published!</span>
                <span className="flex font-bold pt-2">{title}</span>
                <label className="flex w-full font-semibold items-center break-all p-2 mt-1">
                  Link
                </label>
                <label className="flex w-full items-center break-all text-sm border border-gray-300 p-2 rounded">
                  <span className="flex-grow">{fullLink}</span>
                  <LuCopy
                    className="ml-2 cursor-pointer text-primary hover:text-primary-hover"
                    data-testid="copy-button"
                    onClick={async () => {
                      await handleCopyClick();
                    }}
                  />
                </label>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                setIsPublishNow(false);
              }}
            >
              OK
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}

export default PublishNowModal;
