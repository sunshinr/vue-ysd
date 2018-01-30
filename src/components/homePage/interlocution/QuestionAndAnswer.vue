<!--suppress ALL -->
<template>
  <div class="quesAndAnsw">
    <headerBar3 title="问答" titleBtnTxt="提问" titleUrl="/PutQuestions"></headerBar3>
    <div class="question_tab">
      <mt-navbar class="page-part" v-model="tabSelected">
        <mt-tab-item id="1">推荐</mt-tab-item>
        <mt-tab-item id="2">邀请</mt-tab-item>
      </mt-navbar>


      <!-- tab-container -->
      <mt-tab-container v-model="tabSelected">
        <mt-tab-container-item id="1">
          <div class="search_con">
            <div class="search">
              <i class="icon iconfont icon-sousuo" @click="loadSearchApi"></i>
              <input type="text" placeholder="搜索" v-model="searchVal" value="searchVal">
            </div>
          </div>
          <ul class="Recommend_con">
            <li v-for="(item, index) in  searchdataStatus===1 ? recommendList : seacrchList" :key="index">
              <div @click="goQuestionDetailsfn (item.questionId)">
                <div class="headImg">
                  <img :src="item.doctorPic" alt=""><h4>{{item.doctorName}}</h4><span>提问</span><span class="time">{{$WhiteBackground.timeFn(item.createTime)}}</span>
                </div>


                <h3>{{item.title}}</h3>
                <p>{{item.questionDescribe}}</p>
              </div>
              <div class="Answer_btn">
                <a v-show="item.keywords.length>0">
                  <i class="icon iconfont icon-biaoqian"></i>
                  <span v-for="j in item.keywords" v-text="j.name +' '"></span>
                </a>
                <span class="f_r f_r_icon" @click="goInvite(item.questionId)"><i class="icon iconfont icon-bi-"></i>回答
                </span>
                <span class="f_r f_r_icon ignore " @click="goIgnoreFn(item.questionId, index)"><i
                  class="icon iconfont icon-hulve-"></i>忽略
                </span>
              </div>
            </li>
          </ul>
          <NoData imgUrl="/static/images/nodata/null3.png" hintTxt="暂无相关推荐内容"
                  v-if="searchdataStatus ===1?RecommendNodataStatus:''"></NoData>

          <NoData imgUrl="/static/images/nodata/nodata01.png" hintTxt="暂无搜索结果"
                  v-if="searchdataStatus ===2?searchNodataStatus:''"></NoData>

          <infinite-loading @infinite="infiniteHandler" spinner="waveDots"
                            v-if="searchdataStatus ===1?!RecommendNodataStatus:!searchNodataStatus">
          <span slot="no-more">
             ——没有更多啦——
          </span>
          </infinite-loading>

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="Recommend_con" v-if="!InvitationNodataStatus">
            <li v-for="InvitationItem in InvitationArr">
              <div @click="goQuestionDetailsfn (InvitationItem.questionId)">
                <div class="headImg clear">
                  <img :src="InvitationItem.doctorPic"><h4 v-text="InvitationItem.doctorName"></h4><span>提问</span><span
                  class="time">
                {{$WhiteBackground.timeFn(InvitationItem.createTime)}}</span>
                </div>

                <h3 v-text="InvitationItem.title"></h3>
                <p v-text="InvitationItem.questionDescribe"></p>
              </div>

              <div class="Answer_btn">
                <a v-show="InvitationItem.keywords.length>0"><i class="icon iconfont icon-biaoqian"></i><span
                  v-for="i in InvitationItem.keywords" v-text="i.name +' '"></span></a>
                <span class="f_r f_r_icon" @click="goInvite(InvitationItem.questionId)"><i
                  class="icon iconfont icon-bi-"></i>回答
                </span>
                <span class="f_r f_r_icon ignore " @click="goIgnoreFn(InvitationItem.questionId)"><i
                  class="icon iconfont icon-hulve-"></i>忽略
                </span>
              </div>

            </li>
          </ul>

          <NoData imgUrl="/static/images/nodata/null3.png" hintTxt="暂无邀请内容"
                  v-if="InvitationNodataStatus"></NoData>


          <infinite-loading @infinite="infiniteHandler" spinner="waveDots"
                            v-if="!InvitationNodataStatus">
          <span slot="no-more">
            ——没有更多啦——
          </span>
          </infinite-loading>
        </mt-tab-container-item>
      </mt-tab-container>


    </div>
  </div>
</template>


<script>
  import { Navbar, TabItem, Progress, MessageBox } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        tabSelected: '1',
        searchVal: '',
        recommendList: [], // 推荐列表
        seacrchList: [],//
        InvitationArr: [], // 邀请列表
        IgnoreId: null, //忽略问题id
        countRecord: 0,
        pageSize: 0,
        RecommendNodataStatus: false, // 无推荐数据
        searchNodataStatus: false, // 无搜索数据
        searchdataStatus: 1,// 显示推荐结果或搜索结果
        InvitationNodataStatus: false,
        SearchRescountRecord: 0,
        invitationRescountRecord: 0
      }
    },
    created () {
      this.RecommendApi()
    },
    methods: {
      //推荐列表
      async RecommendApi () {
        this.searchdataStatus = 1

        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: 1,
          pageSize: this.pageSize
        }

        const questionRes = await this.$api.post('interlocution/questionList.do', params)
        if (questionRes.data.stateCode == '001') {
          this.recommendList = questionRes.data.questionList
          this.countRecord = questionRes.data.countRecord

          if (this.recommendList.length < 1) {
            this.RecommendNodataStatus = true
          }
        }
      },
      // 加载更多数据
      async infiniteHandler ($state) {
        setTimeout(() => {
          if (this.pageSize > (this.searchdataStatus === 1 ? this.countRecord : '' || this.searchdataStatus === 2 ? this.SearchRescountRecord : ''
            || this.searchdataStatus === 3 ? this.invitationRescountRecord : '')) {
            $state.complete()
          } else {
            if (this.countRecord === '0' || this.SearchRescountRecord === '0' || this.invitationRescountRecord === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 5
              this.searchdataStatus === 1 ? this.RecommendApi() : '' || this.searchdataStatus === 2 ? this.loadSearchApi() : '' ||
              this.searchdataStatus === 3 ? this.InvitationApi() : ''
            }
          }
        }, 1000)
      },
      // 邀请
      async InvitationApi () {
        this.searchdataStatus = 3

        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: 1,
          pageSize: this.pageSize
        }
        const invitationRes = await this.$api.post('interlocution/invitationList.do', params)
        if (invitationRes.data.stateCode == '001') {
          this.InvitationArr = invitationRes.data.doctorList
          this.invitationRescountRecord = invitationRes.data.countRecord
          this.InvitationArr.length < 1 ? this.InvitationNodataStatus = true : this.InvitationNodataStatus = false
        }
      },

      // 搜索
      async loadSearchApi () {

        if (this.recommendList.length > 0) {
          this.searchdataStatus = 2

          let SearchParams = {
            doctorId: localStorage.getItem('doctorId'),
            currentPage: 1,
            pageSize: this.pageSize,
            title: this.searchVal
          }
          const SearchRes = await
            this.$api.post('interlocution/searchQuestion.do', SearchParams)
          if (SearchRes.data.stateCode == '001') {

            this.seacrchList = SearchRes.data.questionList
            this.seacrchList.length < 1 ? this.searchNodataStatus = true : this.searchNodataStatus = false
            this.SearchRescountRecord = SearchRes.data.countRecord

          }
        }
      },
      // 跳转问题详情
      goQuestionDetailsfn (id) {
        this.$router.push({
          path: '/QuestionDetails',
          query: {
            questionId: id
          }
        })
      },
      // 跳转回答问题
      goInvite (id) {
        this.$router.push({
          path: '/AnsweringTheQuestion',
          query: {
            questionId: id
          }
        })
      },
      // 忽略问题
      goIgnoreFn (id, n) {
        this.IgnoreId = id
        MessageBox.confirm('是否要忽略这条问题').then(action => {
          this.goIgnoreApi(this.IgnoreId)
          if (this.tabSelected === '1') {
            this.recommendList.splice(n, 1)
          } else {
            this.InvitationArr.splice(n, 1)
          }
        })
      }
      ,
      // 忽略问题
      async goIgnoreApi (id) {
        let IgnoreParams = {
          doctorId: localStorage.getItem('doctorId'),
          questionId: id
        }
        var _this = this
        const ignoreRes = await this.$api.post('interlocution/ignoreQuestion.do', IgnoreParams)
        if (ignoreRes.data.stateCode == '001') {
          MessageBox.alert(ignoreRes.data.message).then(function () {
            _this.searchdataStatus === 1 ? _this.RecommendApi() : '' || _this.searchdataStatus === 2 ? _this.loadSearchApi() : ''
            || _this.searchdataStatus === 3 ? _this.InvitationApi() : ''
          })
        }
      }
      ,
    },
    components: {MessageBox, InfiniteLoading},
    watch: {
      tabSelected: function (val, oldVal) {
        this.pageSize = 0
        if (val === '1') {
          this.RecommendApi()
        } else {
          this.InvitationApi()

        }
      }
    }
  }
</script>

<style lang="less">

  .quesAndAnsw {
    padding: 5.4rem 0 0;

  .f_r {
    float: right;
  }

  .f_l {
    float: left;
  }

  .question_tab {
    height: auto;

  .mint-navbar {
    border-bottom: solid 1px #d9d9d9;
    position: fixed;
    top: 5.4rem;
    z-index: 9;
    width: 100%;

  .mint-tab-item {
    color: #666666;
  }

  .mint-tab-item-label {
    font-size: 1.6rem;
  }

  .is-selected {
    border-bottom: 3px solid #10d1a0;
    color: #10d1a0;
    margin-bottom: -1px;
  }

  }
  .search_con {
    background: #f5f5f5;
    padding: 1rem;

  .search {
    padding: 0.5rem;
    width: 97%;
    margin: 0 auto;
    border-radius: 2rem;
    border: solid 1px #d9d9d9;
    background: #fff;
    height: 3.5rem;
    overflow: hidden;

  input {
    float: left;
    padding: 0.2rem 0;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    width: 86%;
  }

  .icon {
    font-size: 2.5rem;
    margin-left: 0.3rem;
    float: left;
    color: #ccc;
    margin-top: 0rem;
  }

  }
  }
  .mint-tab-container {
    margin-top: 5.4rem;
  }

  .Recommend_con {
    height: auto;

  li {
    padding: 2rem;
    background: #fff;
    margin-top: 1rem;

  .headImg {

  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
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
  h3 {
    font-size: 1.7rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1.5rem;
    color: #999999;
    line-height: 2.4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .Answer_btn {
    padding-top: 1.8rem;
    font-size: 1.4rem;
    color: #00ca97;
    height: auto;
    overflow: hidden;

  a {
    color: #999;

  .icon {
    margin-right: 0.6rem;
    color: #ff9b0d;
  }

  }
  .f_r_icon {
    color: #ccc !important;

  .icon {
    color: #ccc
  }

  }
  .ignore {
    margin-right: 2rem;
  }

  }
  }
  li:first-child {
    margin-top: 0;
  }

  }
  }
  }
</style>

