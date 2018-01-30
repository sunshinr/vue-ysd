<template>
  <div class="add-assessment-result-wrap">
    <HeaderBar3 title="评估结果"></HeaderBar3>
    <span class="yulan" @click="subAssessment(0)">保存</span>
    <div class="add-assessment-result-main">
      <div>
        <h3>评估结果</h3>
        <textarea placeholder="请用简洁的语言描述您的评估，例如：偏胖" id="assessment-result" v-model="evaluateInsInfo.doctorComment"></textarea>
      </div>

      <div>
        <h3>评估结果</h3>
        <textarea placeholder="请在这里输入指导建议，例如：每天做仰卧起坐20个" v-model="evaluateInsInfo.doctorSuggest"></textarea>
      </div>

    </div>

    <button type="button" @click="subAssessment(1)">评估结果</button>
    <p class="tip">提交生成评估结果发送给患者，或者您可以先保存为草稿</p>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        titleUrl: '',// 跳转路由
        evaluateInsInfo:''
      }
    },
    async created () {
      let params = {
        //'modelType': this.$route.query.modelType,
        'id':this.$route.query.id
      }
      const res = await this.$api.post('doctorEvaluate/getEvaluateInsInfo.do', params)
      console.log(res.data)
      if (res.data.stateCode == '001') {
        this.evaluateInsInfo =res.data.evaluateInsInfo
        //this.titleUser = res.data.evaluateInsInfo.memberName
        //this.titleTip = res.data.evaluateInsInfo.title
        //this.evaluateInsInfo = res.data.evaluateInsInfo
        //this.voList = res.data.evaluateInsInfo.evaluateQuestions
        //this.instanceVos = res.data.evaluateInsInfo.instanceVos
      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }      
    },
    mounted () {
      
    },
    methods: {
      async subAssessment(e) {
      let params = {
        //'modelType': this.$route.query.modelType,
        evaluateResultId:this.$route.query.id,
        doctorComment:this.evaluateInsInfo.doctorComment,
        doctorSuggest:this.evaluateInsInfo.doctorSuggest,
        saveType:e
      }
      const res = await this.$api.post('doctorEvaluate/saveDoctorComment.do', params)
      if (res.data.stateCode == '001') {
        this.$router.push({
          path:'/CommentSuggest',
          query:{evaluateId:this.$route.query.evaluateId}
          })
      }
      }
    },
    components: {
    },
    filters: {}

  }
</script>


<style lang="less" scoped>
  .add-assessment-result-wrap {
.yulan {
    position: fixed;
    top: 1.8rem;
    right: 1.2rem;
    color: #fff;
    z-index: 99;
    font-size: 1.6rem;
}
  .add-assessment-result-main {
    margin-top: 6.5rem;
  & > div {
      background: #fff;
      padding: 1.8rem 1.5rem;
  h3 {
    font-size: 1.7rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
  #assessment-result {
    height: 9.15rem;
  }
  textarea {
    border: 1px solid #d9d9d9;
    width: 100%;
    height: 13.65rem;
    border-radius: 0.4rem;
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
    color: #999999;
    line-height: 2rem;
    letter-spacing: 1px;
  }
  }
  }

  button {
    background: #10d1a0;
    width: 92%;
    padding: 1.5rem 0;
    color: #fff;
    font-size: 1.6rem;
    margin: 10.5rem 4% 1.3rem;
    border-radius: 0.4rem;
  }
  .tip{
    color: #999;
    font-size: 1.2rem;
    text-align: center;
  }
  }

</style>
