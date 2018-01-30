<template>
  <div class="invitation-answer-list-wrap">
    <HeaderBar3 title="邀请"></HeaderBar3>

    <invitation></invitation>

    <div class="invitation-answer-list">
      <dl v-for="item in searchList" @click="setName(item.doctorAccountId)">
        <dt><img :src="item.doctorPic">{{item.doctorName}}</dt>
        <dd v-text="item.doctorIntro"></dd>
      </dl>

    </div>
    <NoData imgUrl="/static/images/nodata/nodata01.png" hintTxt="未搜索到相关医生" v-if="searchListStatus"></NoData>
  </div>
</template>


<script>
  import invitation from './InvitationSearchCommon'
  import { Toast, MessageBox } from 'mint-ui'

  export default {
    name: '',
    data () {
      return {
        searchName: this.$route.query.name,
        questionId: this.$route.query.questionId,
        searchList: [],
        nameArr: [],
        searchListStatus: false
      }
    },
    created () {
      this.searchApi()
    },
    mounted () {
    },
    methods: {
      async searchApi () {
        let params = {
          name: this.searchName
        }
        const res = await this.$api.post('interlocution/getDoctorListByName.do', params)
        if (res.data.stateCode == '001') {
          this.searchList = res.data.doctorList
          if (this.searchList.length < 1) {
            this.searchListStatus = true
          }

        }

      },
      setName (id) {
        var _this = this
        MessageBox.confirm('邀请对方回答问题').then(function () {
          _this.InvitationDoctorApi(id)
        })
      },
      async InvitationDoctorApi (id) {
        let params = {
          questionId: this.questionId,
          doctorId: localStorage.getItem('doctorId'),
          targetDoctorId: id
        }
        const res = await this.$api.post('interlocution/invitation.do', params)
        if (res.data.stateCode == '001') {
          Toast({
            message: '已发送邀请',
            iconClass: 'icon iconfont icon-jian-copy'
          })
          var _this = this
          setTimeout(function () {
            _this.$router.push({
              path: '/QuestionDetails',
              query: {
                questionId: _this.questionId,
              }
            })
          }, 3100)
        }

      },
    },
    components: {invitation, MessageBox, Toast},
    filters: {}

  }
</script>


<style lang="less" scoped>

  @color999999 : #999999;
  @bordercolor : #d9d9d9;

  .invitation-answer-list-wrap {

  .invitation-answer-search {
    position: relative;
    color: @color999999;
    margin-top: 5.5rem;
    padding: 0 1.5rem;

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 4rem;
    margin: 0.7rem 0;
    border-radius: 2rem;
    font-size: 1.4rem;
    color: @color999999;
  }

  i {
    position: absolute;
    top: 1.55rem;
    left: 2.7rem;
    font-size: 2rem;
  }

  }

  .invitation-answer-list {
    background: #ffffff;

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
