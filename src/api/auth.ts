import client from "./axiosClient";

export const loginuser = async (username: string, password: string) => {
  const res = await client.post("/auth/login", { username, password });
  console.log("res in loginuser", res);
  return res.data;
};
