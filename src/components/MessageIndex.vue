<template>
  <div class="messageInd">
    <headerBar title="健康由我 医生助手"></headerBar>
    <!--<loading v-show="loading == 0"></loading>-->
    <!--系统消息-->
    <div v-show="loading == 1">
      <div class="SystemMessage">
        <div class="icon_con">
          <i class="icon iconfont icon-jinlingyingcaiwangtubiao96"></i>
        </div>
        <div class="SystemMessageText">
          <router-link to="/Systemmessage">
            <h3>系统消息 <span>21:38</span></h3>
            <p>您的问题我们已经收到，我们会尽快... <i></i></p>
          </router-link>
        </div>
      </div>
      <ul class="message_list">
        <li v-for="item in schemeModelList" :key="item.id">
          <div class="HeadImg_con">
            <mt-badge size="small">1</mt-badge>
            <img :src="item.memberImg" class="headImg" alt="">
          </div>
          <div class="message_text">
            <router-link :to="'/dialogue'+1">
              <h3>{{item.memberName}} <span>12:33</span></h3>
              <p>好的，稍后我会联系你</p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>

    <!--聊天列表-->

    <footerBar selectedVal="Message"></footerBar>
  </div>
</template>

<script>
  import { Badge } from 'mint-ui'
  import loading from './common/loading.vue'
  import api from './fetch/api'
  export default {
    data () {
      return {
        selected: 1,
        loading:0,
        schemeModelList:[]
      }
    },
    async created (){
      let params = {
        'doctorId': 128
      }
      const res = await api.post('doctorConsult/getConsults.do', params)
      if (res.data.stateCode === '001') {
        this.schemeModelList = res.data.consultList;
        console.log(this.schemeModelList);
        this.loading = 1;


        // this.nowCode = res.data.validateCode
      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    components: {
      'mt-badge':Badge,
      'loading':loading
    }
  }
</script>

<style lang="less" scoped>
  .messageInd{
    padding: 5.4rem 0 0;
    .SystemMessage{
      padding: 1rem;
      background: #fff;
      margin: 1rem 0;
      height: auto;
      overflow: hidden;
      .icon_con{
         width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
        background: #ff9313;
        line-height: 5rem;
        text-align: center;
        color: #fff;

        float: left;
        i{
          display: block;
          font-size: 3rem;
          line-height: 5.3rem;
        }
      }
      .SystemMessageText{
        display: inline-block; height: 5rem;margin-left: 1rem; width: 80%;
        h3{
          font-size: 1.6rem;
          width: 100%;
          margin-top: 0.3rem;
          span{
           float: right;
            font-size: 1.4rem;
            color: #ccc;
          }
        }
        p{
          font-size: 1.4rem;
          line-height: 2rem;
          height: 2rem;
          margin-top: 0.3rem ;
          color: #999999;
          i{
            width: 1rem;
            height:1rem;
            background: #f23030;
            display: block;
            float: right;
            border-radius:1rem;
            margin-top: 0.5rem;
          }
        }

      }
    }
    .message_list{
      border-top: solid 1px #dfdfdf;
      border-bottom: solid 1px #dfdfdf;
      background: #fff;
      li{
        padding: 1rem 0 0rem 1rem;
        height: auto;
        overflow: hidden;
        .HeadImg_con{
          width: 5rem;
          float: left;
          position: relative;
          span{
            background: #f23030;
            position: absolute;
            right: 0;
          }
          .headImg{
            width: 5rem;
            height: 5rem;
            border-radius:5rem;
            border: solid 1px #dddddd;
          }
        }
        .message_text{
          width: 80%;
          float: left;
          margin-left: 1rem;
          h3{
            font-size: 1.6rem;
            margin-top: 0.3rem;
            span{
              font-size: 1.2rem;
              float: right;
              margin-top: 0.2rem;
              color: #999;
            }
          }
          p{
            font-size: 1.4rem;
            color: #999999;
            margin-top: 0.5rem;
            padding-bottom: 1.2rem;
            border-bottom: solid 1px #d9d9d9;
          }
        }
      }
      li:last-child p{
        border: none;
      }
    }
  }
</style>
