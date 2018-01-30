<template>
  <div class="answering-the-question-wrap">

    <div class="answering-the-question-header">
      <HeaderBar3 title="回答问题"></HeaderBar3>
      <span @click="loaAnswerdApi">发布</span>
<!--      <router-link :to="'/QuestionDetails'+$route.query.questionId">发布</router-link>-->

    </div>


    <div class="answering-the-question">
      <dl>
        <dt><img :src="questionList.doctorPic">{{questionList.doctorName}} <span>提问</span> <span v-text="$WhiteBackground.timeFn(questionList.createTime)"></span></dt>
        <dd v-text="questionList.title"></dd>

        <dd v-text="questionList.questionDescribe"></dd>
      </dl>

      <div class="textarea-wrap">
        <textarea placeholder="输入回答..." v-model="answer"></textarea>
      </div>
    </div>

  </div>
</template>


<script>
  import { Toast,MessageBox } from 'mint-ui'
  export default {
    name: '',
    data () {
      return {
        questionId: this.$route.query.questionId,
        answerList: [],
        questionList: [],
        answer: ''
      }
    },
    created () {
      this.loadQuestionApi()
    },
    mounted () {
    },
    methods: {
      async loaAnswerdApi () {
        let params = {
          questionId: this.questionId,
          doctorId: localStorage.getItem('doctorId'),
          answer: this.answer
        }
        if (this.answer.length > 0) {
          const res = await this.$api.post('interlocution/answer.do', params)
          if (res.data.stateCode == '001') {
            Toast({
              message: res.data.message,
              iconClass: 'icon iconfont icon-biaoqing2'
            })
            var _this = this
            setTimeout(function () {
              _this.$router.push({
                path: '/QuestionDetails',
                query: {
                  questionId: _this.questionId
                }
              })
            }, 3100)
          }
        } else {
          Toast({
            message: '请输入回答内容',
            iconClass: 'icon iconfont icon-cuowutishi1'
          })
        }
      },
      async loadQuestionApi () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          questionId: this.questionId
        }
        const res = await this.$api.post('interlocution/questionInfo.do', params)
        if (res.data.stateCode == '001') {
          this.questionList = res.data.questionInfo
        }
      },
    },
    components: {MessageBox,Toast},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .answering-the-question-wrap {

  .answering-the-question-header {

  span {
    position: fixed;
    right: 1.5rem;
    top: 1.6rem;
    z-index: 100;
    font-size: 1.4rem;
    color: white;
  }

  }

  .answering-the-question {
    margin-top: 5.5rem;

  dl {
    background: #ffffff;
    padding: 1.3rem 1.5rem;
    border-bottom: 1px solid #d9d9d9;

  &
  :last-of-type {
    border-bottom: none;
  }

  dt {
    font-size: 1.7rem;
    color: #444;

  span {
    font-size: 1.3rem;
    color: #999999;
    margin-left: 0.5rem;

  &
  :last-of-type {
    position: relative;
    top: 0.5rem;
    float: right;
  }

  i {
    font-size: 1.3rem;
    color: #ff9313 !important;
  }

  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.5rem;

  }

  }

  dd {
    font-size: 1.5rem;
    color: #333333;
    margin-top: 1.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

  &
  :first-of-type {
    font-size: 1.7rem;
    color: #333333;
    font-weight: bold;
  }

  }
  }

  .textarea-wrap {
    background: #ffffff;
    margin-top: 0.5rem;
    padding: 1.1rem 1.5rem;

  textarea {
    width: 100%;
    border: 1px solid #d9d9d9;
    border-radius: 0.6rem;
    height: 19rem;
    padding: 1.5rem;
    font-size: 1.5rem;
    color: #999999;

  }

  }
  }
  }

</style>
