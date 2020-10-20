import { userLogin } from "@/api/baseCenter/login/login";
import { User } from "@/model/interface/login/login";

export default class loginDto implements User {
  public account: String = "";
  public password: String = "";
  public tenant: String = "MDAwMA==";
  public key: String = "";
  public code: String = "";
  public grantType: String = "captcha";
  constructor() {}
}
