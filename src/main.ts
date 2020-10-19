import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Form, Input, Col, Row, Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

const app = createApp(App);
app.use(store);
app.use(Form);
app.use(Input);
app.use(Col);
app.use(Row);
app.use(Button);
app.use(router);
app.mount("#app");
