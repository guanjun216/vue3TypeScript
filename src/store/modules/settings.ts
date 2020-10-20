import variables from "@/styles/element-variables.scss";
import defaultSettings from "@/settings/defaultSettings";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
};

const mutations = {
  CHANGE_SETTING: (
    state: { [x: string]: any; hasOwnProperty: (arg0: any) => any },
    { key, value }: any
  ) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
};

const actions = {
  changeSetting({ commit }: any, data: any) {
    commit("CHANGE_SETTING", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
