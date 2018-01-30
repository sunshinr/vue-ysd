<template>
  <div class="search-result-wrap">
    <div class="common-search">
      <div class="search-header">
        <i class="icon iconfont icon-arrow-left-copy turn-back" @click="turnBack"></i>
        <input type="text" placeholder="搜索" v-model="inputVal"  @keyup.13="searchFn(inputVal)"
               autofocus="autofocus">
        <i class="icon iconfont icon-sousuo"></i>
        <i class="icon iconfont icon-huaban" @click="empty"></i>
        <span @click="goback(inputVal)" v-text="text"></span>
      </div>
    </div>
    <!--<searchHeader :search="delivery[1]" :currentTag="currentTag"></searchHeader>-->
    <div class="no-data-wrap" v-if="searchNull">
      <NoData imgUrl="/static/images/nodata/nodata01.png" hintTxt="未搜索到相关内容" ></NoData>
    </div>


    <div class="search-main" v-if="!searchNull">
      <!--问题-->
      <div class="search-question" v-if="SearchResult.question.length > 0">
        <h3> 问题({{SearchResult.question.length}}) <i class="icon iconfont icon-jiantou" @click="goTagList('问题',inputVal)"></i></h3>

        <dl v-for="(item, index) in SearchResult.question" :key="index" v-if="index<1" @click="goQuestionDetailsfn(item.questionId)">
          <dt><img :src="item.doctorPic">{{item.doctorName}} <span>提问</span> <span>{{item.createTime}}</span></dt>
          <dd>{{item.title}}</dd>

          <dd>{{item.questionDescribe}}</dd>
        </dl>
      </div>

      <!--学堂-->
      <div class="search-school" v-if="SearchResult.school.length > 0">
        <h3> 学堂({{SearchResult.school.length}}) <i class="icon iconfont icon-jiantou" @click="goTagList('学堂',inputVal)"></i></h3>

        <div class="video">
          <ul>
            <li v-for="(item, index) in SearchResult.school" :key="index" v-if="index<1" @click="goVideoDetail(item.knowledgeId)">
            <span>
              <img :src="item.cover"/>
              <i class="icon iconfont icon-iconset0481"></i>
              <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
            </span>
              <div class="right">
                <div class="rightTop">
                  <img :src="item.doctorPic"/>{{item.doctorName}}<span>111人观看</span>
                </div>
                <p>{{$WhiteBackground.LimitText(item.name, 10)}}</p>
                <div class="rightBottom">
                  <a>收藏<span>{{item.collectNum | MaxOrMinNum}}</span></a>
                  <a>有用<span>{{item.likeNum | MaxOrMinNum}}</span></a>
                  <a>评论<span>{{item.commentNum | MaxOrMinNum}}</span></a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--评估检测-->
      <div class="search-evaluation" v-if="SearchResult.evaluation.length > 0">
        <h3> 评估检测（{{SearchResult.evaluation.length}}） <i class="icon iconfont icon-jiantou" @click="goTagList('评估检测',inputVal)"></i></h3>
        <ul class="programme_list">
          <li v-for="(item, index) in SearchResult.evaluation" :key="index" v-if="index<1">
            <div class="head">
              <img :src="item.doctorPic" alt="">
              <span>{{item.doctorName}}</span>
            </div>
            <div class="programme_name">{{item.title}} <span>{{item.questionNumber}}项</span></div>
            <div class="Assessment_num"><span><i class="jinbi-icon "></i>{{item.evaluateScore}}</span>已使用{{item.evaluateNumber}}次</div>
          </li>
        </ul>
      </div>

      <!--健康方案-->
      <div class="search-evaluation" v-if="SearchResult.scheme.length > 0">
        <h3> 健康方案（{{SearchResult.scheme.length}}） <i class="icon iconfont icon-jiantou" @click="goTagList('健康方案',inputVal)"></i></h3>
        <ul class="programme_list">
          <li v-for="(item, index) in SearchResult.scheme" :key="index" v-if="index<1">
            <div class="head">
              <img :src="item.doctorPic" alt="">
              <span>{{item.doctorName}}</span>
            </div>
            <div class="programme_name">{{item.schemeName}}</div>
            <div class="Assessment_num"><span><i class="jinbi-icon "></i>{{item.schemeScore}}</span>已使用{{item.schemeFavNum}}次</div>
          </li>
        </ul>
      </div>
    </div>

    <infinite-loading @infinite="infiniteHandler($event)" spinner="waveDots"
                      v-if="!searchNull">
          <span slot="no-more">
             ——没有更多啦——
          </span>
    </infinite-loading>
  </div>
</template>


<script>
  import searchHeader from './Comsearch.vue'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    name: '',
    data () {
      return {
        inputVal: '',
        text: '取消',
        searchNull: false,
        SearchResult: {
          question: [], // 问题
          school: [], // 学堂
          evaluation: [], // 评估
          scheme: [], // 方案
          column: []
        },
        currentTag: '',
        searchFlagVal: '',
        countRecord: 0,
        pageSize: 3,
        historyTag: []
      }
    },
    created () {
      console.log(this.$route.query.sInputWord)
      if (this.$route.query.sInputWord) {
        this.historyTag.push(this.$route.query.sInputWord)
        /* 搜索全部 */
        this.inputVal = this.$route.query.sInputWord
        this.searchAll(this.$route.query.sInputWord)
      }
    },
    mounted () {
    },
    watch: {
      inputVal (curVal, oldVal) {
        if (curVal.length > 0) {
          this.text = '搜索'
        } else {
          this.text = '取消'
        }
      }
    },
    methods: {
      // 加载更多数据
      async infiniteHandler ($state) {

        setTimeout(() => {
          if (this.pageSize > this.countRecord) {
            $state.complete()
          } else {
            if (this.countRecord === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 2
              this.historyTag.length <= 1 ? this.searchAll(this.$route.query.sInputWord) : this.searchAll(this.inputVal)
            }
          }
        }, 1000)
      },
      async searchAll (val) {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          type: 0,
          keyword: val
        }
        const res = await this.$api.post('index/search.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          if (res.data.questionList.length > 0 || res.data.schoolList.length > 0 || res.data.systemSchemesList.length > 0 || res.data.systemEvaluateList.length > 0) {
            this.SearchResult.school = res.data.schoolList
            this.SearchResult.question = res.data.questionList
            this.SearchResult.scheme = res.data.systemSchemesList
            this.SearchResult.evaluation = res.data.systemEvaluateList
          } else {
             this.searchNull = true
          }
        }
      },
      goback (val) {
        if (this.text === '取消') {
          this.$router.push({
            path: '/'
          })
        } else {
          /* 在全部里面搜 */
          /* window.location.reload()
          this.$router.push({
            path: '/SearchResult1',
            query: {sInputWord: val}
          }) */
          this.historyTag.push(val)
          console.log(this.historyTag)
          this.searchAll(val)
        }
      },
      searchFn (val) {
        if (this.text !== '取消') {
          this.historyTag.push(val)
          console.log(this.historyTag)
          this.searchAll(val)
        }
      },
      empty () {
        this.inputVal = ''
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
      // 跳转学堂详情
      goVideoDetail (videoId) {
        this.$router.push({
          name: 'PlayVideo',
          params: {id: videoId}
        })
      },
      turnBack () {
        this.historyTag.pop()
        console.log(this.historyTag)
        if (this.historyTag.length <= 0) {
          this.$router.go(-1)
        } else {
          this.inputVal = this.historyTag[this.historyTag.length - 1]
          /* this.$nextTick(function (event) {
            var e = window.event || event
            this.infiniteHandler(e)
          }) */
          let _this = this
          setTimeout(function () {
            _this.searchAll(_this.inputVal)
          }, 300)
        }
      },
      goTagList (tag, key) {
        // console.log(tag +'-'+ key)
        this.$router.push({
          path: '/SearchResult2',
          query: {searchKeyWord: tag + ',' + key}
        })
      }
    },
    components: {
      searchHeader, InfiniteLoading
    },
    filters: {}

  }
</script>


<style lang="less" scoped>
  @color999999 : #999999;
  @bordercolor : #d9d9d9;
  @color666666 : #666666;
  @color333333 : #333333;

  html, body {
    height: 100%;

  }

  /*头部搜索*/
  .search-header {
    position: fixed;
    width: 100%;
    top: 0;
    color: @color999999;
    padding: 1rem 1.5rem;
    background: #10d1a0;
    z-index: 9;

    input {
      width: 77%;
      padding: 0.6rem 1rem 0.6rem 4rem;
      margin: 0.7rem 0;
      border-radius: 2rem;
      font-size: 1.4rem;
      color: @color999999;
      background: #96ebd5;
    }

    i {
      font-size: 2rem;
    }

    .icon-sousuo {
      position: absolute;
      top: 2.2rem;
      left: 5.25rem;
    }

    .icon-huaban {
      position: absolute;
      top: 2.2rem;
      right: 7.3rem;
    }

    span {
      color: #ffffff;
      font-size: 1.6rem;
      margin-left: 0.9rem;
    }
    .turn-back{
      color: #ffffff;
      font-size: 2.2rem;
      vertical-align: middle;
      margin-right: 0.6rem;
    }

  }


  .search-result-wrap {
    overflow: hidden;



  .search-main {
    margin-top: 7.3rem;
  h3 {
    color: @color666666;
    padding: 1.2rem 1.5rem;
    font-size: 1.7rem;
    background: #f5f5f5;
    position: relative;

  i {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5rem;
  }

  }

  .search-question {

  dl {
    background: #ffffff;
    padding: 1.3rem 1.5rem;
    border-bottom: 1px solid #d9d9d9;

  &:last-of-type {
    border-bottom: none;
  }

  dt {
    font-size: 1.7rem;
    color: #444;

  span {
    font-size: 1.3rem;
    color: #999999;
    margin-left: 0.5rem;

  &:last-of-type {
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

  &:first-of-type {
    font-size: 1.7rem;
    color: #333333;
    font-weight: bold;
  }

  }
  }
  }

  .search-school {

  .video {
    background: #ffffff;
    padding: 0 1.5rem;

  ul {
    overflow: hidden;

  li {
    overflow: hidden;
    margin: 1.5rem 0;

  &> span {
    display: inline-block;
    float: left;
    width: 44%;
    position: relative;
    height: 10.5rem;

  img {
    width: 100%;
    height: 100%;
    -webkit-border-radius: 0.6rem;
    -moz-border-radius: 0.6rem;
    border-radius: 0.6rem;
  }

  i {
    position: absolute;
    top: 34%;
    left: 40%;
    font-size: 3.3rem;
    color: #ffffff;
  }

  .time {
    position: absolute;
    font-size: 1.3rem;
    color: #ffffff;
    right: 1rem;
    bottom: 1rem;
  }

  }
  .right {
    width: 53%;
    float: right;

  .rightTop {
    font-size: 1.3rem;

  img {
    width: 3.1rem;
    height: 3.1rem;
    margin-right: 0.8rem;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
  }

  span {
    font-size: 1.2rem;
    color: @color999999;
    float: right;
    display: inline-block;
    margin-top: 0.6rem;
  }

  }
  p {
    font-size: 1.5rem;
    margin-top: 0.8rem;
    width: 100%;
  }

  .rightBottom {
    margin-top: 1.1rem;
    display: flex;

  a {
    font-size: 1.2rem;
    color: @color999999;
    display: inline-block;
    flex: 1;

  span {
    margin-left: 0.4rem;
  }

  }
  a:nth-of-type(2) {
    text-align: center;
  }

  a:last-of-type {
    text-align: right;
  }

  }
  }
  }
  }
  }
  }

  .search-evaluation {

  .programme_list {
    height: auto;
    padding: 1rem;

  li {
    padding: 1.5rem;
    background: #fff;
    border-radius: 1.2rem;
    margin-bottom: 1rem;

  .head {
    height: auto;
    overflow: hidden;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 4.5rem;
    vertical-align: middle;
  }

  span {
    margin-left: 1.5rem;
    font-size: 1.4rem;
    color: @color333333;
  }

  }
  .programme_name {
    font-size: 1.6rem;
    padding: 1rem 0;

  span {
    float: right;
    color: @color999999;
  }

  }
  .Assessment_num {
    text-align: right;
    font-size: 1.4rem;
    color: #ff9b0d;

  span {
    float: left;
    color: @color999999;

  .jinbi-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background: url("../../../static/img/kangbi_03.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: bottom;
    margin-right: 0.7rem;
    position: relative;
    top: 0.1rem;
  }

  }
  }
  }
  }
  }

  }

  }
  .no-data-wrap{
    margin-top: 13rem;
  }
</style>
