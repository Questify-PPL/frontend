"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Switch } from "../ui/switch";
import { Checkbox } from "@radix-ui/react-checkbox";

export function Checkboxes() {
  const [questionValue, setQuestionValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([""]);
  const [selectedOptionIndices, setSelectedOptionIndices] = useState<number[]>(
    [],
  );
  const [isRespondent, setIsRespondent] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  const enableRespondentMode = () => {
    setIsRespondent(!isRespondent);
  };

  useEffect(() => {
    setOptions([""]);
  }, []);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOptionToggle = (index: number) => {
    setSelectedOptionIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const addNewOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    setSelectedOptionIndices((prevIndices) =>
      prevIndices.filter((i) => i !== index),
    );
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


  const checkboxTemplate = (
    <div key="template" className="flex items-center self-stretch gap-2 ml-6">
      <input
        type="checkbox"
        className="ml-6"
        checked={false}
        onChange={() => {}}
      />
      <input
        style={{ borderBottom: "none" }}
        type="text"
        placeholder="Add Option"
        className="text-sm outline-none border-b border-gray-300 focus:border-primary"
        onClick={addNewOption}
      />
    </div>
  );

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
                fontSize: `${minWidth > 430 ? 16 : minWidth > 400 ? 14 : minWidth > 365 ? 12 : 10}px`,
              }}
              
              className="font-medium"
            >
              Checkboxes
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
        </div>
        <div
          style={{
            marginLeft: "45px",
            fontSize: `${minWidth > 430 ? 15 : minWidth > 400 ? 14 : minWidth > 365 ? 13 : 12}px`,
          }}
        >

          <textarea
            value={descriptionValue}
            onChange={(event) => handleInputChange(event, setDescriptionValue)}
            placeholder="Description (optional)"
            style={{
              width: `${minWidth * 0.73}px`,
              resize: "none",
            }}
            rows={1}
          />
        </div>

        <div>
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center self-stretch gap-2 ml-6"
            >
              <input
                type="checkbox"
                className="ml-6"
                checked={selectedOptionIndices.includes(index)}
                onChange={() => handleOptionToggle(index)}
              />

              <Checkbox
                checked={selectedOptionIndices.includes(index)}
                onChange={() => handleOptionToggle(index)}
              />
              <input
                style={{ borderBottom: "none" }}
                type="text"
                value={option}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="text-sm outline-none border-b border-gray-300 focus:border-primary border-b-0"
              />
              {!isRespondent && (
                <button onClick={() => deleteOption(index)}>&times;</button>
              )}
            </div>
          ))}
          {!isRespondent && checkboxTemplate}
        </div>
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
