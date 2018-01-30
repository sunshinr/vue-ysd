<template>
  <div class="adjustment-scheme-wrap">

    <div class="adjustment-scheme-header">
      <headerBar4 :headUrl="headUrl"></headerBar4>
      <span>新增食谱</span>
    </div>

    <div class="adjustment-scheme-main">
      <div class="adjustment-scheme-top">
        <h1>高血压、肥胖症健康调理方案</h1>
        方案周期<input type="text" placeholder="30"> <span>天</span>
      </div>

      <!--运动项目-->
      <ul class="adjustment-scheme-sport-event">
        <h2 class="clear">
          <span>运动项目</span>
          <i class="icon iconfont icon-plus"></i>
        </h2>

        <li class="clear">
          <i class="icon iconfont icon-paobu-"></i>
          <div class="clear">
            <span>跑步柔韧45</span>
            <span class="color-orange">1500米</span>
            <i class="icon iconfont icon-bi-"></i>
            <i class="icon iconfont icon-shanchu"></i>
          </div>
        </li>

        <li class="clear">
          <i class="icon iconfont icon-xiadun-"></i>
          <div class="clear">
            <span>深蹲人</span>
            <span class="color-orange">50个</span>
            <i class="icon iconfont icon-bi-"></i>
            <i class="icon iconfont icon-shanchu"></i>
          </div>
        </li>

        <li class="clear">
          <i class="icon iconfont icon-lashen-"></i>
          <div class="clear">
            <span>柔韧</span>
            <span class="color-orange">15分钟</span>
            <i class="icon iconfont icon-bi-"></i>
            <i class="icon iconfont icon-shanchu"></i>
          </div>
        </li>
      </ul>

      <!--食谱-->
      <div class="Recipes_con">
        <h2 class="clear">
          <span>食谱 (21)</span>
          <i class="icon iconfont icon-plus"></i>
        </h2>

        <ul class="list_con dp_fix">
          <h4>早餐</h4>
          <div class="list_li">
            <li> 西红寺
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
            <li>鸡蛋
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
          </div>
        </ul>
        <ul class="list_con dp_fix">
          <h4>午餐</h4>
          <div class="list_li">
            <li>苹果
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
            <li>西红寺
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
            <li>胡辣汤
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
            <li>油泼面
              <i class="icon iconfont icon-bi-"></i>
              <i class="icon iconfont icon-shanchu"></i>
            </li>
          </div>
        </ul>
      </div>

      <!--标语-->
     <ul class="tips">
       <li>1. 做有氧运动前1小时，可先吃点小零食补充能量如高纤全麦饼2片+低脂奶或豆浆</li>
       <li>2. 运动后及时补充水分，可在开水中加入一小勺柠檬或果汁，建议1个半小时之后再进食</li>
     </ul>

      <button type="button">完成</button>
    </div>

  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        headUrl: {
          imgurl: 'https://img04.sogoucdn.com/net/a/04/link?appid=100520040&url=http://i03.pic.sogou.com/3c28af542f2d49f7-fe9c78d2ff4ac332-769c583095169d96a828bfbd8975b55f_qq',
          name: '徐清芳',
          color: 2
        }
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
  @color999999: #999999;
  @bordercolor: #d9d9d9;
  @color666666: #666666;
  @color333333: #333333;

  .adjustment-scheme-wrap {

  .adjustment-scheme-header {
  span {
    position: fixed;
    z-index: 99;
    right: 1rem;
    top: 1.5rem;
    color: #ffffff;
    font-size: 1.3rem;
  }
  }
  .adjustment-scheme-main {
    margin-top: 5.2rem;
  /* background: #ffffff;*/
  .adjustment-scheme-top {
    font-size: 1.7rem;
    color: @color333333;
    padding: 0 1.5rem;
    background: #ffffff;
  h1 {
    padding: 2rem 0 2.5rem;
    font-size: 2.1rem;
  }
  input {
    width: 63%;
    background: #f5f5f5;
    margin: 0 -1rem 2rem 1rem;
    padding: 1.25rem 2rem 1.25rem 1.5rem;
    font-size: 1.5rem;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    color: @color999999;
  }
  span {
    background: #f5f5f5;
    padding: 1.25rem 1rem;
    font-size: 1.5rem;
    color: @color999999;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
  }

  h2 {
    font-size: 1.7rem;
    color: @color666666;
    background: #f5f5f5;
    padding: 1.2rem 1.5rem;
  span {
    position: relative;
    top: 0.5rem;
  }
  .icon {
    font-size: 3.3rem;
    color: #10d1a0;
    float: right;

  }
  }
  .adjustment-scheme-sport-event {
    background: #ffffff;
  li {
    padding: 1.3rem 0 1.5rem 1.5rem;
    font-size: 1.6rem;
    color: @color333333;
  .icon {
    color: #10d1a0;
    font-size: 2.5rem;
  }
  & > .icon {
      font-size: 4rem;
      float: left;
    }
  & > div {
      width: 80%;
      float: right;
      position: relative;
      top: 0.6rem;
      border-bottom: 1px solid @bordercolor;
      padding: 0 1.5rem 1rem 0;

  span {
  &:first-child {
     width: 6rem;
     display: inline-block;
   }
  &:last-of-type {
     width: 10rem;
     display: inline-block;
     text-align: center;
   }
  }
  .icon {
    float: right;
  &:last-of-type {
     margin-right: 2rem;
   }
  }

  }
  .color-orange {
    color: #ffaa3e;
  }
  }

  }

  .Recipes_con {
  ul {
    background: #ffffff;

  }
  .dp_fix {
    display: flex;
    margin-bottom: 0.5rem;
  &:last-of-type {
     margin-bottom: 0;
   }
  }
  h4 {
    width: 24%;
    text-align: center;
    height: 6.4rem;
    line-height: 6.4rem;
    font-size: 1.8rem;
    color: #10d1a0;
  }
  .list_li {
    width: 80%;
  li {
    padding: 2.1rem 0;
    border-top: solid 1px #d9d9d9;
    height: auto;
    overflow: hidden;
    font-size: 1.6rem;
    color: @color333333;
  .icon {
    float: right;
    font-size: 2.5rem;
    margin-right: 1.7rem;
    color: #10d1a0;
  }
  }
  li:first-child {
    border: none;
  }
  }

  }

  .tips {
    font-size: 1.5rem;
    color: @color999999;
  li {
    padding: 1.5rem 1.5rem 0;

  }
  }
  button{
    width: 92%;
    margin: 1.3rem 1.5rem;
    padding: 1.3rem 0;
    font-size: 1.6rem;
    color: #ffffff;
    border-radius: 0.4rem;
    background: #10d1a0;
  }
  }
  }

</style>
