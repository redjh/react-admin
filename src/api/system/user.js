import axios from "@/api/network";
export const getUsers = params => {
  return axios("/user/list", { method: "get", params });
};

export const addUser = params => {
  return axios("/user", { method: "post", params });
};
export const updateUser = params => {
  return axios("/user", { method: "put", params });
};

export const deleteUser = params => {
  return axios(`/user/${params}`, { method: "delete" });
};

export const getUserById = params => {
  return axios(`/user/${params}`, { method: "get" });
};
export const getUserAuthorities = params => {
  return axios("/user/authorities", { method: "get", params });
};
