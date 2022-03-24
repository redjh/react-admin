import axios from "@/api/network";
export const getRoles = params => {
  return axios("/role/list", { method: "get", params });
};

export const addRole = params => {
  return axios("/role", { method: "post", params });
};
export const updateRole = params => {
  return axios("/role", { method: "put", params });
};

export const deleteRole = params => {
  return axios(`/role/${params}`, { method: "delete" });
};

export const getRoleById = params => {
  return axios(`/role/${params}`, { method: "get" });
};
