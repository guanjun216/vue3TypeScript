
<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <error-log
          class="errLog-container right-menu-item desktop hover-effect"
        /> -->
        <router-link to="/home" class="right-menu-item desktop hover-effect"
          >欢迎，{{ name }}</router-link
        >
      </template>
      <a class="right-menu-item hover-effect" @click="logout">
        <i class="icon"></i>退出
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "@/components/breadcrumb/index.vue";
import Hamburger from "@/components/hamburger/index";
import { useStore } from "vuex";
import { getCookie, SetCookie } from "@/utils/auth";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "NavBar",
  components: {
    Breadcrumb,
    Hamburger,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { sidebar, device } = store.getters;
    let loginInfoJson = getCookie(process.env.VUE_APP_MODE + "EocLoginInfo");
    let loginInfo = loginInfoJson ? JSON.parse(loginInfoJson) : "";
    const toggleSideBar = () => {
      store.dispatch("app/toggleSideBar");
    };
    const name: string = (loginInfo && loginInfo.name) || "";
    const logout = () => {
      SetCookie(process.env.VUE_APP_MODE + "EocLoginInfo", "");
      router.push(`/login?redirect=${route.fullPath}`);
    };
    return {
      sidebar,
      device,
      toggleSideBar,
      logout,
      name,
    };
  },
});
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    color: #666;
    fill: #666;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      color: #333;
      vertical-align: text-bottom;
      margin-right: 30px;
      &.desktop {
      }
      & .icon {
        display: inline-block;
        background: url("~@/assets/img/tuichu.png") no-repeat;
        width: 16px;
        height: 26px;
        position: relative;
        top: 12px;
        background-size: 16px auto;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
