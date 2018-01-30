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
        <h3> 问题({{SearchResult.question.length}})</h3>

        <dl v-for="(item, index) in SearchResult.question" :key="index" @click="goQuestionDetailsfn(item.questionId)">
          <dt><img :src="item.doctorPic">{{item.doctorName}} <span>提问</span> <span>{{item.createTime}}</span></dt>
          <dd>{{item.title}}</dd>

          <dd>{{item.questionDescribe}}</dd>
        </dl>
      </div>

      <!--学堂-->
      <div class="search-school" v-if="SearchResult.school.length > 0">
        <h3> 学堂({{SearchResult.school.length}})</h3>

        <div class="video">
          <ul>
            <li v-for="(item, index) in SearchResult.school" :key="index" @click="goVideoDetail(item.knowledgeId)">
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
        <h3> 评估检测（{{SearchResult.evaluation.length}}</h3>
        <ul class="programme_list">
          <li v-for="(item, index) in SearchResult.evaluation" :key="index">
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
        <h3> 健康方案（{{SearchResult.scheme.length}}）</h3>
        <ul class="programme_list">
          <li v-for="(item, index) in SearchResult.scheme" :key="index">
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
  </div>
</template>


<script>
  import searchHeader from './Comsearch.vue'
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
        delivery: [], // 存储要传递的标签和搜索范围
        currentTag: '',
        historyTag: []
      }
    },
    created () {
      console.log(this.$route.query.searchKeyWord)
      /* 根据搜索范围标签搜索 */
      if (this.$route.query.searchKeyWord) {
         this.delivery = this.$route.query.searchKeyWord.split(',')
         console.log(this.delivery)
         this.currentTag = this.delivery[0]
         this.inputVal = this.delivery[1]
         this.historyTag.push(this.delivery[1])
         this.searchTag(this.delivery[0], this.delivery[1])
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
      async searchTag (rangeTag, val) {
        let tagType = 0
        if (rangeTag == '问题') {
          tagType = 1
        } else if (rangeTag == '学堂') {
          tagType = 2
        } else if (rangeTag == '评估检测') {
          tagType = 3
        } else if (rangeTag == '健康方案') {
          tagType = 4
        } else {
          tagType = 5
        }
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          type: tagType,
          keyword: val
        }
        const res = await this.$api.post('index/search.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          if(tagType == 2){
            if (res.data.schoolList.length > 0) {
              this.SearchResult.school = res.data.schoolList
            } else {
              this.searchNull = true
            }
          } else if (tagType == 1) {
            if (res.data.questionList.length > 0) {
              this.SearchResult.question = res.data.questionList
            } else {
              this.searchNull = true
            }
          } else if (tagType == 3) {
            if (res.data.systemEvaluateList.length > 0) {
              this.SearchResult.evaluation = res.data.systemEvaluateList
            } else {
              this.searchNull = true
            }
          } else if (tagType == 4) {
            if (res.data.SystemSchemeList.length > 0) {
              this.SearchResult.scheme = res.data.SystemSchemeList
            } else {
              this.searchNull = true
            }
          }
        }
      },
      goback (val) {
        console.log(this.currentTag)
        if (this.text === '取消') {
          this.$router.push({
            path: '/'
          })
        } else {
          if (this.currentTag !== '') {
            /* 在当前没有currentTag所选标签中搜 */
            this.historyTag.push(val)
            this.searchTag(this.currentTag, val)
          } else {
            console.log('没有currentTag')
          }
        }
      },
      searchFn (val) {
        if (this.text !== '取消') {
          if (this.currentTag !== '') {
            /* 在当前currentTag所选标签中搜 */
            this.historyTag.push(val)
            this.searchTag(this.currentTag, val)
          } else {
            console.log('没有currentTag')
          }
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
          let _this = this
          setTimeout(function () {
            _this.searchTag(_this.currentTag, _this.inputVal)
          }, 300)
        }
      }
    },
    components: {
      searchHeader
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
    height:100%;
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
