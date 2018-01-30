<template>
  <div class="header4" :class="bg">
    <i class="icon iconfont icon-fanhui" @click="goback"></i>
    <div class="head_con">
      <img :src="headUrl.imgurl" alt="">
      <h4>{{ headUrl.name }}</h4>
    </div>
  </div>
</template>


<script>
  import { Header } from 'mint-ui'
  export default {
    data () {
      return {
        bg: this.headUrl.color === 1 ?  'bg-white' : 'bg-green'
      }
    },
    props: ['headUrl'],
    components: {
      'mt-header': Header
    },
    methods: {
      goback:function (){
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less">
  .bg-white{
    background: #fff;
    color: #666;
  }
  .bg-green{
    background: #10d1a0;
    color: #fff;
  }
  .header4{
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    text-align: center;
    padding:0.7rem 1.5rem;
    height: 5.4rem;
    .head_con{
      display: inline-block;
      img{
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 3.2rem;
        float: left;
        margin-top: 0.5rem;
      }
      h4{
        float: left;
        height: 3.2rem;
        line-height: 4rem;
        font-size: 1.5rem;
        margin-left: 1rem;
        margin-top: 0.5rem;        
      }
    }
    .icon-fanhui{
      font-size: 2rem;
      position: absolute;
      left: 1rem;
      top:1.6rem;
    }
  }
</style>

