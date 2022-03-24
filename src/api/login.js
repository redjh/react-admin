import axios from "@/api/network";
export const login = params => {
  return axios("/login", { method: "post", params });
};

export const logout = () => {
  return axios("/logout", { method: "get" });
};
