import { Alert } from "react-native";
import client from "./axiosClient";

export const loginuser = async (username: string, password: string) => {
  const res = await client.post("/auth/login", { username, password });
  return res.data;
};
