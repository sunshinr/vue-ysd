<template>
    <div class="login" id="white-background">
      <div class="imgBox"><img src="/static/images/loginIcon_03.png"></div>
      <div class="loginWrap">
        <div class="import">
          <i class="icon iconfont icon-shouji1"></i>
          <input type="text" v-model="phone" placeholder="请输入手机号" autocomplete="off" v-verify.phone="phone" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'"/>
          <label v-remind="phone" class="f1"></label>
        </div>
        <div class="import">
          <i class="icon iconfont icon-mima1"></i>
          <input type="password" v-model="userpwd" placeholder="请输入密码" autocomplete="off" v-verify="userpwd" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'"/>
          <label v-remind="userpwd" class="f1"></label>
        </div>
        <!--<div class="Perfect_information" v-show="wanshan == 1"><i class="icon iconfont icon-jinggao-copy"></i>您的信息还没有完善 <router-link :to="{path:'/completeInfo',query:{ status: 3, phone: this.phone}}">点击完善基本信息</router-link></div>-->
        <div class="Perfect_information freeze" v-show="freezeFlag"><i class="icon iconfont icon-jinggao-copy"></i>您的账户已冻结，解除后可正常使用，如有
          疑问请联系客服029-12345678。</div>
        <div class="btn Lbtn" @click="goLogin">登录</div>
        <div class="btn Rbtn" @click="goReg">注册</div>
        <div class="forget" @click="forgetPwd">忘记密码</div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import verify from 'vue-verify-plugin'
  import { Toast, MessageBox } from 'mint-ui'
  Vue.use(verify, {
    blur: true
  })
  export default {
    data () {
      return {
        phone: '',
        userpwd: '',

        wanshan: 1,
        freezeFlag: false
      }
    },
    verify: {
      phone: ['required', 'mobile'],
      userpwd: [
        'required',
        {
          minLength: 6,
          message: '<span class="icon iconfont icon-jinggao-copy"></span>密码不得小于6位'
        }
      ]
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {
      goReg () {
        this.$router.push({
          path: '/register'
        })
      },
      forgetPwd () {
        this.$router.push({
          path: '/ResetPwd'
        })
      },
      async goLogin () {
        if (this.$verify.check()) {
          let params = {
            doctorPhone: this.phone,
            doctorPwd: this.userpwd
          }
          const res = await this.$api.post('basic/toLogin.do', params)
          console.log(res.data)
          if (res.data.status === 1) {
            //  进入完善信息页面
            var _this = this
            MessageBox.alert('登录成功，请先完善信息').then(action => {
              _this.$router.push({
                path: '/completeInfo',
                query: {status: 1, phone: this.phone}
              })
            })
          } else if (res.data.status === 2) {
            //  审批通过 登录成功进入首页
            localStorage.setItem('doctorId', res.data.doctor.doctorId)
            this.$router.push({
              path: '/'
            })
          } else if (res.data.status === 3) {
            // this.wanshan = 1
            //  审批未通过，继续完善信息
            /* MessageBox.alert('信息不完整，请继续完善信息').then(action => {
              this.$router.push({
                path: '/completeInfo',
                query: {status: 3, phone: this.phone}
              })
            }) */
            this.$router.push({
              path: '/ReviewFailed',
              query: {phone: this.phone}
            })
          } else if (res.data.status === 4) {
            //  账号或密码错误
            MessageBox('提示', '账号或密码错误')
          } else if (res.data.status === 5) {
            // MessageBox('提示', '登录成功，信息已提交，请耐心等待审批')
            this.$router.push({
              path: '/waitReview'
            })
          } else if (res.data.status === 6) {
            MessageBox.alert('您的账户已冻结，解除后可正常使用，如有疑问请联系客服029-12345678。').then(action => {
              this.freezeFlag = true
            })
          }
        }
      }
    },
    components: {
      Toast,
      MessageBox
    }
  }
</script>
<style lang="less">
  body, html{
    height:100%;
  }
  .login{
    padding:2rem 1.5rem;
    .imgBox{
      width:16rem;
      height:16rem;
      margin:4.5rem auto;
      img{
        width:100%;
      }
    }
    .loginWrap{
      padding:0 3rem;
      margin-top:4rem;
      .import{
        width:100%;
        border-bottom: solid 1px #bebebe;
        margin-top: 2rem;
        padding: 0.5rem 0;
        position: relative;
        .f1{
          position: absolute;
          top: 4.5rem;
          width: 100%;
          right: 0;
          text-align: right;
          font-size:1.2rem;
          color: #ff3300;
          span{
            margin-right: 0.3rem;
          }
        }
        i{
          font-size:2.6rem;
          color: #10d1a0;
          float: left;
        }
        input{
          font-size:1.4rem;
          padding: 0.6rem 0;
          color: #666 !important;
          border: none;
          outline: none;
          margin-left: 0.5rem;
          background: #fff;
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
      }
      .Perfect_information{
        height: 2rem;
        color: #666;
        font-size: 1.4rem;
        margin-top: 1rem;
        .icon{
          height: 2rem;
          font-size: 1.5rem;
          margin-right: 0.5rem;
          color: red;
        }
        a{
          color: #10d1a0;
          text-decoration: underline;
        }
      }
      .freeze{
        color: red;
      }
      .btn{
        width:100%;
        font-size:1.6rem;
        margin-top:1.5rem;
        border-radius: 3rem;
        padding:0.6rem 0;
        text-align:center;
        border:solid 1px #10d1a0;
      }
      .Lbtn{
        color: #fff;
        background: #10d1a0;
        margin-top:5.5rem;
      }
      .Rbtn{
        color: #10d1a0;
        background: #fff;
      }
      .forget{
        font-size: 1.4rem;
        color: #10d1a0;
        text-align: center;
        margin-top: 1rem;
        font-weight: 900;
      }
    }
  }

</style>
