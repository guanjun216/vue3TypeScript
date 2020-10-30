<template>
  <section class="app-main">
    <router-view class="router-wrapper" :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "AppMain",
  setup() {
    const store = useStore();
    const route = useRoute();
    const cachedViews = computed(() => {
      return store.state.tagsView.cachedViews;
    });
    const key = computed(() => {
      return route.path;
    });
    return {
      cachedViews,
      key,
    };
  },
});
</script>
<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  .router-wrapper {
    width: 100%;
    height: 100%;
  }
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - 127px);
    display: flex;
  }
}
</style>