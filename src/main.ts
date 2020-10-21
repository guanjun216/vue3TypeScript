import ant from "@/utils/antd";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Scrollbar from "@/components/common/element/scrollbar/index.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ant);
app.mount("#app");
Scrollbar.install(app);
