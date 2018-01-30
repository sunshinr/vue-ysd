<template>
  <div class="recharge">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <div class="tit">您当前积分</div>
      <div class="score">1200</div>
      <h4 class="buy">购买数量<span>1元可购买100康币</span></h4>
      <div class="btn">
        <span class="icon iconfont icon-jia" @click="addScore"></span>
        <span>{{standardScore}}</span>
        <span class="icon iconfont icon-jian1" @click="desScore"></span>
      </div>
      <h4 class="payment">选择支付方式</h4>
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
      <div class="chargingBtn">立即充值</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        title: '充值',
        standardScore: 100,
        pay: '微信'
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      addScore () {
        this.standardScore += 100
      },
      desScore () {
        if (this.standardScore >= 100) {
          this.standardScore -= 100
        }
      }
    },
    components: {
    },
    filters: {}

  }
</script>
<style lang="less" scoped>
  @import '../../../static/css/base.less';
  .recharge{
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
        span{
          font-size:1.5rem;
          color: #10d1a0;
          display: inline-block;
        }
        span:nth-of-type(2){
          margin-top: 0.9rem;
          font-size:1.8rem;
          color: #000;
        }
        span:first-of-type{
          padding: 1.4rem 1.6rem;
          float: left;
          border-right:solid 2px #10d1a0;
        }
        span:last-of-type{
          float: right;
          border-left:solid 2px #10d1a0;
          padding: 1.4rem 1.7rem;
        }
      }
      .payment{
        font-size:1.6rem;
        margin-top:5rem;
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
        .round(0.2rem)
      }
    }
  }
</style>
