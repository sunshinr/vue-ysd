<template>
  <div class="add-evaluation-wrap" id="white-background">
    <HeaderBar3 title="添加评估"></HeaderBar3>

    <div class="add-evaluation-main">
      <div>
        <span>评估名称 :</span><input type="text" placeholder="请输入评估名称" v-model="evaluteName">
      </div>
      <router-link :to="{ path:'/AddEvaluationSecond', query: { evaluteName: this.evaluteName} }" ><button type="button">下一步</button></router-link>
    </div>

  </div>
</template>


<script>
  export default {

    name: '',
    data () {
      return {
      evaluteName:""
      }
    },
    created () {
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less">
  html,body{
    height: 100%;

  }
  .add-evaluation-wrap {
    overflow: hidden;


  .add-evaluation-main {
    margin-top: 5.5rem;
    padding: 3rem 1.5rem;

  span {
    font-size: 1.7rem;
  }

  input {
    width: 70%;
    padding: 1rem;
    font-size: 1.5rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
    margin-left: 1rem;
    color: #999999;
  }

  button {
    width: 100%;
    background: #10d1a0;
    color: #ffffff;
    padding: 1.5rem 0;
    margin-top: 7.5rem;
    font-size: 1.5rem;
    border-radius: 0.5rem;
  }

  }
  }

</style>
