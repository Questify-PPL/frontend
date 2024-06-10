import { useQuestionnaireContext } from "@/lib/hooks";
import {
  handleQuedesChange,
  updateAnswers,
  updateQuestionnaire,
} from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import QuestionLayout from "./QuestionLayout";

interface RadioButtonProps {
  role: "CREATOR" | "RESPONDENT";
  numbering: number;
  questionId: number;
  questionTypeName: string;
  isRequired: boolean;
  question: string;
  description?: string;
  choice?: string[];
  answer: string[];
  status?: boolean;
}

export function RadioButton(radioButtonProps: Readonly<RadioButtonProps>) {
  const { questionnaire, answers, setQuestionnaire, setAnswers } =
    useQuestionnaireContext();
  const { role, numbering, questionId, questionTypeName } = radioButtonProps;
  const {
    isRequired,
    question,
    description,
    choice = [],
    answer = [],
    status = true,
  } = radioButtonProps;

  const [questionValue, setQuestionValue] = useState<string>(question || "");
  const [descriptionValue, setDescriptionValue] = useState<string>(
    description ?? "",
  );
  const [requiredValue, setRequiredValue] = useState(isRequired || false);

  const [options, setOptions] = useState<string[]>(choice);
  const [selectedOptionsValues, setSelectedOptionsValues] = useState<string>(
    answer[0] || "",
  );

  const lastOptionRef = useRef<HTMLInputElement>(null);

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleQuedesChange(event, setQuestionValue);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    handleQuedesChange(event, setDescriptionValue);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionSelect = (index: number, optionValue: string) => {
    setSelectedOptionsValues(optionValue);
    // Update answers in context
    const updatedAnswers = updateAnswers(answers, questionId, [optionValue]);
    setAnswers(updatedAnswers);
  };

  const handleSwitchChange = () => {
    setRequiredValue(!requiredValue);
  };

  const addNewOption = () => {
    if (role == "CREATOR") {
      setOptions((prevOptions) => [...prevOptions, ""]);
    }
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    if (selectedOptionsValues === options[index]) {
      setSelectedOptionsValues(""); // Reset selected option if it's deleted
    }
  };

  const handleInputClick = (index: number) => {
    if (index === options.length - 1) {
      addNewOption();
    }
  };

  const radioGroupItemTemplate = (
    <div key="template" className="flex items-center self-stretch gap-2">
      <RadioGroupItem
        value=""
        id="option-template"
        className="h-4 w-4 rounded-full border-[1px] border-solid border-[#CDDDE1]"
        onClick={() => {}}
      />
      <input
        ref={lastOptionRef}
        style={{ borderBottom: "none" }}
        type="text"
        placeholder="Add Option"
        className="text-sm outline-none border-b border-gray-300 focus:border-primary "
        readOnly={role == "RESPONDENT"}
        onClick={() => handleInputClick(options.length - 1)}
      />
    </div>
  );

  const handleOption = () => {
    if (questionTypeName === "Multiple Choice") {
      return (
        <RadioGroup className="flex flex-col gap-2 mt-2">
          {options.map((option, index) => (
            <div
              key={`radio-${option}-${index}`}
              className="flex items-center self-stretch gap-2"
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className={`h-4 w-4 rounded-full border-[1px] border-solid border-[#CDDDE1] ${selectedOptionsValues === option ? "bg-custom-blue" : "bg-white"}`}
                onClick={() => handleOptionSelect(index, option)}
                disabled={!status}
                checked={selectedOptionsValues === option}
              />
              <input
                style={{ borderBottom: "none", width: "170px" }}
                type="text"
                value={option}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="text-sm outline-none border-b border-gray-300 focus:border-primary"
                readOnly={role === "RESPONDENT"}
              />
              {role === "CREATOR" && (
                <button onClick={() => deleteOption(index)}>&times;</button>
              )}
            </div>
          ))}
          {role === "CREATOR" && radioGroupItemTemplate}
        </RadioGroup>
      );
    } else if (questionTypeName === "Yes/No" && role === "RESPONDENT") {
      return (
        <RadioGroup className="flex flex-col gap-2 mt-2">
          <div key="yes" className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="Yes"
              id="option-yes"
              className={`h-4 w-4 rounded-full border-[1px] border-solid border-[#CDDDE1] ${selectedOptionsValues === "Yes" ? "bg-custom-blue" : "bg-white"}`}
              onClick={() => handleOptionSelect(1, "Yes")}
              disabled={!status}
              checked={selectedOptionsValues === "Yes"}
            />
            <span className="text-sm">Yes</span>
          </div>
          <div key="no" className="flex items-center self-stretch gap-2">
            <RadioGroupItem
              value="No"
              id="option-no"
              className={`h-4 w-4 rounded-full border-[1px] border-solid border-[#CDDDE1] ${selectedOptionsValues === "No" ? "bg-custom-blue" : "bg-white"}`}
              onClick={() => handleOptionSelect(0, "No")}
              disabled={!status}
              checked={selectedOptionsValues === "No"}
            />
            <span className="text-sm">No</span>
          </div>
        </RadioGroup>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const updatedQuestionnaire = updateQuestionnaire(
      questionnaire,
      questionId,
      requiredValue,
      questionValue,
      descriptionValue,
      options,
    );

    setQuestionnaire(updatedQuestionnaire);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredValue, questionValue, descriptionValue, options]);

  return (
    <div className="flex flex-col gap-4">
      <QuestionLayout
        role={role}
        numbering={numbering}
        question={questionValue}
        description={descriptionValue}
        answer={handleOption()}
        required={isRequired}
        handleQuestionChange={handleQuestionChange}
        handleDescriptionChange={handleDescriptionChange}
        handleSwitchChange={handleSwitchChange}
      ></QuestionLayout>
    </div>
  );
}
