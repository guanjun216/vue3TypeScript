import { instance as baseFetch } from "@/utils/fetch/baseFetch";
import { SetCookie } from "@/utils/auth";
import loginDto from "@/model/DTO/login/login";
import { Response } from "@/model/interface/common";
import { CookiesInfo } from "@/model/Enum/common";
// import { message, notification } from "ant-design-vue";
/**
 * @param {loginDto} 登录DTO对象
 * @returns {Promise<Response>} 类型为Response接口的Promise对象
 * @description 用户登录请求，请求Token数据并保存到cookies
 */
async function userLogin(data: loginDto): Promise<Response> {
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
    if (result.code === "0") {
      SetCookie(
        process.env.VUE_APP_MODE + CookiesInfo.TOKEN_NAME,
        "Bearer " + res.data.token
      );
      SetCookie(
        process.env.VUE_APP_MODE + CookiesInfo.COOKIES_NAME,
        JSON.stringify(res.data)
      );
    } else {
      let msg = res.msg ? res.msg : "登录失败";
      // message.error({ content: msg, duration: 5000 });
      // notification.error({
      //   message: "错误",
      //   description: msg,
      // });
    }
    return result;
  });
}

export { userLogin };
