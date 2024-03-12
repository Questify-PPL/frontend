import Image from "next/image";
import React from "react";
import {
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

interface QuestionTypeProps {
  type: string;
  noText: boolean;
}

const shortTextIcon = "/assets/short-text.svg";

const QuestionType: React.FC<QuestionTypeProps> = ({
  type = "Hello",
  noText = false,
}) => {
  const getDynamicStyles = () => {
    switch (type) {
      case "Short Text":
      case "Long Text":
        return "bg-[#D2E4E3] text-[#D2E4E3]";
      case "Multiple Choice":
      case "Checkboxes":
      case "Picture Choice":
      case "Yes/No":
      case "Dropdown":
        return "bg-[#FAD6E8] text-[#E7328C]";
      case "Matrix":
      case "Net Promoter Score":
      case "Rating":
        return " bg-[#FFE8D6] text-[#FD8B31]";
      case "Date":
      case "Time":
      case "Number":
        return "bg-[#E8EFD8] text-[#8CAF3E]";
      case "File Upload":
      case "Link":
        return "bg-[#F0EED3] text-[#B3A824]";
      default:
        return "";
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "Short Text":
        return (
          <Image src={shortTextIcon} alt="Short Text" width={16} height={16} />
        );
      case "Long Text":
        return <LuAlignLeft />;
      case "Multiple Choice":
        return <LuListChecks />;
      case "Checkboxes":
        return <LuCheckSquare />;
      case "Picture Choice":
        return <LuLayoutGrid />;
      case "Yes/No":
        return <LuColumns />;
      case "Dropdown":
        return <LuChevronsUpDown />;
      case "Matrix":
        return <LuFrame />;
      case "Net Promoter Score":
        return <LuGauge />;
      case "Rating":
        return <LuStar />;
      case "Date":
        return <LuCalendar />;
      case "Time":
        return <LuClock />;
      case "Number":
        return <LuHash />;
      case "File Upload":
        return <LuUpload />;
      case "Link":
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
