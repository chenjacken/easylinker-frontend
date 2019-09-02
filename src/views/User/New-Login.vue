<template>
  <div class="login-content">
    <h2 class="title">云易物联</h2>
    <div class="login-form">
      <h2>登 录</h2>
      <a-form
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            type="text"
            v-decorator="[
              'principle',
              {rules: [
                { required: true, message: '请输入帐户名或邮箱地址' },
                { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
            ]"
          >
            <a-icon
              slot="prefix"
              type="user"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            v-decorator="[
              'password',
              {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'change'}
            ]"
          >
            <a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
            />
          </a-input>
        </a-form-item>
        <a-input-group>
          <a-form-item>
            <a-input
              style="width: 60%"
              size="large"
              type="text"
              autocomplete="false"
              v-decorator="[
                'captchaCode',
                {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon
                slot="prefix"
                type="safety-certificate"
                :style="{ color: 'rgba(0,0,0,.25)' }"
              />
            </a-input>
            <img
              @click="handleCodeImage"
              style="width: 40%;height:100%;border:1px solid #efefef;cursor: pointer;"
              :src="'/api/easyboot/captcha/jpg?uuid='+uuid"
            />
          </a-form-item>
        </a-input-group>

        <a-form-item style="margin-bottom: 0;">
          <router-link
            :to="{ name: 'recover', params: { user: 'aaa'} }"
            class="forge-password"
            style="float: right; color: #9b9ea0;"
          >忘记密码</router-link>
        </a-form-item>

        <a-form-item>
          <a-button
            block
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="state.loginBtn"
            :disabled="state.loginBtn"
          >登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>

<script>
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
export default {
  components: {
    TwoStepCaptcha
  },
  data () {
    return {
      uuid: null,
      form: this.$form.createForm(this),
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      state: {
        time: 60,
        loginBtn: false,
        loginType: 0,
        smsSendBtn: false
      }
    }
  },

  created () {
    this.handleCodeImage()
  },

  methods: {
    ...mapActions(['Login', 'Logout']),

    /**
     * @description
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },

    /**
     * @description 切换验证码
     */
    handleCodeImage () {
      this.uuid = Math.random().toString().slice(2, 8)
    },

    stepCaptchaSuccess () {
      this.loginSuccess()
    },

    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },

    /**
     * @description 登录事件
     * @param {*} e
     */
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        Login,
        uuid
      } = this
      const validateFieldsKey = ['principle', 'password', 'captchaCode']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          state.loginBtn = true
          const loginParams = { ...values, uuid }
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },

    /**
     * @description 登录成功回调函数
     * @param { object } res
     */
    loginSuccess (res) {
      this.$router.push({ name: 'home' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },

    /**
     * @description 登录失败回调函数
     * @param { object } err
     */
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }

}
</script>

<style lang="less" scope>
.login-content {
  width: 100%;
  height: 100%;
  background: url(../../assets/images/login-bg.jpg) center center no-repeat;
  background-size: cover;
  .title {
    color: #f6f7f8;
    margin: 50px 100px 0;
    font-size: 32px;
    font-weight: bold;
  }
  .login-form {
    width: 400px;
    background: #f6f7f8;
    border-radius: 10px;
    padding: 30px 50px;
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px #f6f7f8;
  }
}
</style>
