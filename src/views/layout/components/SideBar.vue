<template>
  <div class="aside-wrapper">
    <div class="sidebar-top">
      <img src="@/assets/img/logoHorizontal.png" alt="logo" width="120" />
    </div>
    <div class="aside" v-if="isBaseMenu">
      <a-menu
        class="el-menu-vertical"
        :default-active="defaultActive"
        :unique-opened="true"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="item in items" :key="item.index">
          <a-menu-item :index="item.index">
            <a href="javascript:void(0)" @click="goThis(item.index)">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </a>
          </a-menu-item>
        </template>
      </a-menu>
    </div>
    <div class="aside" v-else>
      <a-menu
        class="el-menu-vertical"
        :default-active="defaultActive"
        :unique-opened="true"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        router
        :collapse-transition="false"
        mode="vertical"
      >
        <a-menu-item key="back">
          <a href="javascript:void(0)" @click="goThis('/')">
            <span>返回</span>
          </a>
        </a-menu-item>
        <template v-for="item in items">
          <template v-if="item.subs">
            <a-sub-menu :index="item.index" :key="item.index">
              <template v-slot:title>
                <i :class="item.icon" v-show="iconFlag"></i>
                <span>{{ item.title }}</span>
              </template>
              <template>
                <template v-for="(subItem, index) in item.subs">
                  <a-sub-menu
                    v-if="subItem.subs"
                    :index="subItem.title"
                    :key="index"
                  >
                    <template v-slot:title>
                      <i :class="subItem.icon"></i>
                      <span>{{ subItem.title }}</span>
                    </template>
                    <!--三级菜单-->
                    <a-menu-item
                      v-for="(threeItem, i) in subItem.subs"
                      :key="i"
                      :index="threeItem.index"
                      >{{ threeItem.title }}</a-menu-item
                    >
                  </a-sub-menu>
                  <a-menu-item
                    v-else
                    :index="subItem.index"
                    :key="subItem.index"
                    >{{ subItem.title }}</a-menu-item
                  >
                </template>
              </template>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import variables from "@/assets/styles/variables.scss";
import { User } from "@/model/interface/common";
import { IsPC } from "@/utils/index";
import { getCookie } from "@/utils/auth";
export default defineComponent({
  name: "Sidebar",
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const router = useRouter();
    let token = getCookie(process.env.VUE_APP_MODE + "EocToken");
    if (!token) {
      router.push({
        path: "/login",
      });
    }
    const route = useRoute();
    const items = reactive([]);
    const iconFlag = ref(false);
    if (IsPC()) {
      iconFlag.value = false;
    } else {
      iconFlag.value = true;
    }
    const isBaseMenu = ref(false);
    isBaseMenu.value = route.path.indexOf("center") == -1 ? true : false;
    let loginInfo =
      JSON.parse(getCookie(process.env.VUE_APP_MODE + "EocLoginInfo")) || {};
    // console.log(loginInfo);
    const user: User = {
      userId: loginInfo.userId,
      account: loginInfo.account,
      avatar:
        loginInfo.avatar ||
        "https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg",
      name: loginInfo.name,
    };

    const defaultActive = computed(() => {
      return route.path && route.path != "/" ? route.path : "/dashboard";
    });
    const goThis = (path: string) => {
      location.href = "#" + path;
      location.reload();
    };
    return {
      user,
      items,
      iconFlag,
      isBaseMenu,
      defaultActive,
      variables,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.aside-wrapper {
  height: 100%;

  .sidebar-top {
    height: 50px;
    background: #fff;
    overflow: hidden;
    text-align: center;
    padding-top: 12px;
  }

  .aside {
    height: calc(100vh - 73px);
    overflow-x: auto;
    color: #fff;

    .aside-top {
      height: 168px;
      position: relative;

      .position-absolute {
        position: absolute;
      }
      .company-name {
        left: 0;
        top: 0;
        width: 100%;
        height: 66px;
        line-height: 66px;
        text-align: center;
        background: #666;
        font-size: 18px;
      }
      .user-avatar {
        left: 22px;
        top: 88px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
        background: #fff;
        cursor: pointer;

        img {
          max-height: 60px;
        }

        span {
          display: block;
          widows: 100%;
          height: 100%;
          text-align: center;
          line-height: 60px;
          font-size: 14px;
          color: #000;
        }
      }
      .user-role {
        left: 92px;
        top: 100px;
        height: 22px;
        line-height: 22px;
        font-size: 19px;
      }
      .user-name {
        left: 92px;
        top: 125px;
        height: 24px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>