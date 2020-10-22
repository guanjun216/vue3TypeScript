interface Response {
  code: string;
  success: Boolean;
  data: any;
  msg: string;
}
interface User {
  userId: string;
  account: string;
  avatar: string;
  name: string;
}
export { Response, User };
