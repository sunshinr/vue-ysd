<template>
  <div class="homepage-wrap">
    <headerBar title="健康由我 医生助手"></headerBar>
    <div class="banner">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item, index) in picList" :key="index">
          <router-link :to="{path:'/QuestionDetails',query:{questionId:item.urltypeId}}" v-if="item.urltype == 1"><img :src="item.picUrl" :onerror="errorImg01"></router-link>
          <router-link :to="{path:'/PlayVideo/'+item.urltypeId}" v-if="item.urltype == 2"><img :src="item.picUrl" :onerror="errorImg01"></router-link>
          <router-link :to="{path:'/EvaluationDetails',query:{id:item.urltypeId}}" v-if="item.urltype == 3"><img :src="item.picUrl" :onerror="errorImg01"></router-link>
          <router-link :to="{path:'/SystemProgrammeDetails'+item.urltypeId}" v-if="item.urltype == 4"><img :src="item.picUrl" :onerror="errorImg01"></router-link>
          <router-link :to="{path:item.infoType==1?'/KnowledgeDetails':'/PlayVideo/',query:{id:item.urltypeId}}" v-if="item.urltype == 5"><img :src="item.picUrl" :onerror="errorImg01"></router-link>
          <div @click="See(item.httpUrl)" v-if="item.urltype == 6"><img :src="item.picUrl" :onerror="errorImg01"></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ul class="home-nav clear">
      <li>
        <router-link to="/SpecialColumnIndex">
          <i class="icon iconfont icon-zhuanlan colffac2d"></i>
          <p>专栏</p>
        </router-link>
      </li>
      <li>
        <router-link to="/SchoolIndex">
          <i class="icon iconfont icon-xuetang col1a9fff"></i>
          <p>学堂</p>
        </router-link>
      </li>
      <li>
        <router-link to="/QandA">
          <i class="icon iconfont icon-wenda colff4055"></i>
          <p>问答</p>
        </router-link>
      </li>
      <li>
        <router-link to="/Programme">
          <i class="icon iconfont icon-fangan col42bd56"></i>
          <p>方案</p>
        </router-link>
      </li>
      <li>
        <router-link to="/toolIndex">
          <i class="icon iconfont icon-gongju col7e7be2"></i>
          <p>工具</p>
        </router-link>
      </li>
    </ul>
    <h3 class="home-tip"><span>推荐</span></h3>
    <div class="home-recommend">
      <ul class="clear" :style="liwidth">
        <li v-for="(item, index) in recommendList" :key="index">
          <router-link :to="{path:'/QuestionDetails',query:{questionId:item.urltypeId}}" v-if="item.urltype == 1">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </router-link>
          <router-link :to="{path:'/PlayVideo/'+item.urltypeId}" v-if="item.urltype == 2">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </router-link>
          <router-link :to="{path:'/EvaluationDetails',query:{id:item.urltypeId}}" v-if="item.urltype == 3">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </router-link>
          <router-link :to="{path:'/SystemProgrammeDetails'+item.urltypeId}" v-if="item.urltype == 4">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </router-link>
          <div v-if="item.urltype == 5">
          <router-link :to="{path:item.infoType==1?'/KnowledgeDetails':'/PlayVideo/',query:{id:item.urltypeId}}">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </router-link>
          </div>
          <div @click="See(item.titleUrl)" v-if="item.urltype == 6">
            <img :src="item.picUrl" :onerror="errorImg01">
            <p>{{$WhiteBackground.LimitText(item.title, 12)}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="home-navbar">
      <mt-navbar v-model="navSelected">
        <mt-tab-item id="1">热门</mt-tab-item>
        <mt-tab-item id="2">关注</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-tab-container v-model="navSelected">
      <mt-tab-container-item id="1">
        <div class="home-hot">
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无热门" v-if="hotList.length===0"></NoData>
          <dl v-for="item in hotList" :key="item.id" v-if="hotList.length>0">
            <div v-if="item.type == 1">
              <div v-if="item.knowledgeVo.infotype ===1">
              <dt><img :src="item.knowledgeVo.doctorPic != null ? item.knowledgeVo.doctorPic : '/static/images/defaultIcon.png'" :onerror="errorImg02"> {{item.knowledgeVo.doctorName}} <span> <i class="icon iconfont icon-biaoqian"></i> {{item.knowledgeVo.name}}</span></dt>
              <router-link :to="{path:'/KnowledgeDetails',query:{id:item.targetId}}">
                <dd>{{item.knowledgeVo.name}}</dd>
                <dd><div v-html="item.knowledgeVo.content"></div></dd>

              </router-link>
              </div>
              <div v-if="item.knowledgeVo.infotype ===2">
                <dt><img :src="item.knowledgeVo.doctorPic != null ? item.knowledgeVo.doctorPic : '/static/images/defaultIcon.png'" :onerror="errorImg02"> {{item.knowledgeVo.doctorName}} <span> <i class="icon iconfont icon-biaoqian"></i> {{item.knowledgeVo.name}}</span></dt>
                <dd class="video_con">
                  <div class="video_play_num">
                    <router-link :to="{path:'/playVideo/'+item.targetId}">{{item.knowledgeVo.name}}</router-link>
                    <i class="icon iconfont icon-play1 video_play"></i>
                  </div>
                  <video :src="item.knowledgeVo.content" class="video_paused"></video>
                </dd>
                <dd></dd>
              </div>
              <dd>
                <span>收藏 {{item.knowledgeVo.collectNum | MaxOrMinNum}}</span>
                <span>评论 {{item.knowledgeVo.commentNum | MaxOrMinNum}}</span>
                <span>有用 {{item.knowledgeVo.likeNum | MaxOrMinNum}}</span>
                <span>{{$WhiteBackground.timeFn(item.knowledgeVo.createTime)}}</span>
              </dd>
            </div>
            <div v-if="item.type == 2">
              <dt><img :src="item.videoVo.doctorPic != null ? item.videoVo.doctorPic : '/static/images/defaultIcon.png'" :onerror="errorImg02"> {{item.videoVo.doctorName}}000 <span> <i class="icon iconfont icon-biaoqian"></i> {{item.videoVo.doctorTitle}}</span></dt>
              <!--<dd><router-link :to="{path:'/playVideo/'+item.targetId}">{{item.videoVo.videoName}}</router-link>
                </dd>-->
              <dd class="video_con">
                <div class="video_play_num">
                  <router-link :to="{path:'/playVideo/'+item.targetId}">{{item.videoVo.videoName}}</router-link>
                  <i class="icon iconfont icon-play1 video_play"></i>
                </div>
                <video :src="item.videoVo.videoContent" class="video_paused"></video>
              </dd>
              <dd>{{item.videoVo.videoSynopsis}}</dd>
              <dd>
                <span>收藏 {{item.videoVo.videoCollectNum | MaxOrMinNum}}</span>
                <span>评论 {{item.videoVo.commentNum | MaxOrMinNum}}</span>
                <span>有用 {{item.videoVo.videoLikeNum | MaxOrMinNum}}</span>
                <span>{{$WhiteBackground.timeFn(item.videoVo.videoCreateTime)}}</span>
              </dd>
            </div>
            <div v-if="item.type == 3">
              <div>
                <div class="headImg"><img :src="item.doctorQuestionVo.doctorPic != null ? item.doctorQuestionVo.doctorPic : '/static/images/defaultIcon.png'" alt="" :onerror="errorImg02">
                  <h4>{{item.doctorQuestionVo.doctorName}}</h4><span>提问</span><span class="time">{{$WhiteBackground.timeFn(item.doctorQuestionVo.createTime)}}</span></div>
                <h3>
                  <router-link :to="{path:'/QuestionDetails',query:{questionId:item.targetId}}">{{item.doctorQuestionVo.title}}</router-link>
                </h3>
                <p>{{item.doctorQuestionVo.questionDescribe}}</p>
              </div>
              <div class="Answer_btn">
                <a style="display: none;"><i class="icon iconfont icon-biaoqian">{{item.doctorQuestionVo.keywords.name}}</i> </a> <span class="f_r f_r_icon"><i class="icon iconfont icon-bi-"></i>回答</span>
                <span class="f_r f_r_icon ignore "><i class="icon iconfont icon-hulve-"></i>忽略</span>
              </div>
            </div>
            <div v-if="item.type == 4">
              <div class="head"><img :src="item.systemSchemeVo.doctorPic != null ? item.systemSchemeVo.doctorPic : '/static/images/defaultIcon.png'" alt="" :onerror="errorImg02">
                <h3>{{item.systemSchemeVo.doctorName}}</h3>
              </div>
              <div class="programme_name">
                <router-link :to="'/SystemProgrammeDetails'+item.targetId">{{item.systemSchemeVo.schemeName}}</router-link><span>{{item.systemSchemeVo.systemRecipesVos.length}}项</span></div>
              <div class="Assessment_num"><span><img src="/static/images/jinbi.png" alt="">{{item.systemSchemeVo.schemeScore}}</span>已使用{{item.systemSchemeVo.schemeFavNum | MaxOrMinNum }}次</div>
            </div>
            <div v-if="item.type == 5">
              <div class="head"><img :src="item.systemEvaluateVo.doctorPic != null ? item.systemEvaluateVo.doctorPic : '/static/images/defaultIcon.png'" alt="" :onerror="errorImg02">
                <h3>{{item.systemEvaluateVo.doctorName}}</h3>
              </div>
              <div class="programme_name">
                <router-link :to="{path:'/EvaluationDetails',query:{id:item.targetId}}">{{item.systemEvaluateVo.title}}</router-link> <span>{{item.systemEvaluateVo.questionNumber}}项</span></div>
              <div class="Assessment_num"><span><img src="/static/images/jinbi.png" alt="">{{item.systemEvaluateVo.evaluateScore}}</span>已评估{{item.systemEvaluateVo.evaluateNumber | MaxOrMinNum}}次</div>
            </div>
          </dl>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无关注" v-if="attentionList.length===0"></NoData>
        <div class="home-hot">
          <dl v-for="item in attentionList" :key="item.id">
            <div v-if="item.infotype == 1">
              <dt><img :src="item.doctorPic != null ? item.doctorPic : '/static/images/defaultIcon.png'" :onerror="errorImg02"> {{item.doctorName}}<span> <i class="icon iconfont icon-biaoqian"></i> {{item.name}}</span></dt>
              <router-link :to="{path:'/KnowledgeDetails',query:{id:item.targetId}}">
              <dd>
                {{item.synopsis}}
              </dd>
              <dd>
              <div v-html="item.content"></div>
              </dd>
              </router-link>
              <dd>
                <span>收藏 {{item.collectNum | MaxOrMinNum}}</span>
                <span>评论 {{item.commentNum | MaxOrMinNum}}</span>
                <span>有用 {{item.likeNum | MaxOrMinNum}}</span>
                <span>{{$WhiteBackground.timeFn(item.createTime)}}</span>
              </dd>
            </div>
            <div v-if="item.infotype == 2">
              <dt><img :src="item.doctorPic != null ? item.doctorPic : '/static/images/defaultIcon.png'" :onerror="errorImg02"> {{item.doctorName}}<span> <i class="icon iconfont icon-biaoqian"></i> {{item.name}}</span></dt>
              <dd class="video_con">
                <div class="video_play_num">
                  <router-link :to="{path:'/playVideo/'+item.knowledgeId}">{{item.name}}</router-link>
                  <i class="icon iconfont icon-play1 video_play"></i>
                </div>
                <video :src="item.content" class="video_paused"></video>
              </dd>
              <dd>{{item.synopsis}}</dd>
              <dd>
                <span>收藏 {{item.collectNum | MaxOrMinNum}}</span>
                <span>评论 {{item.commentNum | MaxOrMinNum}}</span>
                <span>有用 {{item.likeNum | MaxOrMinNum}}</span>
                <span>{{$WhiteBackground.timeFn(item.createTime)}}</span>
              </dd>
            </div>
          </dl>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <footerBar selectedVal="/"></footerBar>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        selected: 2,
        navSelected: "1",
        picList: [],
        recommendList: [],
        hotList: [],
        attentionList: [],
        liwidth: '',
        errorImg01: 'this.src="' + require('@/assets/logo.png') + '"',
        errorImg02: 'this.src="' + require('@/assets/defaultIcon.png') + '"'
      };
    },
    components: {},
    watch: {
      navSelected: function(val, oldVal) {
        console.log(val);
        if (val == 1) {
          /* 热门 */
          this.hotApi();
        } else {
          this.AttentionApi();
        }
      }
    },
    created() {
      this.recommendApi();
      this.loadPicApi();
    },
    mounted() {
      //this.recommendApi()
      if (this.navSelected == 1) {
        /* 热门 */
        this.hotApi();
      } else {
        this.AttentionApi();
      }
      this.videoPlayApi()
    },
    methods: {
      See(e) {
        window.location.href = "http://" + e
      },
      videoPlayApi() {
        /*点击播放视频*/
        setTimeout(function() {
          console.log($('.video_con').length)
          /* 视频播放暂停切换 */
          for (var i = 0; i < $('.video_con').length; i++) {
            (function(i) {
              document.getElementsByClassName('video_play')[i].onclick = function() {
                for (var n = 0; n < $('.video_con').length; n++) {
                  document.getElementsByClassName('video_paused')[n].pause();
                  $('.video_play_num').fadeIn(100)
                }
                document.getElementsByClassName('video_paused')[i].play();
                $(this).parent().fadeOut(100)
              };
              document.getElementsByClassName('video_paused')[i].onclick = function() {
                document.getElementsByClassName('video_paused')[i].pause();
                $(this).prev().fadeIn(100)
              };
              document.getElementsByClassName('video_paused')[i].addEventListener("ended", function() {
                $('.video_play_num').fadeIn(100)
              })
            })(i)
          }
        }, 1000)
      },
      ulwidth() {
        this.liwidth = 'width:' + (15 * this.recommendList.length) + 'rem'
        console.log(this.liwidth)
      },
      async loadPicApi() {
        let params = {}
        const res = await this.$api.post('index/picList.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.picList = res.data.picList
        }
      },
      async recommendApi() {
        let params = {
          /* RecommendStatus: 0,
               status: 1,*/
          size: 0
        };
        const res = await this.$api.post("index/recommendList.do", params);
        console.log(res.data);
        if (res.data.stateCode === "001") {
          this.recommendList = res.data.hotRecommendList;
          this.ulwidth()
        }
      },
      async hotApi() {
        let params = {
          doctorId: localStorage.getItem("doctorId")
        };
        const res = await this.$api.post("index/hotList.do", params);
        console.log(res.data);
        if (res.data.stateCode === "001") {
          this.hotList = res.data.hotList;
          this.videoPlayApi()
        }
      },
      async AttentionApi() {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          pageSize: 3,
          currentPage: 1
        };
        const res = await this.$api.post("index/knowledgeList.do", params);
        console.log(res.data);
        if (res.data.stateCode === "001") {
          this.attentionList = res.data.knowledgeList;
          this.videoPlayApi()
        }
      }
    }
  };
</script>

<style lang="less">
  @col10d1a0 :#10d1a0;
  .homepage-wrap {
    margin: 4.5rem 0 5.5rem;
    .banner {
      height: 19rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .home-nav {
      padding: 2.5rem 0;
      background: #ffffff;
      li {
        width: 20%;
        float: left;
        text-align: center;
        i {
          display: inline-block;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
        }
        .colffac2d {
          color: #ffac2d;
        }
        .col1a9fff {
          color: #1a9fff;
        }
        .colff4055 {
          color: #ff4055;
        }
        .col42bd56 {
          color: #42bd56;
        }
        .col7e7be2 {
          color: #7e7be2;
        }
      }
    }
    .home-tip {
      padding-top: 1rem;
      font-size: 1.7rem;
      background: #f5f5f5;
      span {
        border-left: 0.4rem solid @col10d1a0;
        padding-left: 1rem;
      }
    }
    .home-recommend {
      background: #f5f5f5;
      padding-top: 1rem;
      position: relative;
      overflow-x: auto;
      overflow-y: hidden;
      ul {
        min-width: 100%;
        li {
          width: 13rem;
          float: left;
          text-align: center;
          margin: 0 0 1.8rem 1.5rem;
          box-shadow: -1rem 0.7rem 1rem rgba(230, 230, 230, 0.8);
          img {
            width: 100%;
            height: 13rem;
            border-top-left-radius: 0.5rem;
            border-top-right-radius: 0.5rem;
          }
          p {
            background: #ffffff;
            height: 4.9rem;
            padding: 0.7rem;
            font-size: 1.4rem;
            color: #333333;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
    .home-navbar .mint-tab-item-label {
      font-size: 1.4rem !important;
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 3px solid @col10d1a0;
      color: @col10d1a0;
      margin-bottom: 1px;
    }
    .home-hot {
      dl {
        background: #ffffff;
        padding: 1.3rem 1.5rem;
        margin-top: 0.5rem;
        dt {
          font-size: 1.5rem;
          color: #333333;
          span {
            float: right;
            font-size: 1.3rem;
            position: relative;
            top: 0.7rem;
            color: #666666;
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
            color: #000000;
          }
          &:last-of-type {
            font-size: 1.2rem;
            color: #bbbbbb;
            max-height: 7rem;
          }
          img,
          video {
            width: 100%;
            height: 15.5rem;
            border-radius: 0.4rem;
          }
          span {
            margin-right: 0.5rem;
            &:last-of-type {
              float: right;
            }
          }
        }
        div{
        }
        dd.video_con {
          width: 100%;
          margin: 1.5rem 0;
          overflow: hidden;
          position: relative;
          .video_play_num {
            height: 100%;
            width: 100%;
            position: absolute;
            background: rgba(0, 0, 0, 0.3);
            text-align: center;
            z-index: 10;
            a {
              display: block;
              text-decoration: none;
              font-size: 1.7rem;
              color: #ffffff;
              margin: 1.5rem 0 1.5rem 1.5rem;
              text-align: left;
            }
            .icon {
              font-size: 5.6rem;
              color: #fff;
              display: inline-block;
              margin-top: 2.5rem;
            }
          }
          video {
            width: 100%;
            height: 21rem;
            background: #000000;
            display: block;
          }
        }
        div {
          p {
            font-size: 1.5rem;
            color: #333333;
            margin-top: 1rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          div {
            .headImg {
              img {
                height: 3.5rem;
                width: 3.5rem;
                border-radius: 3.5rem;
              }
              h4 {
                display: inline-block;
                font-size: 1.6rem;
                margin: 0 1rem;
              }
              span {
                color: #ccc;
                font-size: 1.4rem;
              }
              .time {
                float: right;
                display: inline-block;
                line-height: 3.5rem;
              }
            }
            h3 {
              font-size: 1.7rem;
              padding-top: 1rem;
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
          }
          .Answer_btn {
            padding-top: 1rem;
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
                color: #ccc;
              }
            }
            .ignore {
              margin-right: 2rem;
            }
            .f_r {
              float: right;
            }
          }
          .head {
            height: auto;
            overflow: hidden;
            img {
              height: 3.5rem;
              width: 3.5rem;
              border-radius: 3.5rem;
              float: left;
            }
            h3 {
              height: 3.5rem;
              line-height: 3.5rem;
              float: left;
              margin-left: 1.5rem;
              font-size: 1.5rem;
              padding-top: 0;
            }
          }
          .programme_name {
            font-size: 1.6rem;
            padding: 1rem 0;
            span {
              float: right;
              color: #999999;
            }
          }
          .Assessment_num {
            text-align: right;
            font-size: 1.4rem;
            color: #ff9b0d;
            span {
              float: left;
              color: #999;
              img {
                width: 1.6rem;
                height: 1.6rem;
                margin-right: 0.6rem;
                color: #ff9b0d;
              }
            }
          }
        }
      }
    }
  }
</style>
