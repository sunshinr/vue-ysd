<template>
  <div class="bindWechatSuc">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <div class="hat">微信账号</div>
      <div class="imgBox">
        <img src="/static/img/userinfo_07.jpg" alt="">
        <span><i class="icon iconfont icon-weixin1"></i></span>
      </div>
      <div class="imgBox">
        <h4>李菲菲</h4>
      </div>
    </div>
    <div class="btn">解除绑定</div>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        title: '绑定微信'
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {},
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .bindWechatSuc{
    .box{
      width: 70%;
      border-radius: 1.6rem;
      border: solid 1px #d9d9d9;
      margin-top: 12rem;
      margin-left: 15%;
      background: #ffffff;
      box-shadow: 4px 3px 36px #d9d9d9;
      .hat{
        width:100%;
        height:7rem;
        background: url("/static/images/bound_03.jpg");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        font-size:1.8rem;
        text-align: center;
        color: #ffffff;
        line-height:5rem;
      }
      .imgBox{
        width:32%;
        margin-left:34%;
        position: relative;
        margin-top:1.5rem;
        img{
          width:100%;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
        }
        span{
          display: inline-block;
          position: absolute;
          right: 0.3rem;
          border: solid 1px #d9d9d9;
          border-radius: 100%;
          padding: 0.2rem 0 0 0;
          background: #ffffff;
          bottom: 0.4rem;
          i{
            font-size: 2.3rem;
            color: #0bb20b;
            border-radius: 100%;
            padding: 0 0.2rem;

          }
        }
        h4{
          margin-top: 1.2rem;
          font-size: 1.8rem;
          width: 100%;
          text-align: center;
          margin-bottom: 5rem;
        }
      }
    }
    .btn{
      width: 92%;
      margin-left: 4%;
      font-size: 1.6rem;
      color: #ffffff;
      padding: 1rem 0;
      text-align: center;
      background: #10d1a0;
      position: fixed;
      bottom: 2rem;
      border-radius: 0.4rem;
    }
  }
</style>
