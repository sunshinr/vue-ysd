<template>
  <div class="dynamic">
    <HeaderBar3 :title="title"></HeaderBar3>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">提问</mt-tab-item>
      <mt-tab-item id="2">回答</mt-tab-item>
      <mt-tab-item id="3">评论</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">

        <ul class="box quiz">
          <li class="list" v-for="tiwenItem in tiwenArr" v-if="tiwenStatus">
            <router-link :to="{ path:'/QuestionDetails', query:{questionId:tiwenItem.questionId}}">
              <h4>{{tiwenItem.title}}</h4>
              <div class="labelIcon">
                <span><i class="icon iconfont icon-biaoqian"></i><label
                  v-for="i in tiwenItem.keywords">{{i.name +'&nbsp;'}}</label></span>
              </div>

              <p v-text="tiwenItem.questionDescribe"></p>
              <div class="lineBottom">
                {{tiwenItem.answerquantity}}人回答<span v-text="$WhiteBackground.timeFn(tiwenItem.createTime)"></span>
              </div>
            </router-link>
          </li>

          <div class="no-data-wrap" v-if="!tiwenStatus">
            <NoData imgUrl="/static/images/nodata/nodata02.png" hintTxt="暂无提问记录"></NoData>
          </div>
        </ul>


      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="box response">
          <li class="list" v-for="huidaItem in huidaArr" v-if="huidaStatus">
            <router-link :to="{ path:'/QuestionDetails', query:{questionId:huidaItem.questionId}}">
              <h4>{{huidaItem.questionTitle}}</h4>
              <div class="labelIcon"><span><i
                class="icon iconfont icon-biaoqian"></i><label
                v-for="i in huidaItem.keywordsVos">{{i.name +'&nbsp;'}}</label></span></div>
              <p>{{huidaItem.answer}}</p>
              <div class="lineBottom">
                <span v-text="'收藏 '+huidaItem.bookmarkCount"></span>
                <span v-text="'评论 '+huidaItem.commentCount"></span>
                <span v-text="'有用 '+huidaItem.helpfulCount"></span>
                <span v-text="$WhiteBackground.timeFn(huidaItem.createTime)"></span>
              </div>
            </router-link>
          </li>

          <div class="no-data-wrap" v-if="!huidaStatus">
            <NoData imgUrl="/static/images/nodata/nodata02.png" hintTxt="暂无回答记录"></NoData>
          </div>

        </ul>

      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="comment">
          <li class="list" v-for="(pinglunItenm,index) in pinglunArr" v-if="pinglunStatus">
            <div class="upside">
              <img :src="pinglunItenm.doctorPic" alt="">

              <div class="topRight">
                <div class="name" v-text="pinglunItenm.doctorName"></div>
                <div class="time" v-text="$WhiteBackground.timeFn(pinglunItenm.createTime)"></div>
                <i class="icon iconfont icon-shanchu" @click="deletePingLun(pinglunItenm.doctorCommentId,index)"></i>
              </div>
              <p v-text="pinglunItenm.content"></p>

              <div class="image-text clear" @click="goVideoDetail(pinglunItenm.infoType,pinglunItenm.knowledgeId)">
                <img :src="pinglunItenm.cover">
                <div class="txt" v-text="pinglunItenm.name"></div>
              </div>

              <div class="lineBottom">
                <span v-text="'有用  '+pinglunItenm.helpfulCount"></span>
                <span v-text="'回复  '+pinglunItenm.replyNumber"></span>
              </div>
            </div>
          </li>
          <div class="no-data-wrap" v-if="!pinglunStatus" v-cloak>
            <NoData imgUrl="/static/images/nodata/nodata02.png" hintTxt="暂无评论记录"></NoData>
          </div>
        </ul>

      </mt-tab-container-item>
    </mt-tab-container>

    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="tiwenStatus">
          <span slot="no-more" class="no-more-data" > ——没有更多啦—— </span>
    </infinite-loading>
  </div>
</template>
<script>
  import MessageBox from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: '',
    data () {
      return {
        title: '我的动态',
        selected: '1',
        tiwenArr: [],// 提问数组
        huidaArr: [],// 回答数组
        pinglunArr: [],// 评论数组
        deleteId: null,
        tiwenStatus: true,
        huidaStatus: true,
        pinglunStatus: true,
        loadStatus: 1,
        pageSize: 5,
        tiwentotal: 0, // 提问总数
        huidatotal: 0, // 回答总数
        pingluntotal: 0 // 评论总数
      }
    },
    created () {
      this.tiwenFn()
    },
    mounted () {

    },
    watch: {
      selected (curVal, oldVal) {
        if (curVal === '1') {
          this.tiwenFn()
        } else if (curVal === '2') {
          this.huidaFn()
        } else if (curVal === '3') {
          this.pinglunFn()
        }
      }
    },
    methods: {

      async infiniteHandler ($state) {
        setTimeout(() => {
          if (this.pageSize > (this.loadStatus === 1 ? this.tiwentotal : '' || this.loadStatus === 2 ? this.huidatotal : ''
            || this.loadStatus === 3 ? this.pingluntotal : '')) {
            $state.complete()
          } else {
            if (this.countRecord === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 5
              this.loadStatus === 1 ? this.tiwenFn() : '' || this.loadStatus === 2 ? this.huidaFn() : '' ||
              this.loadStatus === 3 ? this.pinglunFn() : ''
            }
          }
          $state.loaded();
        }, 1000)
      },
      // 提问
      async tiwenFn () {
        this.loadStatus = 1

        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: this.pageSize,
          pageSize: 1
        }
        const tiwenRes = await this.$api.post('personalCenter/dynamicQuizList.do', params)
        this.tiwenArr = tiwenRes.data.quizList
        this.tiwentotal = tiwenRes.data.total
        this.tiwenArr.length > 0 ? this.tiwenStatus = true : this.tiwenStatus = false
      },
      // 回答
      async huidaFn () {
        this.loadStatus = 2
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: this.pageSize,
          pageSize: 1
        }
        const huidaRes = await this.$api.post('personalCenter/dynamicAnswer.do', params)
        this.huidaArr = huidaRes.data.answerList
        this.huidatotal = huidaRes.data.total
        this.huidaArr.length > 0 ? this.huidaStatus = true : this.huidaStatus = false
      },
      // 评论
      async pinglunFn () {
        this.loadStatus = 3
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: this.pageSize,
          pageSize: 1
        }
        const pinglunRes = await this.$api.post('personalCenter/dynamicCommentList.do', params)
        this.pinglunArr = pinglunRes.data.commentList
        this.pingluntotal = pinglunRes.data.total
        this.pinglunArr.length > 0 ? this.pinglunStatus = true : this.pinglunStatus = false
      },
      // 删除评论
      deletePingLun (id, index) {
        MessageBox.confirm('是否要删除这条评论').then(action => {
          this.deleteFn(id)
          this.pinglunArr.splice(index, 1)
        })
      },
      async deleteFn (id) {
        let deleteParams = {
          commentId: id,
        }
        let deleteRes = await this.$api.post('personalCenter/removeComment.do', deleteParams)
        console.log(deleteRes.data)
      },
      // 跳转知识详情页或视频详情页
      goVideoDetail (infoType, videoId) {
        if (infoType === 1) {
          this.$router.push({
            name: 'KnowledgeDetails',
            query: {id: videoId}
          })
        } else {
          this.$router.push({
            name: 'PlayVideo',
            params: {id: videoId}
          })
        }

      }
    },
    components: {
      MessageBox,
      InfiniteLoading
    },
    filters: {}
  }
</script>
<style lang="less">
  .dynamic {
    .no-more-data{
      color: #ccc;
    }
  .m-header1 h1 {
    font-size: 1.8rem;
  }

  .mint-navbar {
    position: fixed;
    top: 5.4rem;
    left: 0;
    right: 0;
    width: 100%;
    border-bottom: solid 1px #d9d9d9;
    z-index: 2;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #10d1a0;
    color: #10d1a0;
    margin-bottom: 0;
  }

  .mint-tab-item-label {
    font-size: 1.7rem;
  }

  .mint-tab-container-item {

  .box {
    overflow: hidden;
    margin-top: 10.7rem;

  .list {
    background: #ffffff;
    margin-top: 0.5rem;
    padding: 1.5rem;

  h4 {
    font-size: 1.7rem;
    line-height: 2.4rem;
    margin-bottom: 0.8rem;
  }

  .labelIcon {

    height: auto;
    overflow: hidden;

  span {
    font-size: 1.3rem;
    color: #666666;

  i {
    color: #ff9313;
    margin-right: 0.4rem;
    vertical-align: middle;
  }

  }
  }

  p {
    font-size: 1.5rem;
    line-height: 2.4rem;
    color: #666666;
    margin: 1rem 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  .lineBottom {
    font-size: 1.3rem;
    color: #999999;
  }

  }
  }
  .quiz {

  .lineBottom {

  span {
    float: right;
  }

  }
  }
  .response {

  .lineBottom {

  span {
    margin-right: 1.1rem;
  }

  span:last-of-type {
    float: right;
  }

  }
  }
  .comment {
    overflow: hidden;
    margin-top: 10.7rem;

  .list {
    margin-top: 0.5rem;
    background: #ffffff;
    padding: 1.5rem;

  .upside {

  > img {
    display: inline-block;
    width: 4.4rem;
    height: 4.4rem;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: solid 1px #dddddd;
  }

  .topRight {
    position: relative;
    float: right;
    width: 80%;

  .name {
    font-size: 1.5rem;
  }

  .time {
    font-size: 1.3rem;
    color: #999999;
    margin-top: 0.3rem;
  }

  i {
    position: absolute;
    display: inline-block;
    right: 0rem;
    top: 0.6rem;
    font-size: 2.3rem;
    color: #ff3300;
  }

  }
  p {
    font-size: 1.5rem;
    margin-top: 1.5rem;
  }

  .image-text {
    width: 100%;
    padding: 0.6rem;
    background: #f0f0f0;
    margin: 1.1rem 0;

  img {
    display: inline-block;
    width: 6.4rem;
    height: 6.4rem;
    float: left;
    margin-right: 1rem;
  }

  .txt {
    float: left;
    width: 75%;
    font-size: 1.5rem;
    color: #666666;
    margin-top: 0.6rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

  h4 {

  }

  }
  }
  .lineBottom {

  span {
    font-size: 1.3rem;
    color: #999999;
    margin-right: 1rem;
  }

  }
  }
  }
  }
  }
  }
  .no-data-wrap {
    /* padding-top: 18rem;*/
  }

  [v-cloak] {
    display: none
  }
</style>
