<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <a-breadcrumb-item
        v-for="(item, index) in levelList.list"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <span v-else>{{ item.meta.title }}</span>
      </a-breadcrumb-item>
    </transition-group>
  </a-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import pathToRegexp from "path-to-regexp";
import { createRouter, RouteLocationMatched, useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const levelList = reactive({ list: [] });
    const route = useRoute();
    const isDashboard = (route: RouteLocationMatched) => {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        String(name).trim().toLocaleLowerCase() ===
        "Dashboard".toLocaleLowerCase()
      );
    };
    const getBreadcrumb = () => {
      // only show routes with meta.title
      let matched = route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!isDashboard(first)) {
        //   let item:RouteLocationMatched = route;
        matched = (([
          { path: "/dashboard", meta: { title: "首页" } },
        ] as unknown) as RouteLocationMatched[]).concat(matched);
      }

      levelList.list = (matched
        .filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        )
        .map((item) => {
          return item;
        }) as unknown) as never[];
    };
    return {
      levelList,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-breadcrumb.a-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>