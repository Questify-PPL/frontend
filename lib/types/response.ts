export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type ActionReponse = {
  message: string;
};

export type ErrorReponse = {
  statusCode: number;
  message: string;
  error: string;
};
