/* eslint-disable no-unused-vars */
"use client";

import { ChangeEvent, ReactNode } from "react";
import { LuCheckSquare } from "react-icons/lu";
import { Switch } from "@/components/ui/switch";
import QuestionType from "../creator-side/QuestionType";

interface QuestionLayoutProps {
  role?: "CREATOR" | "RESPONDENT";
  required?: boolean;
  numbering?: number;
  questionType?: string;
  question?: string;
  description?: string;
  answer?: ReactNode;
  handleQuestionChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleDescriptionChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSwitchChange?: () => void;
}

const QuestionLayout: React.FC<QuestionLayoutProps> = ({
  role = "CREATOR",
  required = false,
  numbering = 0,
  questionType = "",
  question = "",
  description = "",
  answer = null,
  handleQuestionChange = () => {},
  handleDescriptionChange = () => {},
  handleSwitchChange = () => {},
}) => {
  return (
    <div className="flex flex-row gap-3 w-full">
      <div className="flex flex-row gap-0.5 md:gap-1 w-6.5 h-fit pt-1">
        {required ? (
          <span className="w-1 h-6 md:w-1.5 bg-[#FE476C] rounded-md"></span>
        ) : (
          <span className="w-1 h-6 md:w-1.5 bg-transparent rounded-md"></span>
        )}
        {numbering === 0 ? null : (
          <div className="flex w-6 h-6 bg-secondary rounded-md text-primary justify-center items-center text-[10px] leading-[12px]">
            {numbering}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 w-full justify-start">
        {role === "CREATOR" ? (
          <div className="flex flex-col w-full md:h-6 md:mt-1.5">
            <div className="md:hidden flex mt-1 h-6 justify-between items-center w-full">
              <QuestionType type={questionType} noText={false} />
              <div className="flex flex-row gap-2 font-medium text-[10px] h-fit leading-[12px] items-center">
                <span>Required</span>
                <Switch
                  id="required"
                  checked={required}
                  onClick={handleSwitchChange}
                ></Switch>
              </div>
            </div>
            <span className="flex w-full text-sm font-medium text-primary">
              Question
            </span>
          </div>
        ) : null}
        {role === "CREATOR" ? (
          <div className="flex flex-col font-semibold gap-0">
            <textarea
              placeholder="Your question here"
              onChange={handleQuestionChange}
              value={question}
              className="text-base md:text-lg w-full resize-none font-semibold whitespace-pre-wrap placeholder:text-primary/40 border-none rounded-none p-0 focus-visible:outline-none overflow-y-hidden"
              rows={1}
            ></textarea>
            <textarea
              placeholder="Description (optional)"
              onChange={handleDescriptionChange}
              value={description}
              className="text-xs md:text-sm w-full resize-none font-normal text-[#64748B] whitespace-pre-wrap placeholder:text-primary/30 border-none rounded-none p-0 focus-visible:outline-none overflow-y-hidden"
              rows={1}
            ></textarea>
          </div>
        ) : (
          <div className="flex flex-col font-semibold text-base md:text-lg gap-0">
            <span className="break-all">{question}</span>
            {description !== "" ? (
              <span className="flex break-all font-normal text-xs md:text-sm text-[#64748B]">
                {description}
              </span>
            ) : null}
          </div>
        )}
        <div className="flex flex-col gap-0 w-full h-fit">{answer}</div>
      </div>
    </div>
  );
};

export default QuestionLayout;
