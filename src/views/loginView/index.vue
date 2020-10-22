<template>
  <div class="login-box">
    <div class="login-main">
      <div class="login-container">
        <div class="login-logo">
          <img src="@/assets/img/logo.png" />
        </div>
        <div class="login-content">
          <div class="login-content-left">
            <img src="@/assets/img/loginLeft.png" />
          </div>
          <div class="login-content-right">
            <h1 class="site-name">今天买买全球EOC</h1>
            <a-form
              :model="login"
              :rules="rules"
              ref="ruleForm"
              :inline-message="false"
              class="login-form"
            >
              <a-form-item class="login-form-item" name="username">
                <a-input
                  :class="`login-username ${
                    login.username.length >= 6 ? 'active' : ''
                  }`"
                  v-model:value="login.username"
                  placeholder="请输入登录账户"
                  :maxlength="16"
                ></a-input>
              </a-form-item>
              <a-form-item class="login-form-item" name="password">
                <a-input
                  :class="`login-password ${
                    login.password.length >= 6 ? 'active' : ''
                  }`"
                  type="password"
                  v-model:value="login.password"
                  placeholder="请输入登录密码"
                  :maxlength="16"
                ></a-input>
              </a-form-item>
              <a-form-item class="login-form-item" name="validateCode">
                <a-input
                  :class="`login-validate-code ${
                    login.validateCode.length > 0 ? 'active' : ''
                  }`"
                  v-model:value="login.validateCode"
                  placeholder="请输入验证码"
                  @keyup.enter="updateUser"
                ></a-input>
                <img
                  class="set-captimg"
                  :src="captchaImage"
                  :alt="'图形验证码'"
                  @click="captchaImageChange"
                />
              </a-form-item>
              <a-form-item class="login-form-item margin-bottom-19">
                <a-button
                  type="primary"
                  @click="updateUser"
                  class="login-btn"
                  :disabled="
                    !login.username ||
                    login.password.length < 6 ||
                    !login.validateCode
                  "
                  :loading="saveLoading"
                  >登录</a-button
                >
              </a-form-item>
              <a-row class="login-bottom-link">
                <a-col :span="12"></a-col>
                <a-col :span="12" align="right"></a-col>
              </a-row>
            </a-form>
          </div>
        </div>
      </div>
      <h5 class="login-h5">
        <i class="iconfont">&#xe677;</i>
        {{ version }}
      </h5>
    </div>
    <!-- 首次登录强制修改密码 -->
    <!-- <reset-pwd :resetPwdVisible="resetPwdVisible" @closeDialog="closeHandle" /> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";
import { useForm } from "@ant-design-vue/use";
import { UserInfo } from "@/model/interface/login/login";
import { Response } from "@/model/interface/common";
import LoginController from "@/controller/login/loginController";
import {
  validateUsername,
  validatePassword,
  validateNewPassword,
} from "@/utils/validate.ts";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const instance = getCurrentInstance();
    let key: string = ""; //随机值
    const login = reactive({
      username: "",
      password: "",
      validateCode: "",
      setLDiv: "",
      screenWidth: "",
      screenHeight: "",
      key: "",
    }) as UserInfo;
    const captchaImage = ref("");
    const version = ref("1.0.0");
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          validator: validateUsername,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          validator: validatePassword,
          trigger: "blur",
        },
      ],
      validateCode: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "blur",
        },
        {
          min: 1,
          max: 20,
          message: "长度在 1 到 20 个字符",
          trigger: "blur",
        },
      ],
      newPassword: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          validator: validateNewPassword,
          trigger: "blur",
        },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(login, rules);
    const saveLoading = ref(false); // 登录按钮loading
    const resetPwdVisible = ref(false); // 修改密码，默认不可见
    const captchaImageChange = () => {
      key = Math.random().toString();
      captchaImage.value =
        process.env.VUE_APP_BASE_URL +
        "/oauth/anno/captcha?tenant=MDAwMA==&key=" +
        key;
    };
    onMounted(() => {
      captchaImageChange();
    });
    const reset = () => {
      captchaImageChange();
      resetFields();
    };
    const router = useRouter();
    const updateUser = () => {
      validate().then((res) => {
        saveLoading.value = true;
        login.key = key;
        LoginController.getInstance(instance?.appContext.app)
          .userLogin(login)
          .then((res) => {
            if (res.code === "0") {
              router.push({ path: "/" });
            } else {
              reset();
            }
          })
          .finally(() => {
            saveLoading.value = false;
          });
      });
    };
    return {
      login,
      updateUser,
      captchaImageChange,
      saveLoading,
      resetPwdVisible,
      rules,
      version,
      captchaImage,
      validateInfos,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/login/login.scss";
</style>
