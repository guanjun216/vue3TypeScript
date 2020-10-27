import axios, { AxiosInstance } from "axios";
import { message } from "ant-design-vue";
import { getCookie, SetCookie } from "@/utils/cookies";

// 创建axios 实例
export const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

// request 拦截器
instance.interceptors.request.use(
  (config) => {
    let isSite = process.env.VUE_APP_IS_SITE == "true" ? true : false;
    if (isSite) {
      config.headers.ShipTo = process.env.VUE_APP_SHIPTO; //国家
      config.headers.Currency = process.env.VUE_APP_CURRENCY; //币种
    }
    //添加header
    config.headers.Language = process.env.VUE_APP_LANGUAGE; //语言
    config.headers.TerminalType = process.env.VUE_APP_TERMINAL_TYPE; //终端 5代表 后台
    config.headers.Version = process.env.VUE_APP_VERSION; //版本
    // 这里可以自定义一些config 配置
    let timeout =
      config.params && config.params._timeout ? config.params._timeout : 15000;
    config.timeout = timeout;
    return config;
  },
  (error) => {
    //  这里处理一些请求出错的情况
    Promise.reject(error);
  }
);

// response 拦截器
instance.interceptors.response.use(
  (response) => {
    // 这里处理一些response 正常放回时的逻辑
    const res = response.data;
    if (
      res &&
      (res.code === 12 ||
        res.code === 900 ||
        res.code == 40001 ||
        res.msg == "未登陆")
    ) {
      console.log(1111);
      let token = getCookie(process.env.VUE_APP_MODE + "EocToken");
      if (token) {
        //2.设置token
        SetCookie(process.env.VUE_APP_MODE + "EocToken", "");
        window.location.href = "/#/login/notice";
      }
    }
    // const result: Response = {
    //   code: res.code,
    //   success: res.success,
    //   msg: res.msg,
    //   data: res.data,
    // };
    return res;
  },
  (error) => {
    let { msg } = error;
    if (msg == "Network Error") {
      msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
      msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
    }
    message.error({
      content: msg,
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
