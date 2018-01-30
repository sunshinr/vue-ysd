<template>
  <div class="invitation-answer-list-wrap">
    <HeaderBar3 title="邀请"></HeaderBar3>

    <invitation></invitation>

    <div class="invitation-answer-list">
      <h3>已邀请 </h3>

      <dl v-for="item in InvitationAnswerList">
        <dt><img :src="item.doctorPic">{{item.doctorName}}</dt>

        <dd v-text="item.doctorIntro"></dd>
      </dl>
    </div>
  </div>
</template>


<script>
  import invitation from './InvitationSearchCommon'

  export default {
    name: '',
    data () {
      return {
        questionId: this.$route.query.questionId,
        InvitationAnswerList: []
      }
    },
    created () {
    },
    mounted () {
      this.InvitationAnswerName(this.questionId)
    },
    methods: {
      async InvitationAnswerName (QSId) {
        let params = {
          questionId: QSId,
          doctorId: 2
        }
        const res = await this.$api.post('interlocution/invitationDoctorList.do', params)
        if (res.data.stateCode == '001') {
          this.InvitationAnswerList = res.data.doctorList
          console.log(this.InvitationAnswerList)
        }
      },
    },
    components: {
      invitation
    },
    filters: {}

  }
</script>


<style lang="less" scoped>
  @color999999 : #999999;
  @bordercolor : #d9d9d9;

  .invitation-answer-list-wrap {

  .invitation-answer-list {
    background: #ffffff;

  h3 {
    padding: 1.8rem 1.5rem;
    color: @color999999;
    font-size: 1.6rem;
    border-bottom: 1px solid @bordercolor;
  }

  dl {
    background: #ffffff;
    padding: 1.3rem 1.5rem 1.3rem 0;
    border-bottom: 1px solid #d9d9d9;
    margin-left: 1.5rem;

  &
  :last-of-type {
    border-bottom: none;
  }

  dt {
    font-size: 1.7rem;
    color: #333333;

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 1.5rem;
  }

  }
  dd {
    font-size: 1.5rem;
    color: #666666;
    margin-top: 1.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 2.2rem;

  }

  }
  }
  }

</style>
