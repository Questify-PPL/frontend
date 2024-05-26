import { ReloadIcon } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useResponsesContext } from "@/lib/context";

export function UnpublishConfirmationModal() {
  const { isOpen, setIsOpen, onUnpublish, isFinished } = useResponsesContext();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 px-8 flex items-center justify-center bg-[#324B4F] bg-opacity-50 z-[20]">
          <div
            className="bg-white p-5 rounded-lg shadow-lg w-fit h-fit items-center justify-center"
            data-testid="purchased-confirmation-modal"
          >
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="items-center justify-center p-1">
                <p className="text-[#1D2425] text-med font-bold text-wrap mt-2 text-center ">
                  Are you sure you want to unpublish this form?
                </p>
              </div>
              <div className="flex flex-row gap-5">
                <Button
                  className="w-28 h-9 mt-5 "
                  onClick={async () => {
                    await onUnpublish();
                    setIsOpen(false);
                  }}
                  disabled={!isFinished}
                >
                  {!isFinished && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin fill-white" />
                  )}
                  Yes
                </Button>
                <Button
                  className="w-28 h-9 mt-5 bg-[#DA0A1E]"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
