<template>
  <div class="question_details">
    <headerBar3 title="问题详情"></headerBar3>
    <div class="question_con">
      <div class="question_con_top">
        <div class="headImg">
          <img :src="questionList.doctorPic"
               alt=""><h4>{{questionList.doctorName}}</h4><span>提问</span>
          <span class="time" v-text="$WhiteBackground.timeFn(questionList.createTime)"></span>
        </div>
        <a>
          <h3 v-text="questionList.title"></h3>
          <p v-text="questionList.questionDescribe"></p>
        </a>
        <div class="Answer_btn" @click="goAnser">
          <a class="f_r f_r_icon"><i class="icon iconfont icon-bi-"></i>去回答
          </a>
        </div>
      </div>
      <div class="Invitation_con" @click="goInvite">
        <span class="name">邀请回答:</span>
        <span v-for="(Invitationitem,index) in InvitationAnswerList" v-if="index<3"
              v-text="Invitationitem.doctorName"></span>

        <i class="icon iconfont icon-jiantou"></i>
      </div>
      <h4 class="AnswerNum">{{questionList.answerquantity}}人回答</h4>
      <ul class="Answer_con">
        <li v-for="responseItem in responseList" @click="goAnsweringDetails(responseItem.doctorId,responseItem.answerId)">
            <div class="headImg">
              <img :src="responseItem.doctorPic"><h4 v-text="responseItem.doctorName"></h4>
            </div>
            <p v-text="responseItem.answer"></p>

          <div class="Answer_btn">
            <a  class="f_r f_r_icon">收藏 {{responseItem.bookmarkCount | MaxOrMinNum}}</a>
            <a  class="f_r f_r_icon">评论 {{responseItem.commentCount| MaxOrMinNum}}</a>
            <a  class="f_r f_r_icon">有用 {{responseItem.helpfulCount| MaxOrMinNum}}</a>
            <span class="time" v-text="$WhiteBackground.timeFn(responseItem.createTime)"></span>
          </div>
        </li>
        <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
          <span slot="no-more">
             ——没有更多啦——
          </span>
        </infinite-loading>
      </ul>
    </div>
  </div>
</template>


<script>
  import { Toast, MessageBox, Indicator } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        questionList: [], // 问题列表
        responseList: [], // 查询回答列表
        InvitationAnswerList: [], // 邀请回答医生名单
        questionId: this.$route.query.questionId,
        loading: false,
        pageSize: 2
      }
    },
    mounted () {
    },
    created () {
      this.loadApi()
      this.AnswerFn()
      this.InvitationAnswerName()
    },
    methods: {
      // 问题
      async loadApi () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          questionId: this.questionId
        }
        const res = await this.$api.post('interlocution/questionInfo.do', params)
        if (res.data.stateCode === '001') {
          this.questionList = res.data.questionInfo
        }
      },
      // 回答
      async AnswerFn () {
        let params = {
          questionId: this.questionId,
          pageSize: this.pageSize,
          currentPage: 1
        }
        const res = await this.$api.post('interlocution/answerList.do', params)
        if (res.data.stateCode == '001') {
          this.responseList = res.data.answerList
        }
      },
      // 加载更多数据
      infiniteHandler ($state) {
        setTimeout(() => {
          if (this.pageSize > this.questionList.answerquantity) {
            $state.complete()
          } else {
            if (this.questionList.answerquantity === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 2
              this.AnswerFn()
            }

          }
        }, 1000)

        /*  if (this.pageSize < this.questionList.answerquantity) {

            Indicator.open({
              text: '载入中',
              spinnerType: 'icon-loading'
            });

            this.loading = true
            setTimeout(() => {
              this.pageSize += 2
              this.AnswerFn()
              Indicator.close();
              this.loading = false
            }, 2500)
          } else {
            Indicator.close();
            this.loading = false
          }*/
      },
      //  邀请
      async InvitationAnswerName () {
        let params = {
          questionId: this.questionId,
          doctorId: localStorage.getItem('doctorId'),
        }
        const res = await this.$api.post('interlocution/invitationDoctorList.do', params)
        if (res.data.stateCode == '001') {
          this.InvitationAnswerList = res.data.doctorList
        }
      },
   /*   // 收藏
      async Collection (id) {
        let params = {
          Id: id,
          type: 1,
          doctorId: localStorage.getItem('doctorId'),
        }
        let res = await this.$api.post('basic/mark.do', params)
        if (res.data.stateCode == '001') {
          Toast(res.data.message)
          this.AnswerFn()
        }
      },
      // 有用
      async Like (id) {
        let params = {
          Id: id,
          type: 1,
          doctorId: localStorage.getItem('doctorId'),
        }
        let res = await this.$api.post('basic/helpful.do', params)
        if (res.data.stateCode == '001') {
          Toast(res.data.message)
          this.AnswerFn()
        }
      },*/
      // 跳转邀请
      goInvite () {
        this.$router.push({
          path: '/InvitationAnswerList',
          query: {
            questionId: this.questionId
          }
        })
      },
      // 跳转回答问题
      goAnser () {
        this.$router.push({
          path: '/AnsweringTheQuestion',
          query: {
            questionId: this.questionId
          }
        })
      },
      // 评论
      goComment (id) {
        this.$router.push({
          path: '/comment',
          query: {id: id, type: 1}
        })
      },
      goAnsweringDetails (dId, aId) {
        this.$router.push({
          path: '/AnsweringDetails',
          query: {docId: dId, ansId: aId}
        })
      }

    },
    components: {
      Toast, MessageBox, Indicator, InfiniteLoading
    }
  }
</script>

<style lang="less">
  .question_details {
    padding: 5.4rem 0 0;

  .headImg {

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 5rem;
    display: inline-block;
  }

  h4 {
    display: inline-block;
    font-size: 1.6rem;
    margin: 0 1rem;
  }

  span {
    color: #ccc;
    font-size: 1.4rem
  }

  .time {
    float: right;
    display: inline-block;
    line-height: 5rem
  }

  }
  p {
    font-size: 1.5rem;
    color: #999999;
    line-height: 2.4rem;
    overflow: hidden;
  }

  .Answer_btn {
    padding-top: 1.5rem;
    font-size: 1.4rem;
    color: #00ca97;
    height: auto;
    overflow: hidden;
    text-align: right;

  a {
    color: #999;
  }

  }
  .question_con {
    background: #fff;

  .question_con_top {
    padding: 2rem;
  }

  .Invitation_con {
    padding: 1.3rem 1.6rem;
    border-top: solid 1px #d9d9d9;
    height: auto;
    overflow: hidden;

  span {
    font-size: 1.4rem;
    color: #999999;
    margin-left: 1rem;
    float: left;
    height: 2rem;
    line-height: 2rem;
    display: block;
  }

  .icon {
    float: right;
    margin-top: .2rem;
    color: #ccc;
  }

  .name {
    color: #333;
    font-size: 1.6rem;
    margin: 0;
  }

  }

  h3 {
    font-size: 1.7rem;
    margin: 1rem 0;
  }

  }
  .AnswerNum {
    padding: 1rem 1.8rem;
    background: #f5f5f5;
    color: #999;
    font-size: 1.5rem
  }

  .Answer_con {

  li {
    padding: 2rem;
    border-top: solid 1px #d9d9d9;

  p {
    margin-top: 1rem;
    color: #333;
  }

  .Answer_btn {
    text-align: left;

  a {
    margin-right: 1rem;
  }

  .time {
    float: right;
    color: #ccc;
  }

  }
  }
  li:first-child {
    border: none;
  }

  }
  }
</style>

