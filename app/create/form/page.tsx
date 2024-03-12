"use client";

import React, { useState } from "react";
import FormLeftMenu from "@/components/creator-side/create/FormLeftMenu";
import FormRightMenu from "@/components/creator-side/create/FormRightMenu";
import FormUpperMenu from "@/components/creator-side/create/FormUpperMenu";
import FormLowerMenu from "@/components/creator-side/create/FormLowerMenu";
import QuestionToggle from "@/components/creator-side/create/QuestionToggle";
import { UserDropdownMenu } from "@/components/dashboard";

const Form = () => {
  const [leftMenuState, setLeftMenuState] = useState("opening");
  const [rightMenuState, setRightMenuState] = useState("question");
  const [isMobile, setIsMobile] = useState(true);

  const handleLeftMenuChange = (menuState: React.SetStateAction<string>) => {
    setLeftMenuState(menuState);
  };

  const handleRightMenuChange = (menuState: React.SetStateAction<string>) => {
    setRightMenuState(menuState);
  };

  const handleBack = () => {
    console.log("Back");
  };

  const handleSave = () => {
    console.log("Save");
  };

  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <UserDropdownMenu />

      <div className="flex flex-row w-full h-full gap-4 p-5">
        <FormLeftMenu
          className="hidden md:flex md:w-[20%]"
          state={leftMenuState}
          onClickOpening={() => handleLeftMenuChange("opening")}
          onClickContents={() => handleLeftMenuChange("contents")}
          onClickEnding={() => handleLeftMenuChange("ending")}
          openingChildren={
            <div className="flex flex-col w-full">
              <QuestionToggle
                isActive={false}
                numbering={1}
                questionType="Short Text"
                question="What's your favorite Oreo flavor?"
              ></QuestionToggle>
              <QuestionToggle
                isActive={true}
                numbering={2}
                questionType="Picture Choice"
                question="What's your favorite Oreo packaging?"
              ></QuestionToggle>
            </div>
          }
          contentsChildren={<div>Contents Children</div>}
          endingChildren={<div>Ending Children</div>}
        />

        <div className="flex flex-col w-[60%] h-full gap-4">
          <FormUpperMenu
            onBack={handleBack}
            onSave={handleSave}
            QRETitle="Oreo Satisfaction: User Feedback in Indonesia"
          />
          <span className="flex bg-accent w-full h-full rounded-md"></span>
          <FormLowerMenu onChange={handleMobileToggle} isMobile={isMobile} />
        </div>

        <FormRightMenu
          className="hidden md:flex md:w-[20%]"
          state={rightMenuState}
          onClickQuestion={() => handleRightMenuChange("question")}
          onClickDesign={() => handleRightMenuChange("design")}
          onClickLogic={() => handleRightMenuChange("logic")}
          onClickPreview={() => handleRightMenuChange("preview")}
          onClickPublish={() => handleRightMenuChange("publish")}
          questionChildren={<div>Question Children</div>}
          designChildren={<div>Design Children</div>}
          logicChildren={<div>Logic Children</div>}
          previewChildren={<div>Preview Children</div>}
          publishChildren={<div>Publish Children</div>}
        />
      </div>
    </main>
  );
};

export default Form;
