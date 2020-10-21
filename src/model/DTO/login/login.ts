import { userLogin } from "@/api/baseCenter/login/login";
import { User } from "@/model/interface/login/login";

export default class loginDto implements User {
  public account: string = "";
  public password: string = "";
  public tenant: string = "MDAwMA==";
  public key: string = "";
  public code: string = "";
  public grantType: string = "captcha";
  constructor() {}
}
