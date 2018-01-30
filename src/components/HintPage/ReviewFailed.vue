<template>
    <div class="ReviewFailed" id="white-background">
      <img src="/static/images/reviewIcon.png" alt="">
      <p>抱歉，审核未通过！这里是审核意见，请重 新完善信息</p>
      <span @click="goComplete">完善信息</span>
      <router-link to="/login">重新登录>></router-link>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        numberPhone: ''
      }
    },
    created () {
      this.numberPhone = this.$route.query.phone
      console.log(this.numberPhone)
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {
      goComplete () {
        this.$router.push({
          path: '/completeInfo',
          query: {status: 3, phone: this.numberPhone}
        })
      }
    },
    components: {
        // 引入组件
    }
  }
</script>

<style lang="less">
  body, html{
    height:100%;
  }
.ReviewFailed{
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
  span{
    display: block;
    width: 45%;
    padding: 1rem 0;
    text-align: center;
    border-radius: 3rem;
    border: solid 1px #10d1a0;
    color: #10d1a0;
    font-size: 1.6rem;
    margin: 7rem auto;
  }
  a{
    display: block;
    text-align: center;
    font-size:1.5rem;
    color: #10d1a0;
  }
}
</style>
