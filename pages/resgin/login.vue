<template>
  <div id="login"
       @keyup.enter="login('ruleForm')">
    <div class="login-form-bg">
      <!-- <p>{{$t(this.$route.matched[0].meta.title)}}</p> -->
      <!-- 默认登录输入框 -->
      <div class="form">
        <el-form :model='loginRule'
                 ref="ruleForm"
                 :rules='rule'
                 class="firForm">
          <el-form-item class="login-title">
            <p>WMS</p>
          </el-form-item>
          <el-form-item class="firFormItem"
                        prop="account">
            <i class="iconfont">&#xe6a3;</i>
            <el-input class="firIptClass"
                      v-model="loginRule.account"
                      maxlength="50"
                      :placeholder="$t('ViCenter.common.userInfo')"
                      clearable
                      auto-complete="on"
                      autofocus></el-input>
          </el-form-item>
          <el-form-item class="firFormItem"
                        prop="password">
            <i class="iconfont">&#xe627;</i>
            <el-input class="firIptClass"
                      type='password'
                      v-model="loginRule.password"
                      :placeholder="$t('ViCenter.common.passInfo')"
                      @paste.native.capture.prevent="noPaste"></el-input>
          </el-form-item>
          <el-form-item class="firFormItem"
                        prop='captcha'
                        v-if='yzm'>
            <i class="iconfont">&#xe6cb;</i>
            <el-input class="firIptClass"
                      :placeholder="$t('upms.login.useryzm')"
                      v-model="loginRule.captcha"
                      auto-complete="on"
                      :maxlength='captchaLength'>
              <img style='width: 142px;margin-right:-9px;cursor:pointer'
                   slot="suffix"
                   :src='captchaContent'
                   @click='getKaptcha' />
            </el-input>
          </el-form-item>
          <el-form-item class="firFormItem">
            <el-button class="firbutton"
                       type="primary"
                       @click="login('ruleForm')">{{$t('ViCenter.common.title')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <crypto></crypto> -->
    <cryp></cryp>
    <!-- 初次进入需要修改默认密码 -->
    <el-dialog :title="$t('ViCenter.common.modifyPwd')"
               :visible.sync="changePassword"
               :show-close='falseFlag'
               :close-on-click-modal='falseFlag'
               :close-on-press-escape='falseFlag'
               class='ChangePassDia'>
      <el-form :model="changePass"
               ref='chagePassForm'
               :rules='PasswordRule'>
        <el-form-item :label="$t('upms.index.oldPassword')"
                      prop='oldPass'>
          <el-input type='password'
                    :placeholder="$t('upms.index.EnterOldPass')"
                    v-model="changePass.oldPass"
                    auto-complete="off"
                    @paste.native.capture.prevent="noPaste"
                    @blur="handleTrim"></el-input>
        </el-form-item>
        <el-form-item :label="$t('upms.index.newPassword')"
                      prop='password'>
          <el-tooltip class="item"
                      effect="dark"
                      :content="tipPassrule"
                      placement="top-end">
            <el-input type='password'
                      :placeholder="$t('upms.index.EnterNewPass')"
                      v-model="changePass.password"
                      auto-complete="off"
                      @paste.native.capture.prevent="noPaste"
                      @blur="handleTrim"></el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item :label="$t('upms.index.conPassword')"
                      prop='ConfPass'>
          <el-input type='password'
                    :placeholder="$t('upms.index.EnterConPass')"
                    v-model="changePass.ConfPass"
                    auto-complete="off"
                    @paste.native.capture.prevent="noPaste"
                    @blur="handleTrim"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click.enter="submitPassword">{{$t('ViCenter.common.save')}}</el-button>
        <el-button @click="resetPassword">{{$t('ViCenter.common.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import handleData from '../../api/common.js'
export default {
  name: 'login',
  data () {
    const requConfPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('upms.index.EnterConPass')))
      } else if (value !== this.changePass.password) {
        callback(new Error(this.$t('upms.index.DiffTwoPass')))
      } else {
        callback()
      }
    }
    const passwordConf = (rule, value, callback) => {
      if (value === this.changePass.oldPass) {
        callback(new Error(this.$t('upms.index.DiffoldPass')))
      } else {
        callback()
      }
    }
    return {
      notifyOffset: window.config.notifyOffset,
      yzm: false,
      captchaContent: '',
      captchaToken: '',
      captchaLength: 6,
      falseFlag: false,
      changePassword: false, // 修改密码
      changePass: {
        oldPass: '',
        password: '',
        ConfPass: ''
      },
      rule: { // 表单校验
        account: [
          { required: true, message: this.$t('ViCenter.common.userInfo'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('ViCenter.common.passInfo'), trigger: 'blur' }
        ],
        captcha: [],
        lang: [
          { required: true, message: this.$t('ViCenter.common.langInfo'), trigger: 'change' }
        ]
      },
      loginRule: { // 表单提交数据
        account: '',
        password: '',
        captcha: '',
        lang: localStorage.lang || window.config.initLang
      },
      LangOption: [
        {
          value: 'en-US',
          label: this.$t('ViCenter.common.english')
        }
        // {
        //   value: 'zh-CN',
        //   label: this.$t('ViCenter.common.chinese')
        // }
      ],
      PasswordRule: { // 模态框的修改密码校验数据
        oldPass: [
          { required: true, message: this.$t('upms.index.EnterOldPass'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('upms.index.EnterNewPass'), trigger: 'blur' },
          { validator: passwordConf, trigger: 'blur' }
        ],
        ConfPass: [
          { required: true, message: this.$t('upms.index.EnterConPass'), trigger: 'blur' },
          { validator: requConfPass, trigger: 'blur' }
        ]
      },
      tipPassrule: ''
    }
  },
  beforeCreate () {
    const { lang } = this.$store.state
    this.$i18n.locale = lang
  },
  created () {
    sessionStorage.setItem('path', this.$route.path)
    this.ListeningForKeyboardEvents()
    Promise.all([this.getKaptcha(), this.getPasswordRule()]).catch(err => {
      console.log('err', err)
    })
    document.getElementsByTagName('title')[0].innerHTML = this.$t(this.$route.matched[0].meta.title)
  },
  mounted () {
    const { lang } = this.$store.state
    this.loginRule.lang = lang
  },
  beforeDestroy () {
    document.onkeydown = undefined
  },
  methods: {
    handleTrim () { // 对修改密码输入框trim处理
      this.changePass.oldPass = this.changePass.oldPass.replace(/(^\s*)|(\s*$)/g, '')
      this.changePass.password = this.changePass.password.replace(/(^\s*)|(\s*$)/g, '')
      this.changePass.ConfPass = this.changePass.ConfPass.replace(/(^\s*)|(\s*$)/g, '')
    },
    noPaste () { // 禁止在密码输入框中粘贴
      return false
    },
    getKaptcha () { // 获取验证码
      handleData._getKaptcha().then((res) => {
        if (res.data.flag) {
          if (res.data.result === null) {
            this.yzm = false
            this.loginRule.captcha = []
          } else {
            this.yzm = true
            this.captchaContent = `data:image/jpeg;base64,${res.data.result.captchaContent}`
            this.captchaToken = res.data.result.captchaToken
            this.captchaLength = res.data.result.captchaLength
            this.rule.captcha = [
              { required: true, message: this.$t('upms.login.useryzm'), trigger: 'blur' },
              { max: this.captchaLength, min: this.captchaLength, message: this.$t('upms.login.yzmError'), trigger: 'blur' }
            ]
          }
        }
      }).catch(() => { })
    },
    getPasswordRule () { // 获取校验规则
      handleData.initPwdRule().then((res) => {
        if (res.data.flag) {
          // 请求成功之后将校验规则写入
          this.PasswordRule.password.unshift({ min: res.data.result.minLength, max: res.data.result.maxLength, message: this.$t('upms.index.EnterPassLength'), trigger: 'blur' })
          let content = ''
          if (res.data.result.containsDigitalNumber) {
            content += this.$t('upms.index.number') + ','
            this.PasswordRule.password.unshift({ pattern: '.*[0-9]+.*', message: this.$t('upms.index.EnterPassLength'), trigger: 'blur' })
          }
          if (res.data.result.containsLowercaseLetters) {
            content += this.$t('upms.index.LowercaseLetter') + ','
            this.PasswordRule.password.unshift({ pattern: '.*[a-z]+.*', message: this.$t('upms.index.EnterPassLength'), trigger: 'blur' })
          }
          if (res.data.result.containsUppercaseLetters) {
            content += this.$t('upms.index.UppercaseLetter') + ','
            this.PasswordRule.password.unshift({ pattern: '.*[A-Z]+.*', message: this.$t('upms.index.EnterPassLength'), trigger: 'blur' })
          }
          if (res.data.result.containsSpecialCharacters) {
            content += this.$t('upms.index.SpecialCharacter') + ','
            this.PasswordRule.password.unshift({ pattern: '.*[^0-9a-zA-Z]+.*', message: this.$t('upms.index.EnterPassLength'), trigger: 'blur' })
          }
          if (content === '') {
            this.tipPassrule = this.$t('upms.index.passwordLength', { min: res.data.result.minLength, max: res.data.result.maxLength })
          } else {
            content += this.$t('upms.index.allpassword', { min: res.data.result.minLength, max: res.data.result.maxLength })
            this.tipPassrule = this.$t('upms.index.mustHave') + content
          }
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    resetPassword () { // 关闭修改密码弹窗
      this.changePassword = false // 关闭模态窗
      this.$refs.chagePassForm.resetFields() // 清空所有填写数据与验证
    },
    submitPassword () { // 提交初次修改秘密
      this.$refs.chagePassForm.validate((valid) => {
        if (valid) {
          const passwordData = {
            /* global encrypt */
            changeStr: encrypt(this.loginRule.account, this.changePass.oldPass, this.changePass.password)
          }
          handleData.changePassword(passwordData).then((res) => {
            if (res.data.flag) {
              this.changePassword = false // 关闭模态窗
              this.loginRule.password = ''
              this.$refs.chagePassForm.resetFields() // 清空所有填写数据与验证
              this.$notify.success({
                title: this.$t('upms.common.beSuccess'),
                message: this.$t('upms.index.ChangeSuccess'),
                offset: this.notifyOffset
              })
            } else {
              this.$notify.error({
                title: this.$t('upms.common.beError'),
                message: this.$t('upms.ajax.' + res.data.errorCode),
                offset: this.notifyOffset
              })
            }
          }).catch(() => { })
        }
      })
    },
    change () {
      sessionStorage.setItem('path', this.$route.path)
      setTimeout(() => {
        const { lang } = this.loginRule
        localStorage.setItem('lang', lang)
        this.$store.commit({
          type: 'changeLang',
          lang: lang,
          path: `${this.$route.path}`
        })
        this.$router.push({ path: '/language' })
      }, 50)
    },
    login (formName) {
      const { lang } = this.loginRule
      localStorage.setItem('lang', lang)
      this.$refs.selectLang && this.$refs.selectLang.blur()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginRule.account = this.loginRule.account.replace(/(^\s*)|(\s*$)/g, '')
          // this.$router.push({path: `/menu`})
          let loginData
          if (this.yzm) {
            loginData = {
              loginStr: encrypt(this.loginRule.account, this.loginRule.password),
              captchaCode: this.loginRule.captcha,
              captchaToken: this.captchaToken
            }
          } else {
            loginData = {
              loginStr: encrypt(this.loginRule.account, this.loginRule.password)
            }
          }
          handleData.login(loginData).then((response) => { // 请求登录接口
            if (response.data.flag) {
              // 将返回值信息存入本地
              localStorage.setItem('Xcsrftoken', response.headers['x-csrf-token'])
              sessionStorage.setItem('account', response.data.result.account)
              sessionStorage.setItem('userName', response.data.result.userName)
              sessionStorage.setItem('userId', response.data.result.userId)
              this.$router.push({path: `/menu`})
            } else if (!response.data.flag && response.data.errorCode) {
              if (response.data.errorCode === 'I010104') {
                this.changePassword = true
                this.changePass.oldPass = this.loginRule.password
              } else {
                if (response.data.errorCode === 'I010117') {
                  this.$notify.info({
                    title: this.$t('upms.common.beInfo'),
                    message: this.$t('upms.ajax.' + response.data.errorCode, {leftTimes: response.data.result.leftTimes}),
                    offset: this.notifyOffset
                  })
                } else {
                  this.$notify.error({
                    title: this.$t('upms.common.beError'),
                    message: this.$t('upms.ajax.' + response.data.errorCode),
                    offset: this.notifyOffset
                  })
                }
              }
            }
            if (!response.data.flag) {
              this.getKaptcha()
            }
          }).catch(err => {
            console.log('err', err)
          })
        } else {
          return false
        }
      })
    },
    ListeningForKeyboardEvents () {
      document.onkeydown = function (event) {
        var e = event || window.event
        if (e.shiftKey && e.ctrlKey && e.keyCode === 67) {
          localStorage.setItem('lang', 'zh-CN')
          window.location.reload()
        }
      }
    }
  },
  components: {
    // 'crypto': {
    //   render (createElement) {
    //     return createElement(
    //       'script',
    //       {
    //         attrs: {
    //           type: 'text/javascript',
    //           src: window.config.baseUrl + '/webjars/crypto-js/3.1.9/crypto-js.js'
    //         }
    //       }
    //     )
    //   }
    // },
    'cryp': {
      render (createElement) {
        return createElement(
          'script',
          {
            attrs: {
              type: 'text/javascript',
              src: './static/js/crypto.min.js'
            }
          }
        )
      }
    }
  },
  watch: {
    loginForm: { // 为表单数据赋值
      handler (oldValue, newValue) {
        for (let k = 0; k < newValue.length; k++) {
          this.loginRule.model[newValue[k].ruleProp] = newValue[k].models
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import'../../styles/common/index.scss';
#login {
  width: $all;
  height: $all;
  @include flex();
  background: $login no-repeat center;
  background-size: $all $all;
  .login-form-bg {
    @include flex(column, center, center);
    p {
      color: $white;
      font-size: $welcomeTitle;
      font-weight: bold;
      margin-bottom: 130px;
    }
    .form {
      .firForm {
        width: $all;
          padding: $margin $margin * 4;
          @media screen and (max-width: 1500px) {
            padding: $margin / 2 $margin * 2;
          }
          background: #263645;
          opacity: .9;
          box-shadow: #263645 0 0 200px;
        border-radius: 10px;
        @include box-sizing();
        @include flex(column, center, center);
        flex-wrap: wrap;
        .login-title {
          p {
            width: $all;
            height:60px;
            line-height: 60px;
            font-size:32px;
            margin-bottom: 0;
          }
        }
      }
        .firFormItem{
          margin-right: $margin/2;
          position: relative;
          width: 400px;
          .iconfont {
            color: #fff;
            font-size: 18px;
            position: absolute;
            left: 0;
          }
          .el-form-item__content {
            .el-form-item__error {
              text-align: left;
              top: 70%;
            }
        }
      }
      .firformLabel {
        width: $all;
        text-align: left;
        display: block;
      }
      .firIptClass {
        margin: 0;
          width: $all;
          margin-bottom: $margin;
          .el-input__inner {
            color: #fff;
            background-color: transparent;
            border-left: none;
            border-top: none;
            border-right: none;
            border-radius: 0;
            padding-left: $margin*2;
          font-size: $texts;
          &:focus {
            border-bottom: 1px solid $primary;
          }
        }
      }
      .firbutton {
        width: $all;
      }
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-dialog {
    .el-dialog__header {
      text-align: left;
    }
    .el-dialog__body {
      .el-form-item__error {
        text-align: left;
      }
    }
  }
  }
</style>
