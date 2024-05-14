import {
  DashboardLoadingWrapper,
  TableLoadingSection,
} from "@/components/common";

export default function Loading() {
  return (
    <DashboardLoadingWrapper
      label="Questionnaire For You"
      state="action"
      className="gap-4"
    >
      <TableLoadingSection
        isCreator={false}
        label="Here are your personalized questionnaire(s)"
        isResponses={false}
      />
    </DashboardLoadingWrapper>
  );
}
