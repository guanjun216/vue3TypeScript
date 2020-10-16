import Vue from "vue";
import VueI18n from "vue-i18n";
import cn from "./langs/cn";
import elementCnLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n);

const messages = {
  cn: {
    ...cn,
    ...elementCnLocale
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem("locale") || "cn",
  messages,
  silentTranslationWarn: true
});


export default i18n;
