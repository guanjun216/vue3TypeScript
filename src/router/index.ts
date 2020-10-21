import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/loginView/index.vue";
import { getCookie } from "@/utils/auth";
import { CookiesInfo } from "@/model/Enum/common";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/home/Home"),
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
