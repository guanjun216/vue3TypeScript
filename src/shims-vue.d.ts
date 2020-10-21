declare module "*.vue" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
declare module "*.html" {
  const value: string;
  export default value;
}
declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.scss" {
  const content: any;
  export default content;
}
declare module "*.js" {
  const content: any;
  export default content;
}

declare module "*.ts" {
  const content: any;
  export default content;
}
