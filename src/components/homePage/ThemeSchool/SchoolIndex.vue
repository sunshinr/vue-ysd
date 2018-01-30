<template>
  <div class="school">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="classify">
      <ul>
        <li v-for="(item, index) in schoolType" :key="index">
          <router-link :to="'/SchoolClassify/'+item.typeId">
            <div class="iconfont schoolIcon" :class="['icon-'+item.typeIcon , 'schoolIcon'+index]"></div>
            <p>{{ $WhiteBackground.LimitText(item.typeName, 5) }}</p>
          </router-link>
        </li>

      </ul>
    </div>
    <p class="title">推荐</p>
    <div class="video">
      <ul>
        <li v-for="(video, index) in videoList" :key="index" @click="goVideoDetail(video.knowledgeVideoId)">
          <span>
                    <img :src="video.videoCover"/>
                    <i class="icon iconfont icon-iconset0481"></i>
                    <div class="time">{{$WhiteBackground.timeFn(video.videoCreateTime)}}</div>
                    <div class="masking"></div>
                  </span>
          <div class="right">
            <div class="rightTop">
             <img :src="video.doctorPic" />{{video.doctorName}} <!--<span>111人观看</span>-->
            </div>
            <p>{{video.videoName}}</p>
            <div class="rightBottom">
              <a>收藏<span>{{video.videoCollectNum | MaxOrMinNum}}</span></a>
              <a>有用<span>{{video.videoLikeNum | MaxOrMinNum}}</span></a>
              <a>评论<span>{{video.videoCommentNum | MaxOrMinNum}}</span></a>
            </div>
          </div>
        </li>
      </ul>

    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
      <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
    </infinite-loading>
    <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无推荐学堂" v-if="nullVal"></NoData>
  </div>

</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data() {
      return {
        title: '主题学堂',
        videoList: [], // 推荐视频列表
        schoolType: [],// 分类列表
        nullVal: false
      }
    },
    created() {
      this.loadSchoolType()
      this.loadVideoApi()
    },
    mounted() {
      //this.loadSchoolType()
    },
    methods: {
      async loadVideoApi() {
        /* 首页推荐视频 */

      },
      async loadSchoolType() {
        let params2 = {
          doctorId: localStorage.getItem('doctorId')
        }
        const res2 = await this.$api.post('school/getSchoolTypeIndex.do', params2)
        console.log(res2.data)
        if (res2.data.stateCode === '001') {
          this.schoolType = res2.data.schoolTypeList
          console.log(res2.data)
        }
      },
      goVideoDetail(videoId) {
        this.$router.push({
          name: 'PlayVideo',
          params: {
            id: videoId
          }
        })
      },
      infiniteHandler($state) {

        setTimeout(async () => {
          console.log(1)
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            currentPage: 1,
            showCount: 3
          }
          const res = await this.$api.post('school/getSchoolRecommendVideoIndex.do', params)
          if (res.data.stateCode === '001') {
            this.videoList = res.data.recommendVideoList
            if(this.videoList.length === 0 ){
              this.nullVal = true
            }
            $state.complete();
          }
          $state.loaded();
        }, 1000)
      }


    },
    components: {
      InfiniteLoading
    }
  }
</script>

<style lang="less" scoped>
  .school {
    .no-more-data{
      color: #ccc;
    }
    .classify {
      background: #fff;
      padding: 0 1.5rem 1.5rem 1.5rem;
      margin-top: 5.5rem;
      ul {
        overflow: hidden;
        li {
          float: left;
          width: 25%;
          text-align: center;
          margin-top: 1.6rem;
          .schoolIcon {
            width: 4.6rem;
            height: 4.6rem;
            line-height: 4.6rem;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
            font-size: 2.5rem;
            color: #ffffff;
            display: inline-block;
            span {
              font-size: 3rem;
              color: #ffffff;
            }
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
              vertical-align: sub;
            }
          }
          p {
            margin-top: 0.6rem;
            font-size: 1.2rem;
          }
        }
        li {
          .schoolIcon0 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#ff262c, #ff706f);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#ff262c, #ff706f);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#ff262c, #ff706f);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#ff262c, #ff706f);
              /* 标准的语法 */
            }
          }
          .schoolIcon1 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#ff9900, #ffd24d);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#ff9900, #ffd24d);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#ff9900, #ffd24d);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#ff9900, #ffd24d);
              /* 标准的语法 */
            }
          }
          .schoolIcon2 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#0093f0, #1fd2ff);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#0093f0, #1fd2ff);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#0093f0, #1fd2ff);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#0093f0, #1fd2ff);
              /* 标准的语法 */
            }
          }
          .schoolIcon3 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#fd5909, #ff9662);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#fd5909, #ff9662);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#fd5909, #ff9662);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#fd5909, #ff9662);
              /* 标准的语法 */
            }
          }
          .schoolIcon4 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#f51485, #fb658c);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#f51485, #fb658c);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#f51485, #fb658c);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#f51485, #fb658c);
              /* 标准的语法 */
            }
          }
          .schoolIcon5 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#3cc43d, #a0de90);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#3cc43d, #a0de90);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#3cc43d, #a0de90);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#3cc43d, #a0de90);
              /* 标准的语法 */
            }
          }
          .schoolIcon6 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#fb4900, #ff8900);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#fb4900, #ff8900);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#fb4900, #ff8900);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#fb4900, #ff8900);
              /* 标准的语法 */
            }
          }
          .schoolIcon7 {
            &:first-of-type {
              background: -webkit-linear-gradient(135deg,#fe9500, #ffcb31);
              /* Safari 5.1 - 6.0 */
              background: -o-linear-gradient(135deg,#fe9500, #ffcb31);
              /* Opera 11.1 - 12.0 */
              background: -moz-linear-gradient(135deg,#fe9500, #ffcb31);
              /* Firefox 3.6 - 15 */
              background: linear-gradient(135deg,#fe9500, #ffcb31);
              /* 标准的语法 */
            }
          }
        }
      }
    }
    p.title {
      padding: 1rem 1.5rem;
      font-size: 1.7rem;
    }
    .video {
      background: #ffffff;
      padding: 0 1.5rem;
      ul {
        overflow: hidden;
        li {
          overflow: hidden;
          margin: 1.5rem 0;
          >span {
            display: inline-block;
            float: left;
            /*width:15.1rem;*/
            height: 10.5rem;
            width: 44%;
            position: relative;
            border-radius: 0.6rem;
            img {
              width: 100%;
              height: 100%;
              -webkit-border-radius: 0.4rem;
              -moz-border-radius: 0.4rem;
              border-radius: 0.4rem;
            }
            i {
              position: absolute;
              top: 34%;
              left: 40%;
              font-size: 3.3rem;
              color: #ffffff;
              z-index: 2;
            }
            .time {
              position: absolute;
              font-size: 1.3rem;
              color: #ffffff;
              right: 1rem;
              bottom: 1rem;
              z-index: 2;
            }
            .masking {
              position: absolute;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.3);
              z-index: 1;
              top: 0;
              left: 0;
              -webkit-border-radius: 0.4rem;
              -moz-border-radius: 0.4rem;
              border-radius: 0.4rem;
            }
          }
          .right {
            width: 53%;
            float: right;
            .rightTop {
              font-size: 1.3rem;
              margin-top: 0.5rem;
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
                color: #999999;
                float: right;
                display: inline-block;
                margin-top: 0.6rem;
              }
            }
            p {
              font-size: 1.5rem;
              margin-top: 1.5rem;
              width: 100%;
            }
            .rightBottom {
              margin-top: 1.1rem;
              display: flex;
              a {
                font-size: 1.2rem;
                color: #999999;
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
</style>
