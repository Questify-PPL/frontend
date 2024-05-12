import {
  DashboardLoadingWrapper,
  TableLoadingSection,
} from "@/components/common";

export default function Loading() {
  return (
    <DashboardLoadingWrapper
      label="Create Questionnaire"
      state="action"
      className="gap-4"
    >
      <TableLoadingSection
        isCreator={true}
        label="Drafts"
        isResponses={false}
      />
    </DashboardLoadingWrapper>
  );
}
