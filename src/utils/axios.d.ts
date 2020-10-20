import * as axios from "axios";

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}
import * as VueRouter from "vue-router";
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter;
  }
}
