import { SetCookie } from "@/utils/auth";
import loginDto from "@/model/DTO/login/login";
import { CookiesInfo } from "@/model/Enum/common";
import { userLogin as loginApi, getMenu } from "@/api/baseCenter/login/login";
import { UserInfo } from "@/model/interface/login/login";
import { App, reactive } from "vue";
import { notification } from "ant-design-vue";
import { Response } from "@/model/interface/common";

export default class LoginOperation {
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
    let ld: loginDto = new loginDto();
    ld.account = data.username;
    ld.password = data.password;
    ld.key = data.key;
    ld.code = data.validateCode;
    return await loginApi(ld).then((res: Response) => {
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
    //如果是总中心就取第一级
    if (path.indexOf("center") == -1) {
      menuJson.push([
        {
          index: "/",
          title: "首页",
        },
      ]);
      if (eocMenu && eocMenu.length != 0) {
        eocMenu.forEach((item) => {
          if (item.path.indexOf("center") != -1) {
            let itemJson = {
              index: item.path,
              title: item.name,
            };
            menuJson.push(itemJson);
          }
        });
      }
    } else {
      if (eocMenu && eocMenu.length != 0) {
        //寻找当前中心
        let center = "";
        path.indexOf("marketing_center") != -1 && (center = "marketing_center");
        path.indexOf("supplier_center") != -1 && (center = "supplier_center");
        path.indexOf("order_center") != -1 && (center = "order_center");
        path.indexOf("user_center") != -1 && (center = "user_center");
        path.indexOf("pay_center") != -1 && (center = "pay_center");
        path.indexOf("help_center") != -1 && (center = "help_center");
        path.indexOf("review_center") != -1 && (center = "review_center");
        path.indexOf("settle_center") != -1 && (center = "settle_center");
        path.indexOf("message_center") != -1 && (center = "message_center");

        //选出正确的中心
        let trueCenterData: any[] = [];
        eocMenu.forEach((item) => {
          if (item.path.indexOf(center) != -1) {
            //选出这个中心
            trueCenterData = item.children ? item.children : [];
          }
        });

        trueCenterData.forEach((item) => {
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
            item.children.forEach(
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
                  child.children.forEach((child2: { path: any; name: any }) => {
                    childJson.subs.push({
                      index: child2.path,
                      title: child2.name,
                    });
                  });
                }
                itemJson.subs.push(childJson);
              }
            );
          }
          menuJson.push(itemJson);
        });
      }
    }
    return menuJson;
  }
}
