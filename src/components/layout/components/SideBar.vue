<template>
  <div class="aside-wrapper">
    <div class="sidebar-top">
      <img src="@/assets/img/logoHorizontal.png" alt="logo" width="120" />
    </div>
    <div class="aside">
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
        mode="inline"
      >
        <template v-for="item in items" :key="item.index">
          <a-sub-menu v-if="item.subs && item.subs.length" :key="item.index">
            <template v-slot:title>
              <i :class="item.icon" v-show="iconFlag"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="sub1 in item.subs" :key="sub1.index">
              <a-sub-menu
                v-if="sub1.subs && sub1.subs.length"
                :key="sub1.index"
              >
                <template v-slot:title>
                  <i :class="sub1.icon" v-show="iconFlag"></i>
                  <span>{{ sub1.title }}</span>
                </template>
                <template v-for="sub2 in sub1.subs" :key="sub2.index">
                  <a-sub-menu
                    v-if="sub2.subs && sub2.subs.length"
                    :key="sub2.index"
                  >
                    <template v-slot:title>
                      <i :class="sub2.icon" v-show="iconFlag"></i>
                      <span>{{ sub2.title }}</span>
                    </template>
                    <a-menu-item
                      v-for="sub3 in sub2.subs"
                      :index="sub3.index"
                      :key="sub3.index"
                      @click="goThis(sub3.index)"
                    >
                      <i :class="sub3.icon"></i>
                      <span>{{ sub3.title }}</span>
                    </a-menu-item>
                  </a-sub-menu>
                  <template v-else>
                    <a-menu-item
                      :index="sub2.index"
                      :key="sub2.index"
                      @click="goThis(sub2.index)"
                    >
                      <i :class="sub2.icon"></i>
                      <span>{{ sub2.title }}</span>
                    </a-menu-item>
                  </template>
                </template>
              </a-sub-menu>
              <template v-else>
                <a-menu-item
                  :index="sub1.index"
                  :key="sub1.index"
                  @click="goThis(sub1.index)"
                >
                  <i :class="sub1.icon"></i>
                  <span>{{ sub1.title }}</span>
                </a-menu-item>
              </template>
            </template>
          </a-sub-menu>
          <template v-else>
            <a-menu-item
              :index="item.index"
              :key="item.index"
              @click="goThis(item.index)"
            >
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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import variables from "@/assets/styles/variables.scss";
import { User } from "@/model/types/interface/common";
import { IsPC } from "@/utils/index";
import { getCookie } from "@/utils/auth";
import LoginOperation from "@/controller/login/loginController";
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
    const iconFlag = ref(false);
    if (IsPC()) {
      iconFlag.value = false;
    } else {
      iconFlag.value = true;
    }
    const isBaseMenu = ref(false);
    const instance = getCurrentInstance();
    let items: any[] = reactive([]);
    LoginOperation.getInstance(instance?.appContext.app)
      .getMenuList(route.path)
      .then((res) => {
        res.map((item) => {
          items.push(item);
        });
        console.log(items);
      });
    onMounted(() => {});

    isBaseMenu.value = route.path.indexOf("center") == -1 ? true : false;
    let loginInfo =
      JSON.parse(getCookie(process.env.VUE_APP_MODE + "EocLoginInfo")) || {};
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
      goThis,
    };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/styles/variables.scss";
.el-menu-vertical {
  color: #bfcbd9 !important;
}
.ant-menu-inline {
  border-right: none;
}
.ant-menu-submenu ::v-deep(.ant-menu) {
  background-color: #1f2d3d !important;
  color: #bfcbd9 !important;
}
::v-deep(.ant-menu-item-group-title) {
  color: #bfcbd9 !important;
}
// ::v-deep(.ant-menu-submenu-title) {
//   background-color: #202736;
// }
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
    overflow-x: hidden;
    &::-webkit-scrollbar {
      //整体样式
      height: 5px;
      width: 5px;
      background: #202736;
    }
    &::-webkit-scrollbar-thumb {
      //滑动滑块条样式
      // width: 5px;
      // height: 5px;
      border-radius: 3px;
      background: #202736;
    }
    &::-webkit-scrollbar-track {
      //轨道的样式
      // width: 5px;
      // height: 5px;
      border-radius: 3px;
      background: #909399;
    }

    .ant-menu-root {
      background-color: #202736;
      .ant-menu-item {
        color: #bfcbd9 !important;
        font-size: 14px;
        a {
          color: #fff;
          &:hover {
            color: #1890ff;
          }
        }
      }
      .ant-menu-item-selected {
        background-color: #909399 !important;
      }
    }
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