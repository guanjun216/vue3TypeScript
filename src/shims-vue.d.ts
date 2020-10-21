declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
// declare module "ant-design-vue" {
//   const Antd: any;
//   export default Antd;
// }
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
