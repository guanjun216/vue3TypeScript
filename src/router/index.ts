import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/loginView/index.vue";
import { getCookie } from "@/utils/cookies";
import Layout from "../components/layout/index.vue";
import { CookiesInfo } from "@/model/types/Enum/common";
import gmv from "@/router/gmv/index";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        component: () => import("@/views/home/Home"),
        name: "Home",
        meta: {
          title: "首页",
          icon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
  },
  ...gmv,
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let loginInfoJson: string = getCookie(
    process.env.VUE_APP_MODE + CookiesInfo.COOKIES_NAME
  );
  let loginInfo = loginInfoJson ? JSON.parse(loginInfoJson) : "";
  if (to.name !== "Login" && loginInfo === "") {
    next({ path: "/login", name: "Login" });
  } else {
    next();
  }
});
export default router;
