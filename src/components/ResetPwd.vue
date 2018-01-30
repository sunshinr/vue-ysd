<template>
    <div class="resetPwd">
      <HeaderBar3 :title="title"></HeaderBar3>
      <div class="registerBox">
        <div class="import">
          <i class="icon iconfont icon-shouji1"></i>
          <input type="tel" v-model="phone" v-verify.phone="phone" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'"/>
          <span class="sendCode" @click="sendCode" :class="{active : time>0}">{{btnTxt}}</span>
          <label v-remind="phone" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-yanzhengma"></i>
          <input type="number" v-model="code" v-verify="code" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'"/>
          <label v-remind="code" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-mima1"></i>
          <input type="text" v-model="pwd" v-verify="pwd" placeholder="请输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"/>
          <label v-remind="pwd" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-querenmima"></i>
          <input type="text" v-model="rePwd" v-verify="rePwd" placeholder="请再次输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"/>
          <label v-remind="rePwd" class="f1"></label>
        </div>
        <div class="btn" @click="submit">完成</div>
      </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import verify from 'vue-verify-plugin'

  import { Toast, MessageBox } from 'mint-ui'
  Vue.use(verify, {
    blur: true
  })
  export default {
    data () {
      return {
        title: '重置密码',
        phone: '',
        code: '',
        pwd: '',
        rePwd: '',
        nowCode: '', // 验证码,
        second: 10, // 发送验证码倒计时
        time: 0,
        open: true, // 判断是否发送验证码
        sessionId: ''
      }
    },
    verify: {
      phone: ['required', 'mobile'],
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
          message: '<span class="icon iconfont icon-jinggao-copy"></span>两次输入的密码不一致！'
        }
      ]
    },
    created () {
    },
    async mounted () {
    },
    methods: {
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
              status: 1
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
                  message: '该账号不存在',
                  iconClass: 'icon iconfont icon-cuowutishi1'
                })
              }
            } else if (res.data.stateCode === '002') {
              console.log('参数异常')
            } else {
              console.log('系统错误')
            }
          } else {
            /* Toast({
              message: '手机号码格式不正确',
              iconClass: 'icon iconfont icon-cuowutishi1'
            }) */
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
          this.getForgetPassword()
        }
      },
      async getForgetPassword () {
        let params = {
          doctorPhone: this.phone,
          doctorPwd: this.pwd,
          validateCode: this.code
        }
        console.log(params)
        const res = await this.$api.post('basic/toForgetPassword.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          var _this = this
          if (res.data.status === 0) {
            // 验证码过期
            MessageBox('提示', '验证码过期')
          } else if (res.data.status === 1) {
            // 找回密码成功
            MessageBox.alert('重置密码成功').then(action => {
              _this.$router.push({
                path: '/login'
              })
            })
          } else if (res.data.status === 2) {
            // 验证码有误
            MessageBox('提示', '验证码有误')
          } else {
            // 账号不存在
            MessageBox('提示', '账号不存在')
          }
        }  else {
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
      Toast,
      MessageBox
    },
    computed: {
      btnTxt () {
        return this.time > 0 ? this.time + 's 后重新获取' : '发送验证码'
      }
    }
  }
</script>
<style lang="less">
  body{
    background: #ffffff;
  }
  .resetPwd{
    padding:0 1rem;
    .registerBox{
      width: 85%;
      margin: 9rem auto;
      .import{
        width:100%;
        border-bottom: solid 1px #bebebe;
        margin:2rem 0;
        padding: 0.8rem 0;
        position: relative;
        .f1{
          position: absolute;
          top: 3.6rem;
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
          top: 0.2rem;
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
          font-size:1.6rem;
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
    }
  }
</style>
