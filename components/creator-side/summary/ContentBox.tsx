import { useSummaryContext } from "@/lib/context/SummaryContext";
import { GraphContent } from "./GraphContent";
import { QuestionsContent } from "./QuestionsContent";

export function ContentBox() {
  const { activeTab } = useSummaryContext();

  return (
    <div className="flex p-5 flex-col items-center flex[1_0_0] gap-3 self-stretch border border-solid border-[#E5EEF0] rounded-sm">
      {activeTab === "summary" && <GraphContent />}
      {activeTab === "question" && <QuestionsContent />}
    </div>
  );
}
