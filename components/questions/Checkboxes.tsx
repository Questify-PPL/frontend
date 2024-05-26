"use client";

import { useQuestionnaireContext } from "@/lib/hooks/useQuestionnaireContext";
import { updateAnswers, updateQuestionnaire } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import QuestionLayout from "./QuestionLayout";

interface CheckboxProps {
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

export function Checkboxes(checkboxProps: Readonly<CheckboxProps>) {
  const { questionnaire, answers, setQuestionnaire, setAnswers } =
    useQuestionnaireContext();
  const { role, numbering, questionId } = checkboxProps;
  const {
    isRequired,
    question,
    description,
    choice = [],
    answer = [],
    status = true,
  } = checkboxProps;

  const [questionValue, setQuestionValue] = useState<string>(question || "");
  const [descriptionValue, setDescriptionValue] = useState<string>(
    description ?? "",
  );
  const [requiredValue, setRequiredValue] = useState(isRequired);
  const [options, setOptions] = useState<string[]>(choice || []);
  const [selectedOptionsValues, setSelectedOptionsValues] =
    useState<string[]>(answer);

  const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionValue(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionToggle = (optionValue: string) => {
    if (selectedOptionsValues.includes(optionValue)) {
      setSelectedOptionsValues(
        selectedOptionsValues.filter((option) => option !== optionValue),
      );
    } else {
      setSelectedOptionsValues([...selectedOptionsValues, optionValue]);
    }
  };

  const handleSwitchChange = () => {
    setRequiredValue(!requiredValue);
  };

  const addNewOption = () => {
    if (role === "CREATOR") {
      setOptions((prevOptions) => [...prevOptions, ""]);
    }
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    setSelectedOptionsValues((prevSelected) =>
      prevSelected.filter((_, i) => i !== index),
    );
  };

  const handleOption = () => {
    return (
      <div>
        {options.map((option, index) => (
          <div
            key={`option-${index}`}
            className="flex items-center self-stretch gap-2"
          >
            <input
              type="checkbox"
              className=""
              checked={selectedOptionsValues.includes(option)}
              onChange={() => handleOptionToggle(option)}
              disabled={!status}
            />
            <input
              style={{ borderBottom: "none" }}
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
        {role === "CREATOR" && (
          <div className="flex items-center self-stretch gap-2">
            <input
              type="checkbox"
              className=""
              checked={false}
              onChange={() => {}}
            />
            <input
              style={{ borderBottom: "none" }}
              type="text"
              placeholder="Add Option"
              className="text-sm outline-none border-b border-gray-300 focus:border-primary"
              onClick={addNewOption}
              readOnly
            />
          </div>
        )}
      </div>
    );
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
  }, [requiredValue, questionValue, descriptionValue, options]);

  useEffect(() => {
    const updatedAnswers = updateAnswers(
      answers,
      questionId,
      selectedOptionsValues,
    );

    setAnswers(updatedAnswers);
  }, [selectedOptionsValues]);

  return (
    <div className="w-[84%] flex flex-col gap-4">
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
      />
    </div>
  );
}
