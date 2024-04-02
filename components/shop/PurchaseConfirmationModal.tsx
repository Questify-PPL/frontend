import { useState } from "react";
import { LuScroll } from "react-icons/lu";
import { Button } from "../ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PurchaseConfirmationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#324B4F] bg-opacity-50">
      <div
        className="bg-white p-5 rounded-lg shadow-lg w-80 h-52 items-center justify-center"
        data-testid="purchased-confirmation-modal"
      >
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
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
              Are you sure you want to buy this item?
            </p>
          </div>
          <div className="flex flex-row gap-5">
            <Button className="w-28 h-9 mt-5 " onClick={onClose}>
              Yes
            </Button>
            <Button className="w-28 h-9 mt-5 bg-[#DA0A1E]" onClick={onClose}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmationModal;
