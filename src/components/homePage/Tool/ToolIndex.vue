<template>
    <div class="tool">
      <HeaderBar3 :title="title"></HeaderBar3>
      <ul>
        <li class="list">
          <i class="icon iconfont icon-zhizhen-"></i>
          <router-link to="/BMI">
            <div class="tit">BMI体重指数</div>
          </router-link>
        </li>
        <li class="list">
          <i class="icon iconfont icon-xieya-1"></i>
          <router-link to="/CalculateBP">
            <div class="tit">血压计算</div>
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '常用工具'
      }
    },
    created () {

    },
    methods: {},
    components: {
        // 引入组件
    }
  }
</script>
<style lang="less" scoped>
.tool{
  ul{
    margin-top:5.5rem;
    background: #ffffff;
    padding-left:1.5rem;
    .list{
      overflow: hidden;
      i{
        display: inline-block;
        color: #10d1a0;
        font-size:3rem;
        margin-top: 1.6rem;
      }
      .tit{
        overflow: hidden;
        font-size:1.6rem;
        width:85%;
        float: right;
        padding:2rem 0;
        border-top:solid 1px #d9d9d9;
      }
    };
    .list:first-child{
      .tit{
        border: none;
      }
    };
    .list:nth-of-type(2){
      i{
        color: #ff5c36;
      }
    }
  }
}
</style>
