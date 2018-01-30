<template>
  <div class="wallet">
    <div class="top">
      <i class="icon iconfont icon-fanhui" @click="goback"></i>
      <span>{{scores}}</span>
    </div>
    <div class="operationBtn">
      <router-link to="/WithdrawCash">提现</router-link>
      <router-link to="/ReCharge">充值</router-link>
    </div>
    <ul>
      <li class="list">
        <i class="pay icon iconfont icon-zhifubao"></i> 支付宝
        <span>{{alipayState}}<i class="icon iconfont icon-jiantou"></i></span>
      </li>
      <li class="list">
        <i class="pay icon iconfont icon-weixin"></i> 支付宝
        <span>{{weChatState}}<i class="icon iconfont icon-jiantou"></i></span>
      </li>
    </ul>
    <dl>
      <dt><i class="icon iconfont icon-jilu-mian"></i>记录</dt>
      <div class="contdd">
        <dd>
          <i></i>
          <div class="right">
            <p>11:23</p>
            <h4>使用来自赵春来医师的评估监测。<span>-60</span></h4>
          </div>
        </dd>
        <dd>
          <i></i>
          <div class="right">
            <p>11:23</p>
            <h4>何欢欢医师使用了你的健康方案。<span>+60</span></h4>
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        scores:'',
        alipayState:'',
        weChatState:''
      }
    },
    created () {
      this.showDoctorLis()
    },
    mounted () {

    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      async showDoctorLis(){
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          pageSize: 3,
          currentPage: 1          
        }
        const res = await this.$api.post("personalCenter/indexShowDoctorList.do", params);
        console.log(res.data);
        if (res.data.stateCode === '001') {
          this.scores = res.data.scores;
          if(res.data.number === 0){
            this.alipayState = '未绑定';
            this.weChatState = '未绑定'
          }else if(res.data.number === 1){
            this.alipayState = '已绑定';
            this.weChatState = '已绑定'
          }else if(res.data.number === 2){
            this.alipayState = '已绑定';
            this.weChatState = '未绑定'
          }else if(res.data.number === 3){
            this.alipayState = '未绑定';
            this.weChatState = '已绑定'
          }
        }
      }
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  @import '../../../static/css/base.less';
  .wallet{
    .top{
      width:100%;
      height:18rem;
      background: url("/static/images/walletBg_02.jpg");
      -webkit-background-size: 100% 100%;
      background-size: 100% 100%;
      color: #ffffff;
      i{
        font-size: 2rem;
        margin: 1.5rem 1rem;
        display: inline-block;
        position: absolute;
        z-index:2;
      }
      span{
        .scale(0.9, 1);
        font-size: 8rem;
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 2.5rem;
      }
    }
    .operationBtn{
      background: #ffffff;
      padding:1rem 1.5rem 1.8rem 1.5rem;
      overflow: hidden;
      border-bottom:solid 1px #d9d9d9;
      a{
        display: inline-block;
        width:48%;
        float: left;
        border-radius: 3rem;
        border:solid 1px #10d1a0;
        padding:1.1rem 0;
        text-align: center;
        font-size:1.9rem;
        color: #10d1a0;
      }
      a:last-of-type{
        float: right;
      }
    }
    ul{
      background: #ffffff;
      .list{
        padding:1.3rem 1.5rem;
        border-bottom:solid 1px #d9d9d9;
        font-size:1.6rem;
        color: #555555;
        overflow: hidden;
        .pay{
          font-size: 2.4rem;
          color: #08a1f8;
          margin-right: 1.6rem;
          vertical-align: middle;
        }

        span{
          display: inline-block;
          float: right;
          font-size:1.5rem;
          color: #999999;
          i{
            display: inline-block;
            margin-left:2rem;
            font-size:1.4rem;
          }
        }
      }
      .list:nth-of-type(2){
          .pay{
            color: #0ab70e;
          }
      }
    }
    dl{
      margin-top:0.5rem;
      background: #ffffff;
      dt{
        padding:1.5rem;
        font-size:1.7rem;
        border-bottom:solid 1px #d9d9d9;
        i{
          font-size:2rem;
          color: #ff9313;
          margin-right:2rem;
        }
      }
      .contdd{
        padding:2.2rem 1.5rem;
        dd{
          overflow: hidden;
          position: relative;
          margin-top:-0.7rem;
          i{
            display: inline-block;
            width:2rem;
            height:7.2rem;
            background: url("/static/images/walleticon_03.png");
            -webkit-background-size: 100% 100%;
            background-size: 100% 100%;
            float: left;
          }
          .right{
            float: right;
            width:88%;
            margin-top: 0.4rem;
            p{
              font-size:1.3rem;
              color: #999999;
            }
            h4{
              margin-top:1.2rem;
              font-size:1.5rem;
              color: #666666;
              span{
                float: right;
                font-size:2rem;
                font-weight: bold;
              }
            }
          }
        }
       /* dd:first-of-type{
          z-index:100;
        }*/
      /*  dd:nth-of-type(i){
          .layer(100-i)
        }*/
      }

    }
  }
</style>
