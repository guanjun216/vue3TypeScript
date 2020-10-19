interface UserInfo {
  username: String;
  password: String;
  validateCode: String;
  setLDiv: String;
  screenWidth: String;
  screenHeight: String;
}
interface User {
    account: String;
    password: String;
    tenant: String;
    key: String;
    code: String;
    grantType: String;
}
export type {UserInfo,User}