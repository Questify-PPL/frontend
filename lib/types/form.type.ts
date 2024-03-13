export type BareForm = {
  id: string;
  title: string;
  prize: number;
  prizeType: "EVEN" | "LUCKY";
  maxWinner: number;
  createdAt: string;
  updatedAt: string;
  endedAt: string;
  onGoingParticipation: number;
  completedParticipation: number;
};
