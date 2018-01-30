<template>
    <div class="register" id="white-background">
      <div class="top"><a href="javascript:history.go(-1)"><i class="icon iconfont icon-fanhui"></i></a></div>
      <div class="logoBox"><img src="/static/images/logo.png"></div>
      <div class="registerBox">
        <div class="import">
          <i class="icon iconfont icon-shouji1"></i>
          <input type="tel" v-model="phone" v-verify.phone="phone" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'"/>
          <span class="sendCode" @click="sendCode" :class="{active : time>0}">{{btnTxt}}</span>
          <label v-remind="phone" class="f1">2</label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-yanzhengma"></i>
          <input type="number" v-model="code" v-verify="code" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'"/>
          <label v-remind="code" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-mima1"></i>
          <input type="password" v-model="pwd" v-verify="pwd" placeholder="请输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"/>
          <label v-remind="pwd" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-querenmima"></i>
          <input type="password" v-model="rePwd" v-verify="rePwd" placeholder="请再次输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"/>
          <label v-remind="rePwd" class="f1"></label>
        </div>
        <div class="btn" @click="submit">完成</div>
        <span class="hasAccount" @click="goLogin">已有账号，去登陆</span>
        <div class="isClause"><span class="icon iconfont" v-bind:class="agreeClause ? 'icon-xuanzhong1' : 'icon-weixuanzhong2'" @click="isAgree"></span>我已阅读并接受《使用条款与协议》</div>
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import verify from 'vue-verify-plugin'
  import {Toast, MessageBox} from 'mint-ui'
  Vue.use(verify, {
    blur: true
  })
  export default {
    data () {
      return {
        phone: '',
        code: '',
        pwd: '',
        rePwd: '',
        agreeClause: true, // 是否同意接受条款
        nowCode: '', // 验证码,
        second: 10, // 发送验证码倒计时
        time: 0,
        open: true, // 判断是否发送验证码,
        sessionId: ''
      }
    },
    verify: {
      phone: ['required', {
        test: function (val) {
          if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
            return false
          }
          return true
        },
        message: '<span class="icon iconfont icon-jinggao-copy"></span>手机号码格式不正确！'

      }],
      code: [
        'required',
        {
          test: function (val) {
            if (val != this.nowCode) {
              return false
            }
            return true
          },
          message: '<span class="icon iconfont icon-jinggao-copy"></span>验证码输入有误！'
        }
      ],
      pwd: [
        'required',
        {
          minLength: 6,
          message: '<span class="icon iconfont icon-jinggao-copy"></span>密码不得小于6位！'
        }
      ],
      rePwd: [
        'required',
        {
          test: function (val) {
            if (val !== this.pwd) {
              return false
            }
            return true
          },
          message: '<span class="icon iconfont icon-jinggao-copy"></span>两次密码不一致，请重新输入！'
        }
      ]
    },
    created () {
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {
      isAgree () {
        this.agreeClause = !this.agreeClause
      },
      timer () {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
        } else if (this.time === 0) {
          this.open = true
        }
      },
      /* 获取验证码 */
      sendCode: async function () {
        console.log(this.$verify.check('phone'))
        if (this.open) {
          if (this.$verify.check('phone')) {
            // this.codeStyle = true
            let params = {
              doctorPhone: this.phone,
              status: 0
            }
           const res = await this.$api.post('basic/toGetValidateCode.do', params)
            console.log(res.data)
            if (res.data.stateCode === '001') {
              if (res.data.validateCode) {
                this.time = this.second
                this.timer()
                this.open = false
                console.log(res.data.validateCode)
                this.nowCode = res.data.validateCode
                this.sessionId = res.data.sessionId
              } else {
                Toast({
                  message: '用户已存在，请登录',
                  iconClass: 'icon iconfont icon-cuowutishi1'
                })
              }
            } else if (res.data.stateCode === '002') {
              console.log('参数异常')
            } else {
              console.log('系统错误')
            }
          } else {
            Toast({
              message: '手机号码格式不正确',
              iconClass: 'icon iconfont icon-cuowutishi1'
            })
          }
        }
      },
      goLogin () {
        this.$router.push({
          path: '/login'
        })
      },
      submit () {
        if (this.$verify.check()) {
          this.getRegisterInfo()
        }
      },
      async getRegisterInfo () {
        let params = {
          doctorPhone: this.phone,
          doctorPwd: this.pwd,
          validateCode: this.code
        }
       const res = await this.$api.post('basic/toRegister.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
           if (res.data.status === 1) {
            var _this = this
            MessageBox.alert('注册成功').then(action => {
              _this.$router.push({
                path: '/completeInfo',
                query: {status: 1, phone: this.phone}
              })
            })
          }
        } else {
          if (res.data.status === 0) {
            // 验证码过期
            MessageBox('提示', '验证码过期')
          } else {
            MessageBox('提示', '验证码有误')
          }
        }
      }
    },
    components: {
      Toast, MessageBox
    },
    computed: {
      btnTxt () {
        return this.time > 0 ? this.time + 's 后重新获取' : '发送验证码'
      }
    }
  }
</script>
<style lang="less">
   body, html{
     height:100%;
   }
  .register{
    padding:0 1rem;
    background: #ffffff;
    .top{
      padding:1rem 0;
      i{
        color: #888888;
        font-size: 1.5rem;
      }
    }
    .logoBox{
      width:11rem;
      height:11rem;
      margin:2rem auto;
      img{
        width:100%;
      }
    }
    .registerBox{
      width: 85%;
      margin: 1rem auto;
      .import{
        width:100%;
        border-bottom: solid 1px #bebebe;
        margin:2rem 0;
        padding: 0.8rem 0;
        position: relative;
        .f1{
          position: absolute;
          top: 5rem;
          width: 100%;
          right: 0;
          text-align: right;
          font-size:1.2rem;
          color: #ff3300;
          span{
            margin-right: 0.3rem;
          }
        }
        .sendCode{
          display: inline-block;
          position: absolute;
          top: 0.8rem;
          right: 0;
          width: 33%;
          border: solid 1px #10d1a0;
          text-align: center;
          color: #10d1a0;
          font-size: 1.3rem;
          padding: 0.5rem 0;
          border-radius: 0.2rem;
        }
        span.active{
          color: #999;
          border: solid 1px #999;
        }
        i{
          font-size:2.6rem;
          color: #10d1a0;
        }
        input{
          font-size:1.4rem;
          color: #999;
          border: none;
          outline: none;
          margin-left: 0.5rem;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers*/
          color:#bebebe;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18*/
          color:#bebebe;
        }
        input::-moz-placeholder {  /* Mozilla Firefox 19+*/
          color:#bebebe;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10+*/
          color:#bebebe;
        }
      }
      .btn{
        width:100%;
        font-size:1.6rem;
        margin-top:5.5rem;
        border-radius: 3rem;
        padding:0.8rem 0;
        text-align:center;
        border:solid 1px #10d1a0;
        color: #fff;
        background: #10d1a0;
      }
      .hasAccount{
        font-size:1.3rem;
        color: #10d1a0;
        display: inline-block;
        margin: 1.5rem 0 1.5rem 30%;
      }
      .isClause{
        position: fixed;
        bottom: 1.4rem;
        left: 22%;
        font-size:1.1rem;
        span{
          color: #10d1a0;
          font-size: 1.5rem;
          display: inline-block;
          vertical-align: sub;
          margin-right: 0.4rem;
        }
      }
    }
  }
</style>
