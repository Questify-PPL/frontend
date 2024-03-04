"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { Switch } from "../ui/switch";

export function ShortText() {
  const [questionValue, setQuestionValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isRespondent, setIsRespondent] = useState(false); // TO BE DELETED

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // TO BE DELETED
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
              backgroundColor: "#D2E4E3",
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
                  backgroundColor: "#1D7973",
                }}
                className="rounded-full"
              ></div>
              <div
                style={{
                  marginBottom: "5px",
                  marginLeft: "5px",
                  height: "2px",
                  width: "10px",
                  backgroundColor: "#1D7973",
                }}
                className="rounded-full"
              ></div>
            </div>
            <span
              style={{
                marginLeft: `${minWidth > 320 ? 6 : 9}px`,
                color: "#1D7973",
                fontSize: `${minWidth > 430 ? 16 : minWidth > 400 ? 14 : minWidth > 365 ? 12 : 10}px`,
              }}
              className="font-medium"
            >
              Short Text
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
        {isRespondent && (
          <div
            style={{
              marginLeft: "45px",
              fontSize: `${minWidth > 430 ? 15 : minWidth > 400 ? 14 : minWidth > 365 ? 13 : 12}px`,
            }}
            className="pt-2"
          >
            <input
              {...(isChecked && { required: true })}
              type="text"
              value={answerValue}
              onChange={(event) => handleInputChange(event, setAnswerValue)}
              placeholder="Type your answer here"
              style={{
                width: `${minWidth * 0.73}px`,
              }}
              maxLength={30}
            />
          </div>
        )}
      </div>
      {/* TO BE DELETED */}
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
      {/* ============= */}
    </div>
  );
}