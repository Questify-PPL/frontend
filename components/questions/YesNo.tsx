"use client";

import React, { useState, ChangeEvent } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";

export function YesNo() {
  const [questionValue, setQuestionValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [options] = useState<string[]>(["Yes", "No"]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(-1);
  const [isRespondent, setIsRespondent] = useState<boolean>(false);

  const enableRespondentMode = () => {
    setIsRespondent(!isRespondent);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const { value } = event.target;
    setValue(value);
    if (event.target.tagName === "TEXTAREA") {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
  };

  return (
    <div
      style={{
        width: "30%",
        margin: "auto",
        borderColor: "#E5EEF0",
        borderWidth: "3px",
      }}
      className="border rounded-lg flex flex-col"
    >
      <div className="relative h-auto p-4 flex flex-col">
        <div className="flex flex-row items-center">
          <div
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "#E5EEF0",
              borderRadius: "20%",
            }}
            className="flex items-center justify-center"
          >
            <span style={{ color: "#32636A" }} className="font-semibold">
              1
            </span>
          </div>
          <div
            style={{
              marginLeft: "13px",
              backgroundColor: "#FAD6E8",
              height: "30px",
              width: "110px",
            }}
            className="rounded-full p-2 flex flex-row items-center"
          >
            <div className="relative">
              <div
                style={{
                  marginBottom: "2px",
                  marginLeft: "5px",
                  height: "2px",
                  width: "15px",
                  backgroundColor: "#E7328C",
                }}
                className="rounded-full"
              ></div>
              <div
                style={{
                  marginBottom: "5px",
                  marginLeft: "5px",
                  height: "2px",
                  width: "10px",
                  backgroundColor: "#E7328C",
                }}
                className="rounded-full"
              ></div>
            </div>
            <span
              style={{ marginLeft: "6px", color: "#E7328C" }}
              className="font-medium"
            >
              Yes / No
            </span>
          </div>
          {!isRespondent && (
            <div className="ml-auto flex flex-row items-center">
              <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Required
              </span>
              <Switch checked={isChecked} onClick={handleCheckboxChange} />
            </div>
          )}
        </div>
        <div
          style={{ marginLeft: "45px", fontSize: "18px" }}
          className="font-semibold pt-2"
        >
          {isRespondent ? (
            <span
              style={{
                width: "345px",
                display: "inline-block",
                wordWrap: "break-word",
              }}
            >
              {questionValue}
            </span>
          ) : (
            <textarea
              required
              value={questionValue}
              onChange={(event) => handleInputChange(event, setQuestionValue)}
              placeholder="Your question here."
              style={{
                width: "345px",
                resize: "none",
              }}
              rows={1}
            />
          )}
        </div>
        <div style={{ marginLeft: "45px", fontSize: "15px" }}>
          {isRespondent ? (
            descriptionValue.length !== 0 && (
              <div className="pt-2">
                <span
                  style={{
                    width: "345px",
                    display: "inline-block",
                    wordWrap: "break-word",
                  }}
                >
                  {descriptionValue}
                </span>
              </div>
            )
          ) : (
            <textarea
              value={descriptionValue}
              onChange={(event) =>
                handleInputChange(event, setDescriptionValue)
              }
              placeholder="Description (optional)"
              style={{
                width: "345px",
                resize: "none",
              }}
              rows={1}
            />
          )}
        </div>
        {isRespondent ? (
          <RadioGroup className="flex flex-col gap-2 ml-11 mt-2">
            {options.map((option, index) => (
              <div key={index} className="flex items-center self-stretch gap-2">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className={`h-4 w-4 rounded-full border-[1px] border-solid border-[#CDDDE1] ${index === selectedOptionIndex ? "bg-custom-blue" : "bg-white"}`}
                  onClick={() => handleOptionSelect(index)} // Set the selected option index
                  checked={index === selectedOptionIndex} // Set the checked state
                />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </RadioGroup>
        ) : null}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={enableRespondentMode}
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          >
            Switch to {isRespondent ? "Creator Mode" : "Respondent Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
