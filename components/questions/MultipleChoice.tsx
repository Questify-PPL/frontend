"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { RadioGroup } from "../ui/radio-group";
import { RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";

export function MultipleChoice() {
  const [questionValue, setQuestionValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([""]); // Initialize with two empty options
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

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOptionIndex(index);
  };

  const addNewOption = () => {
    if (!isRespondent) {
      setOptions((prevOptions) => [...prevOptions, ""]);
    }
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    if (selectedOptionIndex === index) {
      setSelectedOptionIndex(-1); // Reset selected option if it's deleted
    } else if (selectedOptionIndex > index) {
      setSelectedOptionIndex(selectedOptionIndex - 1); // Adjust selected index if necessary
    }
  };

  const lastOptionRef = useRef<HTMLInputElement>(null);

  const handleInputClick = (index: number) => {
    if (index === options.length - 1) {
      const newValue = lastOptionRef.current?.value || "";
      addNewOption();
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
        readOnly={isRespondent}
        onClick={() => handleInputClick(options.length - 1)}
      />
    </div>
  );

  const [minWidth, setMinWidth] = useState(
    typeof window !== "undefined"
      ? Math.min(455, window.innerWidth * 0.8)
      : 455,
  );

  useEffect(() => {
    const handleResize = () => {
      setMinWidth(Math.min(455, window.innerWidth * 0.8));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div
      style={{
        width: `${minWidth}px`,
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
              width: `${minWidth * 0.2857}px`,
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
              style={{
                marginLeft: `${minWidth > 320 ? 6 : 9}px`,
                color: "#E7328C",
                fontSize: `${minWidth > 430 ? 12 : minWidth > 400 ? 10 : minWidth > 365 ? 12 : 10}px`,
              }}
              
              className="font-medium"
            >
              Multiple Choice
            </span>
          </div>
          {!isRespondent && (
            <div className="ml-auto flex flex-row items-center">
              <span
                style={{
                  fontSize: `${minWidth > 430 ? 14 : minWidth > 400 ? 12 : 10}px`,
                  marginRight: `${minWidth > 430 ? 12 : minWidth > 400 ? 10 : 8}px`,
                }}
                className="text-sm font-medium text-gray-900 dark:text-gray-300"
              >

                Required
              </span>
              <Switch checked={isChecked} onClick={handleCheckboxChange} />
            </div>
          )}
        </div>
        <div
          style={{
            marginLeft: "45px",
            fontSize: `${minWidth > 430 ? 18 : minWidth > 400 ? 17 : minWidth > 365 ? 16 : 15}px`,
          }}
          
          className="font-semibold pt-2"
        >
          {isRespondent ? (
            <span
              style={{
                width: `${minWidth * 0.73}px`,
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
                width: `${minWidth * 0.73}px`,
                resize: "none",
              }}
              rows={1}
            />
          )}
        </div>
        <div
          style={{
            marginLeft: "45px",
            fontSize: `${minWidth > 430 ? 15 : minWidth > 400 ? 14 : minWidth > 365 ? 13 : 12}px`,
          }}
        >

          {isRespondent ? (
            descriptionValue.length != 0 && (
              <div className="pt-2">
                <span
                  style={{
                    width: `${minWidth * 0.73}px`,
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
                width: `${minWidth * 0.73}px`,
                resize: "none",
              }}
              rows={1}
            />
          )}
        </div>

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
              <input
                style={{ borderBottom: "none", width: '170px' }}
                type="text"
                value={option}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="text-sm outline-none border-b border-gray-300 focus:border-primary border-b-0"
                readOnly={isRespondent}
              />
              {!isRespondent && (
                <button onClick={() => deleteOption(index)}>&times;</button>
              )}
            </div>
          ))}
          {!isRespondent && radioGroupItemTemplate}
        </RadioGroup>

        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={enableRespondentMode}
            className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
          >
            Switch to
            {isRespondent ? " Creator Mode" : " Respondent Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
