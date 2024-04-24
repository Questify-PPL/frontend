import React from "react";
import {
  LuMinus,
  LuAlignLeft,
  LuListChecks,
  LuCheckSquare,
  LuLayoutGrid,
  LuColumns,
  LuChevronsUpDown,
  LuFrame,
  LuGauge,
  LuStar,
  LuCalendar,
  LuClock,
  LuHash,
  LuUpload,
  LuLink,
} from "react-icons/lu";
import { QuestionTypeNames as qtn } from "@/lib/services/form";

interface QuestionTypeProps {
  type: string;
  noText: boolean;
}

const QuestionType: React.FC<QuestionTypeProps> = ({
  type,
  noText = false,
}) => {
  const getDynamicStyles = () => {
    switch (type) {
      case qtn.SHORT_TEXT:
      case qtn.LONG_TEXT:
        return "bg-[#D2E4E3] text-[#1D7973]";
      case qtn.CHECKBOX:
      case qtn.MULTIPLE_CHOICE:
      case qtn.PICTURE_CHOICE:
      case qtn.YES_NO:
      case qtn.DROPDOWN:
        return "bg-[#FAD6E8] text-[#E7328C]";
      case qtn.MATRIX:
      case qtn.NET_PROMOTER:
      case qtn.RATING:
        return "bg-[#FFE8D6] text-[#FD8B31]";
      case qtn.DATE:
      case qtn.TIME:
      case qtn.NUMBER:
        return "bg-[#E8EFD8] text-[#8CAF3E]";
      case qtn.FILE_UPLOAD:
      case qtn.LINK:
        return "bg-[#F0EED3] text-[#B3A824]";
      default:
        return "bg-gray-200 text-gray-800"; // Default style
    }
  };

  const renderIcon = () => {
    switch (type) {
      case qtn.SHORT_TEXT:
        return <LuMinus />;
      case qtn.LONG_TEXT:
        return <LuAlignLeft />;
      case qtn.CHECKBOX:
        return <LuCheckSquare />;
      case qtn.MULTIPLE_CHOICE:
        return <LuListChecks />;
      case qtn.PICTURE_CHOICE:
        return <LuLayoutGrid />;
      case qtn.YES_NO:
        return <LuColumns />;
      case qtn.DROPDOWN:
        return <LuChevronsUpDown />;
      case qtn.MATRIX:
        return <LuFrame />;
      case qtn.NET_PROMOTER:
        return <LuGauge />;
      case qtn.RATING:
        return <LuStar />;
      case qtn.DATE:
        return <LuCalendar />;
      case qtn.TIME:
        return <LuClock />;
      case qtn.NUMBER:
        return <LuHash />;
      case qtn.FILE_UPLOAD:
        return <LuUpload />;
      case qtn.LINK:
        return <LuLink />;
    }
  };

  return (
    <div
      className={`flex flex-row rounded-full gap-1 font-medium text-[10px] leading-[12px] h-fit px-2 py-1 items-center ${getDynamicStyles()}`}
    >
      <span className="font-semibold w-min-3 h-min-3">{renderIcon()}</span>
      {!noText && <span>{type}</span>}
    </div>
  );
};

export default QuestionType;
