<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div :class="needTagsView ? 'hasTagsView' : ''" class="main-container">
      <div :class="fixedHeader ? 'fixed-header' : ''">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { mapState, useStore } from "vuex";
import { AppMain, Navbar, Sidebar, TagsView } from "./components/index";
import Vue from "vue";
export default defineComponent({
  name: "Layout",
  components: { AppMain, Navbar, Sidebar, TagsView },
  setup() {
    const store = useStore();
    const { sidebar, device, needTagsView, fixedHeader } = store.getters;
    const classObj = computed(() => {
      let result: any = {
        hideSidebar: sidebar.opened,
        openSidebar: sidebar.opened,
        withoutAnimation: sidebar.withoutAnimation,
        mobile: device === "mobile",
      };
      return result;
    });
    const handleClickOutside = () => {
      store.dispatch("app/closeSideBar", { withoutAnimation: false });
    };
    return {
      classObj,
      handleClickOutside,
      device,
      sidebar,
      needTagsView,
      fixedHeader,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/index.scss";
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
</style>