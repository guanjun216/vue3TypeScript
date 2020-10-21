import { Button, Input, Form, Breadcrumb, Col, Row } from "ant-design-vue";
import { notification, message } from "ant-design-vue";
import { App } from "vue";
export const ant = {
  install(app: App) {
    app.use(Button);
    app.use(Input);
    app.use(Form);
    app.use(Breadcrumb);
    app.use(Col);
    app.use(Row);
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$notify = notification;
  },
};
export default ant;
