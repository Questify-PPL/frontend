import React from "react";
import FormLeftMenu from "@/components/creator-side/FormLeftMenu";

export default function Form() {
  const [menuState, setMenuState] = React.useState("opening");

  const openOpening = () => {
    console.log("clicked opening");
    setMenuState("opening");
  };

  const openContents = () => {
    console.log("clicked contents");
    setMenuState("contents");
  };

  const openEnding = () => {
    console.log("clicked ending");
    setMenuState("ending");
  };

  return (
    <main className="flex flex-col h-screen w-full">
      <FormLeftMenu
        state={menuState as "opening" | "contents" | "ending" | undefined}
        onClickOpening={openOpening}
        onClickContents={openContents}
        onClickEnding={openEnding}
        openingChildren={<div>Opening</div>}
        contentsChildren={<div>Contents</div>}
        endingChildren={<div>Ending</div>}
      ></FormLeftMenu>
    </main>
  );
}
