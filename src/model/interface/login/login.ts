interface UserInfo {
  username: string;
  password: string;
  validateCode: string;
  setLDiv: string;
  screenWidth: string;
  screenHeight: string;
}
interface User {
    account: string;
    password: string;
    tenant: string;
    key: string;
    code: string;
    grantType: string;
}
export type {UserInfo,User}