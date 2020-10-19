import { instance as baseFetch } from "@/utils/fetch/baseFetch";
import { getCookie, SetCookie } from "@/utils/auth";
import loginDto from "@/model/DTO/login/login";
import { Response } from "@/model/interface/common";

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
      code: res.code,
      success: res.success || res.isSuccess,
      msg: res.msg,
      data: res.data,
    };
    return result;
  });
}

export { userLogin };
