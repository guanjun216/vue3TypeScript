// 验证账号或绑定手机号，只能是字母、数字下划线
export function validateUsername(rule: Object, value: any, callback: Function) {
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return Promise.reject("请输入正确的账号或绑定手机号");
  } else if (value.length < 4) {
    return Promise.reject("账号或绑定手机号位数不能小于4位");
  } else if (value.length > 16) {
    return Promise.reject("账号或绑定手机号位数不能大于16位");
  } else {
    return Promise.resolve();
  }
}
// 验证密码只能数字或者字母，6-16位，不含特殊字符
export function validatePassword(rule: Object, value: any, callback: Function) {
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return Promise.reject("密码含有特殊字符！");
  } else if (value.length < 6) {
    return Promise.reject("密码位数不能小于6位");
  } else if (value.length > 16) {
    return Promise.reject("密码位数不能大于16位");
  } else {
    return Promise.resolve();
  }
}
// 修改密码只能数字和字母组合，6-16位，不含特殊字符
export function validateNewPassword(
  rule: Object,
  value: any,
  callback: Function
) {
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    return Promise.reject("密码不能含有特殊字符！");
  } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(value)) {
    return Promise.reject("密码必须是数字和字母组合！");
  } else if (value.length < 6) {
    return Promise.reject("密码位数不能小于6位");
  } else if (value.length > 16) {
    return Promise.reject("密码位数不能大于16位");
  } else {
    return Promise.resolve();
  }
}
