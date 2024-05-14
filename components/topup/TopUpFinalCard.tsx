"use client";

import React from "react";
import { LuPlusCircle } from "react-icons/lu";

interface TopUpFinalCardProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onCancel?: () => void;
}

const TopUpFinalCard: React.FC<TopUpFinalCardProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 text-center "
        data-testid="final-topup-card"
      >
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-xl text-gray-700 bg-transparent hover:bg-gray-200 rounded-lg p-1"
        >
          &times;
        </button>
        <div className="mb-4">
          <LuPlusCircle className="mx-auto text-4xl text-[#32636A]" />
          <h3 className="text-lg font-bold">Top Up Process Started</h3>
          <p>You can check your Top Up status via Top Up History</p>
        </div>
        <button
          onClick={onClose}
          className="bg-[#32636A] text-white font-medium py-2 px-6 rounded-md hover:bg-[#32839A] focus:outline-none focus:bg-[#32636A] transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default TopUpFinalCard;
