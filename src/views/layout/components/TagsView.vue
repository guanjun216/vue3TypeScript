<template>
  <div ref="scrollPane" id="tags-view-container" class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </div>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        Close
      </li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue, {
  computed,
  ComputedRef,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const path = require("path");
export default defineComponent({
  name: "TagsView",
  setup() {
    const visible = ref(false);
    const top = ref(0);
    const left = ref(0);
    let selectedTag = reactive({});
    let affixTags: any[] = reactive([]);

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const instance = getCurrentInstance();

    // const visitedViews = computed(() => {
    //   return store.state.tagsView.visitedViews;
    // });
    const { visitedViews } = store.getters;
    const routes = computed(() => {
      return [];
    });
    const isActive = (r: any) => {
      return r.path === route.path;
    };
    const isAffix = (tag: any) => {
      return tag.meta && tag.meta.affix;
    };
    const filterAffixTags = (rs: ComputedRef<never[]>, basePath = "/") => {
      let tags: any[] = [];
      rs.value.forEach((r: any) => {
        if (r.meta && r.meta.affix) {
          const tagPath = path.resolve(basePath, r.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: r.name,
            meta: { ...r.meta },
          });
        }
        if (r.children) {
          const tempTags = filterAffixTags(r.children, r.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    };
    const initTags = () => {
      let at = (affixTags = filterAffixTags(routes));
      for (const tag of at) {
        if (tag.name) {
          store.dispatch("tagsView/addVisitedView", tag);
        }
      }
    };
    const addTags = () => {
      const { name } = route;
      if (name) {
        store.dispatch("tagsView/addView", route);
      }
      return false;
    };
    const moveToCurrentTag = () => {
      const tags: any = instance?.refs.tag;
      nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === route.path) {
            // instance?.refs.scrollPane?.moveToTarget(tag);
            if (tag.to.fullPath !== route.fullPath) {
              store.dispatch("tagsView/updateVisitedView", route);
            }
            break;
          }
        }
      });
    };
    const refreshSelectedTag = (view: any) => {
      store.dispatch("tagsView/delCachedView", view).then(() => {
        const { fullPath } = view;
        nextTick(() => {
          router.replace({
            path: "/redirect" + fullPath,
          });
        });
      });
    };
    const closeSelectedTag = (view: any) => {
      store.dispatch("tagsView/delView", view).then(({ visitedViews }) => {
        if (isActive(view)) {
          toLastView(visitedViews, view);
        }
      });
    };
    const closeOthersTags = () => {
      router.push(selectedTag);
      store.dispatch("tagsView/delOthersViews", selectedTag).then(() => {
        moveToCurrentTag();
      });
    };
    const closeAllTags = (view: any) => {
      store.dispatch("tagsView/delAllViews").then(({ visitedViews }) => {
        if (affixTags.some((tag) => tag.path === view.path)) {
          return;
        }
        toLastView(visitedViews, view);
      });
    };
    const toLastView = (visitedViews: any, view: any) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        router.push(latestView.fullPath);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          router.replace({ path: "/redirect" + view.fullPath });
        } else {
          router.push("/");
        }
      }
    };
    const openMenu = (tag: any, e: any) => {
      const el: any = instance?.refs.scrollPane;
      // instance?.appContext.config.globalProperties

      const menuMinWidth = 105;
      const offsetLeft = el.getBoundingClientRect().left; // container margin left
      const offsetWidth = el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const leftNum = e.clientX - offsetLeft + 15; // 15: margin right

      if (leftNum > maxLeft) {
        left.value = maxLeft;
      } else {
        left.value = leftNum;
      }

      top.value = e.clientY;
      visible.value = true;
      selectedTag = tag;
    };
    const closeMenu = () => {
      visible.value = false;
    };
    watch(
      () => route,
      (oldValue, newValue) => {}
    );
    watch(
      () => visible.value,
      (oldValue, newValue) => {}
    );
    onMounted(() => {
      initTags();
      addTags();
    });
    return {
      visible,
      top,
      left,
      selectedTag,
      affixTags,
      isAffix,
      visitedViews,
      isActive,
    };
  },
});
</script>
<style lang="scss" scoped>
//reset element css of el-icon-close
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #f6f6f6;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #46a6ff;
        color: #fff;
        border-color: #46a6ff;
        user-select: none;
        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.tags-view-wrapper {
  width: 100%;
  display: flex;
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
