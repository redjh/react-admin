import axios from "@/api/network";
export const getResources = params => {
  return axios("/resource/list", { method: "get", params });
};

export const addResource = params => {
  return axios("/resource", { method: "post", params });
};
export const updateResource = params => {
  return axios("/resource", { method: "put", params });
};

export const deleteResource = params => {
  return axios(`/resource/${params}`, { method: "delete" });
};

export const getResourceById = params => {
  return axios(`/resource/${params}`, { method: "get" });
};
