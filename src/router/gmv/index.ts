import Layout from "@/components/layout/index.vue";
const routes = [
  {
    path: "/gmv",
    name: "GMV",
    component: Layout,
    redirect: "/settle_center/today",
    meta: {
      title: "GMV",
    },
    children: [
      {
        path: "today",
        component: () => import("@/views/gmvViews/dayGmv.tsx"),
        name: "GMV",
        meta: {
          title: "今日GMV",
        },
      },
      {
        path: "month",
        component: () => import("@/views/gmvViews/monthGmv.tsx"),
        name: "monthGMV",
        meta: {
          title: "当月GMV",
        },
      },
      {
        path: "total",
        component: () => import("@/views/gmvViews/totalGmv.tsx"),
        name: "totalGMV",
        meta: {
          title: "累计GMV",
        },
      },
    ],
  },
];
export default routes;
