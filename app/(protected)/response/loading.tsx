import {
  DashboardLoadingWrapper,
  TableLoadingSection,
} from "@/components/common";

export default function Loading() {
  return (
    <DashboardLoadingWrapper
      label="Responses"
      state="responses"
      className="gap-4"
    >
      <TableLoadingSection isCreator={true} isResponses={true} />
    </DashboardLoadingWrapper>
  );
}
