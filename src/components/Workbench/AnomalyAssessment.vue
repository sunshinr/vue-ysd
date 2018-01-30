<template>
  <div class="view-evaluation-wrap">
    <HeaderBar3 :title="title+'评估'"></HeaderBar3>
    <span class="release" @click="updataRelease()" v-if="this.$route.query.type=='updata'">发布</span>
    <span class="release" @click="release()" v-else>发布</span>
    <div class="view-evaluation-main">
      <dl v-for="item in evaluate" :key="item.id">
        <dt>{{item.optionNum}}.{{item.questionTitle}}<span v-if="item.optionType == 1">（多选）</span></dt>
        <textarea placeholder="请输入" v-if="item.optionType == 2"></textarea>
        <dd v-for="ite in item.questionContent" :key="ite.id" v-else>{{ite.content}}</dd>
      </dl>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data: function() {
      return {
        title: localStorage.getItem("evaluateTitle"),
        titleUrl: '/myAssess', // 跳转路由
        evaluate: ""
      }
    },
    created() {
      this.voluation()
    },
    mounted() {},
    methods: {
      voluation() {
        this.evaluate = JSON.parse(localStorage.getItem("evaluateQuestion"))
        //- -this.evaluateQuestion = JSON.parse(this.evaluateQuestion)
        for (let i = 0; i < this.evaluate.length; i++) {
          this.evaluate[i] = JSON.parse(this.evaluate[i])
        }
        console.log(this.evaluate)
      },
      async release() {
        let params = {
          evaluateTitle: localStorage.getItem("evaluateTitle"),
          evaluateQuestion: localStorage.getItem("evaluateQuestion"),
          doctorId: localStorage.getItem('doctorId')
        };
        const res = await this.$api.post(
          "doctorEvaluate/saveEvaluate.do",
          params
        );
        console.log(res.data)
        if(res.data.stateCode=='001'){
          this.$router.push(this.titleUrl)
        }
      },
      async updataRelease() {
        let params = {
          evaluateTitle: localStorage.getItem("evaluateTitle"),
          evaluateQuestion: localStorage.getItem("evaluateQuestion"),
          evaluateId:this.$route.query.evaluateId

        };
        const res = await this.$api.post(
          "doctorEvaluate/updateEvaluate.do",
          params
        );
        if(res.data.stateCode=='001'){
          this.$router.push(this.titleUrl)
        }
      }
    },
    components: {},
    filters: {}
  }
</script>


<style lang="less" scoped>
  .view-evaluation-wrap {
    margin-top: 6.5rem;
    .release {
      position: fixed;
      top: 1.6rem;
      right: 1.2rem;
      color: #fff;
      z-index: 99;
      font-size: 1.6rem;
    }
    .view-evaluation-main {
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
  }
</style>
