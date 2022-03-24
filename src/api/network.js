import { message, Modal } from "antd";
import axios from "axios";
import logout from "@/utils/logout";
import { getToken } from "@/utils/memory";

const instance = axios.create({ baseURL: "/api", timeout: 1000 });
// 请求拦截
instance.interceptors.request.use(
  function (config) {
    config.headers.common["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截
instance.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (data.status !== 200) {
      message.error(data.message);
    }
    return data;
  },
  function (error) {
    if (error.response) {
      const { data, status } = error.response;
      if (status === 401) {
        handle401();
      } else {
        message.error(data);
      }
    } else if (error.request) {
      message.error("网络连接失败！");
    } else {
      message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default function network(url, config = {}) {
  const { method, params, data } = config;
  config =
    method === undefined || method.toLowerCase() === "get"
      ? { ...config, params: params ?? data, data: undefined }
      : { ...config, data: data ?? params, params: undefined };
  return instance(url, config);
}
export function getAxios(config) {
  return !config ? instance : axios.create(config);
}

function handle401() {
  const Title = () => <span style={{ fontWeight: 700 }}>提示</span>;
  Modal.warning({
    title: <Title />,
    content: "登录已过期，请重新登录！",
    okText: "确定",
    maskClosable: false,
    keyboard: false,
    onOk() {
      logout();
    },
  });
}
