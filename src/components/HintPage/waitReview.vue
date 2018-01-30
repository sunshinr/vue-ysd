<template>
  <div class="waitReview" id="white-background">
    <img src="/static/images/reviewIcon2.png" alt="">
    <p>请耐心等待审核，审核通过之后您将可以使用 健康由我  医生助手</p>

    <router-link to="/login">重新登录>> </router-link>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {},
    components: {
      // 引入组件
    }
  }
</script>

<style lang="less">
  body, html{
    height:100%;
  }
  .waitReview{
    padding:0 4.4rem;
    img{
      width: 84%;
      height: 8.3rem;
      margin:18rem auto 3rem 8%;
    }
    p{
      font-size:1.5rem;
      color: #666666;
      text-align: center;
    }
    a{
      display: block;
      text-align: center;
      font-size:1.5rem;
      color: #10d1a0;
      margin-top:25rem;
    }
  }
</style>

