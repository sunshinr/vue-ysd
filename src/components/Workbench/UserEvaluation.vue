<template>
  <div class="user-evaluation-wrap">
    <HeaderBar3 :title="titleUser+titleTip+'评估'"></HeaderBar3>
    <div class="view-evaluation-main" v-if="modelType == 1">
      <dl v-for="item in instanceVos" :key="item.id">
        <dt>{{item.seq}}.{{item.title}}<span v-if="item.type == 2">（多选题）</span></dt>
        <dd :class="{active:ite.choose ==1}" v-for="ite in item.optionVos" :key="ite.id">{{ite.content}}</dd>
      </dl>
      <router-link to="/AddAssessmentResult"><button type="button">评估结果</button></router-link>
    </div>

    <div class="view-evaluation-main">
      <dl v-for="item in voList" :key="item.id">
        <dt>{{item.questionInstance.questionNum}}.{{item.questionInstance.questionTitle}}
          <span v-if="item.questionInstance.optionType == 1">（多选题）</span>
          </dt>
        <dd :class="{active:ite.isChoosed == 1}" v-for="ite in item.instanceOptionVos" :key="ite.id">{{ite.content}}</dd>
        <textarea placeholder="请输入" v-if="item.questionInstance.optionType == 2" v-model="item.answer"></textarea>
      </dl>
      <router-link :to="{path:'/AddAssessmentResult',query:{id:this.$route.query.id,evaluateId:$route.query.evaluateId}}"><button type="button">评估结果</button></router-link>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data: function () {
      return {
        titleUser: '李菲菲',
        titleTip: '高血压',
        evaluateInsInfo:'',
        voList:'',
        instanceVos:'',
        modelType:this.$route.query.modelType
      }
    },
    async created () {
      let params = {
        //'modelType': this.$route.query.modelType,
        'id': this.$route.query.id
      }
      const res = await this.$api.post('doctorEvaluate/getEvaluateInsInfo.do', params)
      console.log(res.data)
      if (res.data.stateCode == '001') {
        this.titleUser = res.data.evaluateInsInfo.memberName
        this.titleTip = res.data.evaluateInsInfo.title
        //this.evaluateInsInfo = res.data.evaluateInsInfo
        this.voList = res.data.evaluateInsInfo.evaluateQuestions
        //this.instanceVos = res.data.evaluateInsInfo.instanceVos
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
  .user-evaluation-wrap {
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

  button{
    width: 100%;
    padding: 1.4rem 0;
    background: #10d1a0;
    color: #fff;
    font-size: 1.6rem;
    margin-top: 2rem;
  }
  }

  }


</style>
