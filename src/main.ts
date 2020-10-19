import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import { Form, Button, Row, Col, Input } from "ant-design-vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Form);
app.use(Button);
app.use(Row);
app.use(Col);
app.use(Input);
app.mount("#app");
