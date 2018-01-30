<template>
  <div class="view-evaluation-wrap">
    <HeaderBar3 :title="evaluteName+'评估'" ></HeaderBar3>
    <div class="view-evaluation-main">
      <dl v-for="item in evaluateInsInfo" :key="item.id">
        <dt>{{item.optionNum}}.{{item.questionTitle}}<span v-if="item.optionType == 2">（多选）</span></dt>
        <textarea placeholder="请输入" v-if="item.optionType == 3"></textarea>
        <dd v-for="ite in item.questionContent" :key="ite.id" v-else>{{ite.content}}</dd>
      </dl>

    </div>

  </div>
</template>


<script>
  export default {
    name: '',
    data: function () {
      return {
        title: '高血压',
        evaluateInsInfo:'',
        evaluteName:''
      }
    },
    async created () {
      let params = {
        'id': this.$route.query.evaluateId
      }
      const res = await this.$api.post('doctorEvaluate/getEvaluateInformation.do', params)
      console.log(res.data)
      if (res.data.stateCode == '001') {
          this.evaluteName=res.data.title
          this.evaluateInsInfo = res.data.evaluateInsInfo
      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    mounted () {
    },
    methods: {},
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .view-evaluation-wrap {
    margin-top: 6.5rem;
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
