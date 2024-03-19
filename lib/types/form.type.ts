export type BareForm = {
  id: string;
  title: string;
  prize: number;
  prizeType: "EVEN" | "LUCKY";
  maxWinner: number;
  createdAt: string;
  updatedAt: string;
  endedAt: string;
  ongoingParticipation: number;
  completedParticipation: number;
};

export type FetchListForm = {
  statusCode: number;
  message: string;
  data: BareForm[];
};

export type FetchIndividualForm = {
  statusCode: number;
  message: string;
  data: BareForm;
};
