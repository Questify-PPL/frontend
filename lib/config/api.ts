import axios, { AxiosInstance } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export let instance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export function setupAxiosInstanceWithAuth(token: string) {
  instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
