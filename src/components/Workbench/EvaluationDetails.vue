<template>
  <div class="evaluation-details-wrap">
    <HeaderBar3 :title="title+'评估'" :titleBtnTxt="kangbiNum"></HeaderBar3>
    <i class="jinbi-icon header-icon"></i>
    <div class="evaluation-details-top clear">
      <img :src="assessInfo.doctorPic">
      <span>{{assessInfo.doctorName}}</span>
      <button type="button" @click="collectFn" v-text="collectStatus ? '已收藏' : '收藏'" :class="{active:collectStatus==true}"></button>
    </div>
    <div class="evaluation-details-main">
      <!-- <dl>
          <dt>1.您曾经患有高血压吗？</dt>
          <dd>从未患有</dd>
          <dd>曾经患有</dd>
          <dd>目前患有</dd>
        </dl>-->
      <dl v-for="(item, index) in assessInfo.questions" :key="index">
        <dt>{{index+1}}.{{item.questionTitle}}？<span v-show="item.type == 1">（多选）</span></dt>
        <dd v-for="(list, i) in item.options" v-show="item.type != 2" :key="list.id">{{list.content}}</dd>
        <textarea placeholder="请输入" v-show="item.type == 2"></textarea>
      </dl>
      <!-- <dl>
          <dt>3.您平时身体健康情况如何？</dt>
          <textarea placeholder="请输入"></textarea>
        </dl>-->
    </div>
    <!--弹窗层-->
    <div class="evaluation-details-popup-wrap" v-show="popupStatus">
      <div class="popup">
        <h3>收藏需支付：<i class="jinbi-icon"></i> <span>{{kangbiNum}}</span></h3>
        <p>我的康币：{{myschemeScore}}</p>
        <ul class="clear">
          <li @click="cancelFn">取消</li>
          <li @click="payFn">支付</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import api from '../fetch/api'
  import { MessageBox, Toast } from 'mint-ui'  
  export default {
    name: '',
    data() {
      return {
        title: '高血压风险',
        kangbiNum: 0, // 康币数
        popupStatus: false,
        collectStatus: false,
        assessInfo: {},
        myschemeScore: 0,
        isCollection:''
      }
    },
    async created() {
      this.selected = '1'
      console.log(this.$route.query.id)
      this.requestDataApi()
    },
    mounted() {
      // 没收藏模糊层
    },
    methods: {
      // collectFn() { // 点击收藏按钮
      //   this.popupStatus = true
      // },
      async collectFn () {
        if (this.collectStatus === false) {
          this.popupStatus = true
        }
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }

        const res = await api.post('basic/getIndexBasic.do', params)
        if (res.data.stateCode === '001') {
         console.log(res.data)
         this.myschemeScore = res.data.doctorDynamicVo.candy
        }

      },      
      payFn() { // 点击弹窗支付按钮
        
        this.collection()

        
      },
      cancelFn() { // 点击弹窗取消按钮
        this.popupStatus = false
      },
      vague(isCollection){
        let _this=this
        setTimeout(function() {
          console.log(isCollection)
          if(isCollection === 0){
          $(".evaluation-details-main dl:gt(0)").addClass('vague')
          }else{
          _this.collectStatus = true
          }
        }, 300)        
      },
      async requestDataApi() {
        let params = {
          systemEvaluateId: this.$route.query.id,
          doctorId:localStorage.getItem('doctorId')
        }
        const res = await api.post('systemEvaluate/evaluateInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode == '001') {
          this.assessInfo = res.data.systemEvaluate
          this.title = res.data.systemEvaluate.title
          this.kangbiNum = res.data.systemEvaluate.evaluateScore
          this.isCollection = res.data.systemEvaluate.isCollection
          this.vague(res.data.systemEvaluate.isCollection)
        } else if (res.data.stateCode === '002') {
          console.log('参数异常')
        } else {
          console.log('系统错误')
        }
      },
      async collection(){
        console.log(this.myschemeScore - this.kangbiNum)
        if((this.myschemeScore - this.kangbiNum) < 0 ){
          
          MessageBox.confirm('是否前往充值？','康币不足').then(action => {
            this.$router.push({path:'/ReCharge'})
          });
        }else{
        let params = {
          systemEvaluateId: this.$route.query.id,
          doctorId:localStorage.getItem('doctorId')
        }
        const res = await api.post('systemEvaluate/evaluateMark.do', params)
        if(res.data.stateCode ==='001'){
        this.collectStatus= true
        this.popupStatus = false
        $(".evaluation-details-main dl").removeClass('vague')
        }
        }
      }
    },
    components: {},
    filters: {}
  }
</script>


<style lang="less" scoped>
  .evaluation-details-wrap {
    .header-icon {
      position: fixed;
      right: 4.9rem;
      top: 1.8rem;
      z-index: 1;
    }
    .jinbi-icon {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: url("../../../static/img/kangbi_03.png") no-repeat;
      background-size: 100% 100%;
      z-index: 99;
    }
    .evaluation-details-top {
      margin-top: 5.5rem;
      padding: 1.5rem;
      background: #ffffff;
      font-size: 1.5rem;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        margin-right: 1.1rem;
      }
      span {
        font-size: 1.5rem;
        color: #333333;
        position: relative;
        top: 0.4rem
      }
      button {
        float: right;
        color: #10d1a0;
        border: 1px solid #10d1a0;
        padding: 1rem 4rem;
        background: #ffffff;
        border-radius: 0.4rem;
        font-size: 1.6rem;
      }
      .active {
        color: rgb(128, 128, 128);
        background: rgb(235, 235, 235);
        border: solid 0px #10d1a0;
      }
    }
    .evaluation-details-main {
      margin: 1rem 1.5rem;
      dl {
        background: #fff;
        margin-bottom: 0.5rem;
        padding: 1.8rem 1.6rem;
        dt {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #333;
        }
        dd {
          font-size: 1.4rem;
          margin: 0 1rem 0.5rem;
          min-width: 19rem;
          padding: 1.2rem;
          background: #f0f0f0;
          text-align: center;
          border-radius: 0.3rem;
        }
        .active {
          background: #10d1a0;
          color: #ffffff;
        }
        textarea {
          width: 100%;
          border: 1px solid #d9d9d9;
          border-radius: 0.5rem;
          font-size: 1.4rem;
          padding: 1.2rem;
          height: 9.4rem;
          color: #666666;
          letter-spacing: 1px;
        }
      }
    }
    .evaluation-details-popup-wrap {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9;
      .popup {
        background: #ffffff;
        padding: 1rem 0 0;
        border-radius: 0.4rem;
        width: 70%;
        margin: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        h3 {
          color: #333333;
          font-size: 1.7rem;
          padding: 0 2rem;
          i {
            display: inline-block;
            position: relative;
            top: 0.5rem;
            width: 2.3rem;
            height: 2.3rem;
            margin: 0 0.7rem;
          }
          span {
            color: #ff9b0d;
          }
        }
        p {
          color: #999999;
          font-size: 1.5rem;
          margin: 1rem 0 2rem;
          padding: 0 2rem;
        }
        ul {
          li {
            width: 50%;
            float: left;
            text-align: center;
            border-top: 1px solid #dbdbdb;
            padding: 1.6rem 0;
            color: #10d1a0;
            font-size: 1.7rem;
            &:first-of-type {
              border-right: 1px solid #d9d9d9;
            }
          }
        }
      }
    }
    .vague {
      filter: blur(4px);
    }
  }
</style>
