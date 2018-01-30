<template>
  <div class="classify">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <div class="list" v-for="(item, index) in classifyList" :key="index">
        <div class="listTop">
          <span><img :src="item.doctorPic" alt=""></span>{{item.doctorName}}
        </div>
        <div class="video_con">
          <div class="video_play_num">
            <router-link :to="'/playVideo/'+item.knowledgeVideoId"><p>{{item.videoName}}?</p></router-link>
            <span>111次播放  {{videoLength[index]}}</span>
            <i class="icon iconfont icon-play1 video_play"></i>
          </div>
          <video :src="item.videoContent" class="video_paused"></video>
        </div>
        <div class="listBottom">
          <div class="left">
            <a>收藏<span>{{item.videoCollectNum | MaxOrMinNum}}</span></a>
            <a>评论<span>{{item.videoCommentNum | MaxOrMinNum}}</span></a>
            <a>有用<span>{{item.videoLikeNum | MaxOrMinNum}}</span></a>
          </div>
          <div class="right">{{$WhiteBackground.timeFn(item.videoCreateTime)}}</div>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
        <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
      </infinite-loading>
    </div>
    <div class="no-data" v-if="nullVal">
      <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无该学堂" v-if="classifyList.length===0"></NoData>
    </div>

  </div>
</template>
<script>
  import $ from 'jquery'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data () {
      return {
        title: '',
        classifyList: [],
        videoLength: [],
        nullVal: false
      }
    },
    created () {
      console.log(this.$route.params.id)
      this.loadApi()
    },
    mounted(){

    },
    methods: {
      async loadApi () {

      },
      formatSeconds (value) {
        /*将秒转为时分秒*/
        var theTime = parseInt(value);// 秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        if(theTime > 60) {
          theTime1 = parseInt(theTime/60);
          theTime = parseInt(theTime%60);
          if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
          }
        }
        var result = ""+parseInt(theTime)+"秒";
        if(theTime1 > 0) {
          result = ""+parseInt(theTime1)+"分"+result;
        }
        if(theTime2 > 0) {
          result = ""+parseInt(theTime2)+"小时"+result;
        }
        return result;
      },
      infiniteHandler($state) {
        setTimeout(async () => {
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            schoolTypeId: this.$route.params.id,
            currentPage: 1,
            showCount: 3
          }
          const res = await this.$api.post('school/getSchoolTypeInfo.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            this.classifyList = res.data.schoolTypeInfoList
            this.title = res.data.typeName
            let _this = this
            if(this.classifyList.length === 0){
              this.nullVal = true
            } else {
              setTimeout(function() {
                /* 视频播放暂停切换 */
                for(var i=0; i< $('.video_con').length; i++){
                  (function(i){
                    document.getElementsByClassName('video_play')[i].onclick = function(){
                      console.log(1)

                      for(var n=0; n < $('.video_con').length; n++){
                        document.getElementsByClassName('video_paused')[n].pause();
                        $('.video_play_num').fadeIn(100)
                      }
                      document.getElementsByClassName('video_paused')[i].play();
                      $(this).parent().fadeOut(100)
                    };
                    document.getElementsByClassName('video_paused')[i].onclick = function(){
                      document.getElementsByClassName('video_paused')[i].pause();
                      $(this).prev().fadeIn(100)
                    };
                    document.getElementsByClassName('video_paused')[i].addEventListener("ended",function(){
                      $('.video_play_num').fadeIn(100)
                    })
                  })(i)
                }

                $('.list video').each(function (i,v) {
                  _this.videoLength.push(_this.formatSeconds($(v)[0].duration))
                })
              }, 100)
            }



          }
          $state.complete();
          $state.loaded();
        },1000)
      }
  },
    components: {
      InfiniteLoading
    }
  }
</script>
<style lang="less" scoped>
.classify{
  .box{
    .no-more-data{
      color: #ccc;
    }
    margin-top:5rem;
    .list{
      margin-top:1rem;
      background: #ffffff;
      padding:1rem 1.5rem;
      .listTop{
        width:100%;
        font-size:1.5rem;
        >span{
          width: 3.6rem;
          height: 3.6rem;
          margin-right: 0.8rem;
          border-radius: 100%;
          margin-top: 0.8rem;
          display: inline-block;
          border: solid 1px #cccccc;
          img{
            width: 100%;
            border-radius: 100%;
            height: 100%;
          }
        }
      }
      .listBottom{
        width:100%;
        overflow: hidden;
        font-size:1.2rem;
        color: #bbbbbb;
        .left{
          float: left;
          width:60%;
          display: flex;
          > a{
            display: inline-block;
            flex:1;
            font-size:1.2rem;
            color: #bbbbbb;
            > span{
              margin-left:0.5rem;
            }
          }
        }
        .right{
          float: right;
        }
      }

      .video_con{
        width: 100%;
        height: 20rem;
        margin: 1.5rem 0;
        overflow: hidden;
        position: relative;
        .video_play_num{
          height: 100%;
          width: 100%;
          position: absolute;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          z-index:10;
          a{
            display: block;
            text-decoration: none;
            p{
              font-size:1.7rem;
              color: #ffffff;
              margin: 1.5rem 0 1.5rem 1.5rem;
              text-align: left;
            }
          }

          span {
            position: absolute;
            bottom: 0;
            color: #ffffff;
            width: 100%;
            display: block;
            padding: 1rem;
            font-size: 1.2rem;
            text-align: left;
          }
          .icon {
            font-size: 6.6rem;
            color: #fff;
            display: inline-block;
            margin-top: 1.5rem;
          }
        }
        video {
          width: 100%;
          height: 100%;
          display: block;
          background: #000;
        }
      }
    }
  }
}
.no-data{
  padding-top: 8rem;
}
</style>
