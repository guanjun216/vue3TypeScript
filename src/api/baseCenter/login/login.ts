import { instance as baseFetch } from "@/api/base/baseFetch";
import { getCookie } from "@/utils/cookies";
import { Response } from "@/model/types/interface/common";
import { UserInfo } from "@/model/types/interface/login/login";

/**
 * @param {UserInfo} 登录DTO对象
 * @returns {Promise<Response>} 类型为Response接口的Promise对象
 * @description 用户登录请求，请求Token数据并保存到cookies
 */
async function userLogin(data: UserInfo): Promise<Response> {
  return await baseFetch({
    url: "/oauth/anno/token",
    method: "post",
    data: data,
    headers: {
      Authorization: "Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=",
    },
  }).then((res) => {
    const result: Response = {
      code: String(res.code),
      success: res.success || res.isSuccess,
      msg: res.msg.toString(),
      data: res.data,
    };
    return result;
  });
}
/**
 * @returns {Promise<Response>} 类型为Response接口的Promise对象
 * @description 获取当前用户的菜单列表
 */
async function getMenu(): Promise<Response> {
  return await baseFetch({
    url: "/oauth/menu/router",
    method: "get",
    headers: {
      token: getCookie(process.env.VUE_APP_MODE + "EocToken"),
      tenant: "MDAwMA==",
    },
  }).then((res) => {
    const result: Response = {
      code: String(res.code),
      success: res.success || res.isSuccess,
      msg: res.msg.toString(),
      data: res.data,
    };
    return result;
  });
}
export { userLogin, getMenu };
