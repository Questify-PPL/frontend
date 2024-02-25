import axios, { AxiosInstance } from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export let instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export function setupAxiosInstanceWithAuth(token: string) {
  instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
