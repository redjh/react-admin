const store = require("store");
const memory = new Map();

const set = (key, value, persistent = false) => {
  persistent && store.set(key, value); // 持久化
  memory.set(key, value);
};
const get = key => (memory.get(key) ? memory.get(key) : store.get(key));
// token
export const setToken = token => set("token", token, true);
export const getToken = () => get("token");
export const setUser = user => set("user", user, true);
export const getUser = () => get("user");

// authorities(按钮权限)
export const setAuthorities = authorities => set("authorities", authorities);
export const getAuthorities = () => get("authorities");

export const setData = (key, data) => set(key, data, true);
export const getData = key => get(key);

export const clearMemory = () => {
  store.clearAll();
  memory.clear();
};
