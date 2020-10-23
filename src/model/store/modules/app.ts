import Cookies from "js-cookie";
// import Cookies form

const state = {
  sidebar: {
    opened: Cookies.get("sidebarStatus")
      ? !!+String(Cookies.get("sidebarStatus"))
      : true,
    withoutAnimation: false,
  },
  device: "desktop",
  size: Cookies.get("size") || "medium",
};

const mutations = {
  TOGGLE_SIDEBAR: (state: {
    sidebar: { opened: boolean; withoutAnimation: boolean };
  }) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set("sidebarStatus", "1");
    } else {
      Cookies.set("sidebarStatus", "0");
    }
  },
  CLOSE_SIDEBAR: (
    state: { sidebar: { opened: boolean; withoutAnimation: any } },
    withoutAnimation: any
  ) => {
    Cookies.set("sidebarStatus", "0");
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: { device: any }, device: any) => {
    state.device = device;
  },
  SET_SIZE: (state: { size: any }, size: any) => {
    state.size = size;
    Cookies.set("size", size);
  },
};

const actions = {
  toggleSideBar({ commit }: any) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }: any, { withoutAnimation }: any) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }: any, device: any) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }: any, size: any) {
    commit("SET_SIZE", size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
