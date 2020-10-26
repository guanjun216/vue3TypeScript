import { SetCookie } from "@/utils/auth";
import { CookiesInfo } from "@/model/types/Enum/common";
import { userLogin as loginApi, getMenu } from "@/api/baseCenter/login/login";
import { UserInfo } from "@/model/types/interface/login/login";
import { App, reactive } from "vue";
import { notification } from "ant-design-vue";
import { Response } from "@/model/types/interface/common";
import {
  validateUsername,
  validatePassword,
  validateNewPassword,
} from "@/utils/validate.ts";
export default class LoginOperation {
  public static loginFormRules = reactive({
    account: [
      {
        required: true,
        message: "请输入账号",
        trigger: "blur",
      },
      {
        validator: validateUsername,
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        validator: validatePassword,
        trigger: "blur",
      },
    ],
    code: [
      {
        required: true,
        message: "请输入验证码",
        trigger: "blur",
      },
      {
        min: 1,
        max: 20,
        message: "长度在 1 到 20 个字符",
        trigger: "blur",
      },
    ],
    newPassword: [
      {
        required: true,
        message: "请输入密码",
        trigger: "blur",
      },
      {
        validator: validateNewPassword,
        trigger: "blur",
      },
    ],
  });
  private _app: App | undefined;
  private static _instance: LoginOperation;
  constructor(app: App | undefined) {
    if (app !== undefined) {
      this._app = app;
    }
  }
  public static getInstance(app: App | undefined) {
    if (!this._instance) {
      this._instance = new LoginOperation(app);
    }

    return this._instance;
  }
  /**
   * @param {UserInfo} 登录UserInfo对象
   * @returns {Promise<Response>} 类型为Response接口的Promise对象
   * @description 用户登录请求，请求Token数据并保存到cookies
   */
  public async userLogin(data: UserInfo): Promise<Response> {
    return await loginApi(data).then((res: Response) => {
      if (res.code === "0") {
        SetCookie(
          process.env.VUE_APP_MODE + CookiesInfo.TOKEN_NAME,
          "Bearer " + res.data.token
        );
        SetCookie(
          process.env.VUE_APP_MODE + CookiesInfo.COOKIES_NAME,
          JSON.stringify(res.data)
        );
      } else {
        let config = {
          message: res.msg,
          duration: 3,
        };
        notification.error(config);
      }
      return res;
    });
  }
  public async getMenuList(path: string): Promise<any[]> {
    let menuJson: any[] = reactive([]);
    let eocMenu: any[] = [];
    await getMenu().then((response) => {
      if (response.code === "0") {
        eocMenu = response.data;
      } else {
        notification.warning({
          message: response.msg ? response.msg : "获取菜单失败",
        });
      }
    });
    menuJson.push({
      index: "/",
      title: "首页",
    });
    if (eocMenu && eocMenu.length != 0) {
      eocMenu.forEach((item) => {
        if (item.path.indexOf("center") != -1) {
          let itemJson: any = {};
          //如果是一级目录
          if (!item.children || item.children.length <= 0) {
            itemJson = {
              index: item.path,
              title: item.name,
            };
          } else {
            itemJson = {
              index: Math.random().toString(),
              title: item.name,
              subs: [],
            };
            function menuForEach(list: any[]) {
              let result: any[] = [];
              list.forEach(
                (child: { children: any[]; path: any; name: any }) => {
                  let childJson: any = {};
                  // 判断是否有children
                  if (!child.children || child.children.length <= 0) {
                    childJson = {
                      index: child.path,
                      title: child.name,
                    };
                  } else {
                    childJson = {
                      index: Math.random().toString(),
                      title: child.name,
                      subs: [],
                    };
                    childJson.subs = menuForEach(child.children);
                  }
                  result.push(childJson);
                }
              );
              return result;
            }
            itemJson.subs = menuForEach(item.children);
          }
          menuJson.push(itemJson);
        }
      });
    }
    return menuJson;
  }
}
