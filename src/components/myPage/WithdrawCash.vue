<template>
  <div class="withdrawcash">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <div class="tit">您当前积分</div>
      <div class="score">1200</div>
      <h4 class="buy">提现数量<span>100康币=1元</span></h4>
      <div class="btn">
        <span>￥</span>
        <input type="text" v-model="WithdrawNum" autofocus="autofocus" ref="searchInput">
      </div>
      <div class="introduce">提现下限为1000康币，不足1000不能提现</div>
      <h4 class="payment">提现到</h4>
      <ul class="pay">
        <li class="list">
          <i class="icon iconfont icon-weixin"></i>微信
          <label>
            <span class="icon iconfont" :class="pay == '微信' ? 'icon-xuanzhong1' : 'icon-weixuanzhong2'"></span>
            <input type="radio" v-model="pay" value="微信">
          </label>
        </li>
        <li class="list">
          <i class="icon iconfont icon-zhifubao"></i>支付宝
          <label>
            <span class="icon iconfont" :class="pay == '支付宝' ? 'icon-xuanzhong1' : 'icon-weixuanzhong2'"></span>
            <input type="radio" v-model="pay" value="支付宝">
          </label>
        </li>
      </ul>
      <div class="chargingBtn">确认</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        title: '提现',
        pay: '微信',
        WithdrawNum: ''
      }
    },
    created () {
    },
    mounted () {
      this.$refs.searchInput.focus()
    },
    methods: {
    },
    components: {
    },
    filters: {}

  }
</script>
<style lang="less" scoped>
  @import '../../../static/css/base.less';
  .withdrawcash{
    .box{
      margin-top:6rem;
      overflow: hidden;
      padding:0 1.5rem;
      background: #ffffff;
      .tit{
        font-size:1.5rem;
        color: #00cb97;
        margin-top:4.5rem;
        text-align: center;
      }
      .score{
        font-size:7.2rem;
        color: #00cb97;
        margin-top:1.5rem;
        text-align: center;
        .scale(0.9, 1)
      }
      .buy{
        font-size:1.6rem;
        margin: 4rem 0 1rem 0;
        span{
          font-size:1.2rem;
          color: #616161;
          float: right;
        }
      }
      .btn{
        border:solid 2px #10d1a0;
        .round(0.4rem);
        width:100%;
        overflow: hidden;
        text-align: center;
        padding: 0.5rem 0;
        span{
          font-size: 2.4rem;
          display: inline-block;
          //margin-left: 7.5rem;
          vertical-align: sub;
        }
        input{
          font-size: 2rem;
          padding: 0.8rem 0;
        }
      }
      .introduce{
        font-size:1.2rem;
        color: #818181;
        margin-top:0.8rem;
      }
      .payment{
        font-size:1.6rem;
        margin-top:3rem;
      }
      .pay{
        .list{
          font-size:1.5rem;
          overflow: hidden;
          margin-top:2.3rem;
          i{
            color: #0ab70e;
            margin-right: 1rem;
            font-size: 2.2rem;
            vertical-align: middle;
          }
          label{
            float: right;
            span{
              color: #d5d5d5;
              font-size: 2rem;
            }
            .icon-xuanzhong1{
              color: #10d1a0;
            }
          }
          input{
            display: none;
          }
        }
        .list:last-of-type{
          i{
            color: #08a1f8;
          }
        }
      }
      .chargingBtn{
        margin:8rem 0 2rem 0;
        background: #10d1a0;
        width:100%;
        text-align: center;
        padding:1rem 0;
        color: #ffffff;
        font-size:1.6rem;
        .round(0.3rem)
      }
    }
  }
</style>
