import { User } from "@/model/interface/login/login";
export default class loginDto implements User {
  private _account: String = "";
  public get account(): String {
    return this._account;
  }
  public set account(value: String) {
    this._account = value;
  }
  private _password: String = "";
  public get password(): String {
    return this._password;
  }
  public set password(value: String) {
    this._password = value;
  }
  private _tenant: String = "MDAwMA==";
  public get tenant(): String {
    return this._tenant;
  }
  public set tenant(value: String) {
    this._tenant = value;
  }
  private _key: String = "";
  public get key(): String {
    return this._key;
  }
  public set key(value: String) {
    this._key = value;
  }
  private _code: String = "";
  public get code(): String {
    return this._code;
  }
  public set code(value: String) {
    this._code = value;
  }
  private _grantType: String = "captcha";
  public get grantType(): String {
    return this._grantType;
  }
  public set grantType(value: String) {
    this._grantType = value;
  }
  constructor() {}
}
