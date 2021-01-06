<template>
  <div class="login-wrapper">
    <div
      class="login-container"
      :style="styles"
    >
      <el-card>
        <div
          slot="header"
          class="login-title"
        >
          <span>登录</span>
        </div>
        <div class="form-content">
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>
            <el-tooltip
              v-model="capsTooltip"
              content="Caps lock is On"
              placement="right"
              manual
            >
              <el-form-item prop="password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span
                  class="show-pwd"
                  @click="showPwd"
                >
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>
              </el-form-item>
            </el-tooltip>
            <div class="captcha">
              <el-form-item
                prop="code"
                class="code-input"
              >
                <span class="svg-container">
                  <svg-icon icon-class="documentation" />
                </span>
                <el-input
                  ref="code"
                  v-model="loginForm.code"
                  placeholder="运算结果"
                  name="code"
                  type="text"
                  tabindex="3"
                  autocomplete="on"
                />

              </el-form-item>
              <div class="captcha-content">
                <i
                  class="el-icon-loading"
                  v-if="captchaLoading"
                />
                <div
                  v-else
                  class="svg-captcha"
                  v-html="svgCaptcha"
                  @click="getCaptcha"
                ></div>
              </div>

            </div>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;margin-bottom:10px;height: 50px;font-size: 18px;"
              @click.native.prevent="handleLogin"
            >登 录</el-button>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user';
const { body } = document;
const WIDTH = 992;
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入运算结果', trigger: 'blur' }]
      },
      svgCaptcha: '',
      captchaLoading: false,
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  computed: {
    styles () {
      return this.$_isMobile()
        ? {
          width: '90%',
          right: '50%',
          transform: 'translate(50%, -50%)'
        }
        : {};
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  mounted () {
    if (this.loginForm.username === '') {
      this.$refs.username.focus();
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus();
    }
    this.getCaptcha();
  },
  methods: {
    async getCaptcha () {
      if (this.loading) {
        return;
      }
      this.captchaLoading = true;
      try {
        const { data } = await getCaptcha(this.loginForm.uuid);
        this.svgCaptcha = data.captcha;
        this.loginForm.uuid = data.uuid;
        this.captchaLoading = false;
      } catch (error) {
        this.captchaLoading = false;
      }
    },
    checkCapslock ({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        // eslint-disable-next-line no-mixed-operators
        if (
          (shiftKey && (key >= 'a' && key <= 'z')) ||
          (!shiftKey && (key >= 'A' && key <= 'Z'))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true;
          try {
            await this.$store.dispatch('user/login', this.loginForm);
            this.$router.push({
              path: this.redirect || '/',
              query: this.otherQuery
            });
            this.loading = false;
          } catch (error) {
            this.loading = false;
            this.getCaptcha();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery (query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    $_isMobile () {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ebeef5;
    background: rgba(0, 0, 0, 0.01);
    // box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #000;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-wrapper {
  position: relative;
  // width: 100vh;
  // height:100vh;
  // overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
}
.login-container {
  position: absolute;
  top: 50%;
  right: 10%;
  width: 500px;
  height: 400px;
  transform: translate(0, -50%);
  .login-title {
    font-size: 20px;
    font-weight: 500;
    .login-logo {
      float: right;
      width: 32px;
    }
  }
  .login-form {
    position: relative;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .captcha {
    display: flex;

    .code-input {
      flex: 1;
    }
    .captcha-content {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 50px;
      background: rgba(0, 0, 0, 0.01);
      border-radius: 5px;
      margin-left: 10px;
      overflow: hidden;
      border: 1px solid #ebeef5;
      .svg-captcha {
        width: 120px;
        height: 50px;
        cursor: pointer;
      }
    }
  }
}
</style>
