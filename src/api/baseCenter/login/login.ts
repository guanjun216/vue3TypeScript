import { instance as baseFetch } from "@/utils/fetch/baseFetch";
import { getCookie, SetCookie } from "@/utils/auth";
import loginDto from "@/model/DTO/login/login";
import { Response } from "@/model/interface/common";

//登录
export async function userLogin(data: loginDto): Promise<Response> {
  return await baseFetch({
    url: "/oauth/anno/token",
    method: "post",
    data: data,
    headers: {
      Authorization: "Basic enVpaG91X3VpOnp1aWhvdV91aV9zZWNyZXQ=",
    },
  }).then((res) => {
    return {} as Response;
  });
}
// export default { userLogin };
