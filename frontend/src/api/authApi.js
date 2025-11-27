import axiosClient from "./axiosClient";

export async function loginRequest(credentials) {
  const res = await axiosClient.post("/login", credentials);
  return res.data;
}
