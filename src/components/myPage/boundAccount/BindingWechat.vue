<template>
  <div class="bindWechat">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <div class="boxBg"><i class="icon iconfont icon-bangdingweixin"></i></div>
      <p>未绑定微信...</p>
    </div>
    <div class="btn">绑定微信</div>
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
  .bindWechat{
    .box{
      padding:4rem 0;
      width: 70%;
      border-radius: 1.6rem;
      border: solid 1px #d9d9d9;
      margin-top: 12rem;
      margin-left: 15%;
      background: #ffffff;
      box-shadow: 4px 3px 36px #d9d9d9;
      .boxBg{
        width:18.5rem;
        height:9.5rem;
        background: url("/static/images/bingno_03.jpg");
        -webkit-background-size: 100% 100%;
        background-size: 100% 100%;
        position: relative;
        margin:0 0 2rem 4rem;
        i{
          font-size: 6.8rem;
          color: #10d1a0;
          position: absolute;
          top: 2.5rem;
          left: 6.1rem;
        }
      }
      p{
        width:100%;
        text-align: center;
        font-size:1.6rem;
        color: #999999;
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
