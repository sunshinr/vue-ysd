<template>
  <div class="message_programme">
    <headerBar3 title="选择方案" titleBtnTxt="发送(1)" titleUrl="/"></headerBar3>

    <mt-navbar class="page-part" v-model="tabSelected">
      <mt-tab-item id="1">评估检测</mt-tab-item>
      <mt-tab-item id="2">健康方案</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="tabSelected">
      <mt-tab-container-item id="1">
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="programme_list">
          <li>
            <input type="radio" id="one" :value="value1" v-model="picked">
            <label for="one" class="icon iconfont " :class=" picked == value1 ? 'icon-xuanzhong1' : 'icon-weixuanzhong2'"></label>
            <p>{{ value1 }}</p>
          </li>
          <li>
            <input type="radio" id="two" :value="value2" v-model="picked">
            <label for="two" class="icon iconfont " :class=" picked == value2 ? 'icon-xuanzhong1' : 'icon-weixuanzhong2'"></label>
            <p>{{ value2 }}</p>
          </li>
        </ul>
        <p>{{ picked }}</p>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>


<script>
  import { Navbar, TabItem, Progress } from 'mint-ui'
  export default {
    data () {
      return {
        tabSelected: '2',
        picked: '',
        value1:'高血压、高风险肥胖症人群健康方案',
        value2:'高血压、高风险肥胖症人群健康方案，显示两行显示两行'
      }
    }
  }
</script>

<style lang="less">
  .message_programme{
    padding: 5.4rem 0 0;
    /*mint修改样式start*/
    .page-part{
      position: fixed;
      width: 100%;
      z-index: 999;
    }
    .mint-navbar {
      border-bottom: solid 1px #d9d9d9;
      .mint-tab-item {
        color: #ccc;
      }
      .mint-tab-item-label {
        font-size: 1.6rem;
      }
      .is-selected {
        border-bottom: 3px solid #10d1a0;
        color: #10d1a0;
        margin-bottom: -1px;
      }
    }
    .mint-tab-container{
      top:5.4rem
    }
    /*mint修改样式end*/

    .programme_list{
      margin-top: 0.6rem;
      background: #fff;
      li{
        padding: 2rem;
        border-top:solid 1px #d9d9d9;
        height: auto;
        overflow: hidden;
        input{
          display: none;
        }
        label{
          display: block;
          width: 2.5rem;
          height: 2.5rem;
          text-align: center;
          line-height: 2.5rem;
          font-size: 2rem;
          float: left;
          margin-right: 1rem;
        }
        p{
          float: left;
          font-size: 1.6rem;
          line-height: 2.5rem;
          color: #333;
          max-width: 87%;
        }
        .icon-xuanzhong1{
          color: #10d1a0;
        }
        .icon-weixuanzhong2{
          color: #ccc;
        }
      }
      li:first-child{
        border: none;
      }
    }
  }
</style>
