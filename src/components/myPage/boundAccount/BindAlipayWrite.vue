<template>
  <div class="bingAlipay">
    <HeaderBar3 :title="title"></HeaderBar3>
    <ul>
      <li class="list">
        支付宝账号<input type="text" placeholder="请输入支付宝账号">
      </li>
      <li class="list">
        支付宝实名<input type="text" placeholder="请输入支付宝实名">
      </li>
    </ul>
    <ul class="codeul">
      <li class="list">验证码<input type="text" placeholder="请输入验证码"/> <span @click="sendCode" :class="{active: codeFlag}">发送验证码</span></li>
    </ul>
    <p class="codeFlag" v-show="codeFlag">60秒后可重新获取</p>
    <div class="confirmBtn">确认</div>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        title: '绑定支付宝',
        codeFlag: false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      sendCode () {
        this.codeFlag = true
      }
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .bingAlipay{
    ul{
      margin-top:6rem;
      background: #ffffff;
      padding:0 1.5rem;
      .list{
        padding:1.5rem 0;
        font-size:1.6rem;
        color: #666666;
        border-bottom:solid 1px #d9d9d9;
        input{
          font-size: 1.6rem;
          margin-left: 1.5rem;
        }
      }
    }
    .codeul{
      margin-top:0.5rem;
      input{
        margin-left:4.6rem !important;
        width:30%;
      }
      span{
        float: right;
        font-size: 1.3rem;
        padding: 0.6rem 1.2rem;
        color: #10d1a0;
        border: solid 1px #10d1a0;
        border-radius: 0.3rem;
        margin-top: -0.4rem;
      }
      span.active{
        color: #999999;
        border: solid 1px #999999;
      }
    }
    .codeFlag{
      width:100%;
      padding:0 1.5rem;
      text-align: right;
      font-size:1.4rem;
      margin-top:0.8rem;
    }
    .confirmBtn{
      width: 92%;
      margin-left: 4%;
      font-size: 1.6rem;
      color: #ffffff;
      padding: 1rem 0;
      text-align: center;
      background: #10d1a0;
      margin-top:3.7rem;
      border-radius: 0.4rem;
    }
  }
</style>
