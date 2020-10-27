<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
    <a-breadcrumb-item v-for="(item, index) in levelList.list" :key="index">
      <span
        :key="item.path"
        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
        class="no-redirect"
        >{{ item.meta.title }}</span
      >
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from "vue";
import { compile } from "path-to-regexp";
import { RouteLocationMatched, useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Breadcrumb",
  setup() {
    let levelList = reactive({ list: [] });
    const route = useRoute();
    const router = useRouter();
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
    watch(
      () => route.path,
      (newValue, oldValue) => {
        if (newValue.startsWith("/redirect/")) {
          return;
        }
        getBreadcrumb();
      }
    );
    const getBreadcrumb = () => {
      // levelList
      levelList.list = (route.matched.map((item) => {
        return item;
      }) as unknown) as never[];
    };
    getBreadcrumb();
    return {
      levelList,
    };
  },
});
</script>
<style lang="scss" scoped>
.ant-breadcrumb {
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