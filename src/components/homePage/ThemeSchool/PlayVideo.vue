<template>
  <div class="playVideo">
    <div class="play">
      <div class="video_con">
        <div class="video_play_num">
          <i class="icon iconfont icon-play1 video_play"></i>
        </div>
         <video :src="videoDetail.videoContent" controls="controls" class="video_paused"></video>
      </div>
      <i class="icon iconfont icon-fanhui" @click="goPre"></i>
    </div>
    <div class="videoDetail">
      <p>{{videoDetail.videoName}}</p>
      <div class="doctor">
        <img :src="videoDetail.doctorPic" alt="">
        <a>{{videoDetail.doctorName}}<span>{{videoDetail.doctorTitle}}</span></a>
        <div class="hospital">{{videoDetail.doctorOrgan}}</div>
      </div>
      <div class="action">
        <span><i class="icon iconfont" @click="collectSchoolVideo()" :class="videoDetail.collectStatus == 0 ? 'icon-shoucang1' : 'icon-shoucang'"></i>{{videoDetail.videoCollectNum}}</span>
        <span><i class="icon iconfont " :class="videoDetail.likeStatus == 0 ? 'icon-xihuan' : 'icon-xihuan1'" @click="likeSchoolVideo()"></i>{{videoDetail.videoLikeNum}}</span>
        <span><i class="icon iconfont icon-fenxiang"></i>{{videoDetail.videoCommentNum}}</span>
      </div>
    </div>
    <div class="comment">
      <ul>
        <li class="list clear" v-for="(item, index) in discussList" :key="index" >
          <i class="imgBox"><img :src="item.doctorPic" alt=""></i>
          <div class="right">
            <div class="name">{{item.doctorName}}
              <div class="commentAction">
                <span><i class="icon iconfont " :class="item.helpfulStatus == 0 ? 'icon-xihuan' : 'icon-xihuan1'" @click="discusslike(item.doctorCommentId)"></i>{{item.helpfulCount}}</span>
                <span><i class="icon iconfont icon-pinglun" @click="againComment(item.doctorCommentId)"></i></span>
              </div>
            </div>
            <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
            <div class="commentMain">{{item.content}}</div>
            <div class="reply" v-show="item.additionalVos != null">
              <div class="triangle"></div>
              <div class="cont" v-for="cell in item.additionalVos">
                <div class="people">{{cell.doctorName}}:<span>{{cell.content}}</span></div>
              </div>
            </div>
          </div>
        </li>

        <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
          <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
        </infinite-loading>

      </ul>

    </div>
    <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无评论" v-show="nullVal"></NoData>
    <!--底部评论组件-->
    <div class="writeComment">
      <i class="icon iconfont icon-biaoqing2"></i>
      <input type="text" placeholder="写评论..." v-model="discuss">
      <i class="icon iconfont icon-fasong" @click="sendComment"></i>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data () {
      return {
        collectFlag: true,
        discuss: '',
        videoDetail: '',
        discussList: [],
        nullVal:false,
        pageSize:4
      }
    },
    created () {
      console.log(this.$route.params.id)
      this.loadApi()
    },
    mounted () {
      //this.commentApi()

      //      视频播放暂停切换
      for (var i = 0; i < $('.video_con').length; i++) {
        (function (i) {
          document.getElementsByClassName('video_play')[i].onclick = function () {
            for (var n = 0; n < $('.video_con').length; n++) {
              document.getElementsByClassName('video_paused')[n].pause()
              $('.video_play_num').fadeIn(100)
            }
            document.getElementsByClassName('video_paused')[i].play()
            $(this).parent().fadeOut(100)
          }
          document.getElementsByClassName('video_paused')[i].onclick = function () {
            document.getElementsByClassName('video_paused')[i].pause()
            $(this).prev().fadeIn(100)
          }
          document.getElementsByClassName('video_paused')[i].addEventListener('ended', function () {
            $('.video_play_num').fadeIn(100)
          })
        })(i)
      }

    },
    methods: {
      async likeSchoolVideo () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.params.id,
          type: 2 // 知识点赞
        }
        const res = await this.$api.post('basic/helpful.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.loadApi()
        }
      },
      async collectSchoolVideo () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.params.id,
          type: 3 // 收藏的学堂知识
        }
        const res = await this.$api.post('basic/mark.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.loadApi()
        }
      },
      goPre () {
        this.$router.go(-1)
      },
      collect () {
        this.collectFlag = !this.collectFlag
      },
      like () {
        this.likeFlag = !this.likeFlag
      },
      async loadApi () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          knowledgeId: this.$route.params.id
        }
        const res = await this.$api.post('school/getSchoolVideoInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.videoDetail = res.data.videoInfo
        }
      },
      infiniteHandler($state) {
        setTimeout(async () => {
          console.log('第一次page:'+ this.pageSize)
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            Id: this.$route.params.id, // 知识ID
            type: 2, // 知识的评论
            pageSize: this.pageSize,
            currentPage: 1
          }
          const res = await this.$api.post('basic/commentList.do', params)

          if (res.data.stateCode === '001') {
            console.log(res.data)
            this.discussList = res.data.commentList
            console.log(params.pageSize)
            if(this.pageSize < res.data.countRecord){
              this.pageSize += 4;
            } else if(this.pageSize >= res.data.countRecord){
              this.pageSize += (this.pageSize-res.data.countRecord);
             $state.complete();
            }

           if(this.discussList.length === 0 ){
              this.nullVal = true
           }
          }
          $state.loaded();
        },1000)
      },
      async sendComment () {
        if (this.discuss != '') {
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            Id: this.$route.params.id,
            type: 2, // 知识的评论
            commentContent: this.discuss
          }
          const res = await this.$api.post('basic/comment.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            alert('评论成功')
            this.discussList.push()
          }
        }
      },
      async discusslike (disscussId) {
        /* 对评论的点赞 */
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: disscussId, // 评论的ID
          type: 3 // 评论的点赞
        }
        const res = await this.$api.post('basic/helpful.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.infiniteHandler()
        }
      },
      againComment (commentId) {
        /* 对评论的评论 */
        MessageBox.prompt('请输入评论内容').then(({ value, action }) => {
          this.againCommentApi(commentId, value)
        })
      },
      async againCommentApi (commentId, value) {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: commentId, // 评论的ID
          commentContent: value // 评论的内容
        }
        const res = await this.$api.post('basic/additional.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.commentApi()
        }
      }
    },
    components:{
      MessageBox,
      InfiniteLoading
    }
  }
</script>
<style lang="less" scoped>
.playVideo{
  .no-more-data{
    color: #ccc;
  }
  .video_con{
    width: 100%;
    height: 20rem;
    overflow: hidden;
    position: relative;
    video::-webkit-media-controls {
      display: none !important;
    }
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
        margin-top:5.8rem;
        position: initial;
      }
    }
    video {
      width: 100%;
      height: 100%;
      display: block;
      background: #000;
    }
  }


  .icon-shoucang1{
    color: #ff9b0d !important;
  }
  .icon-xihuan{
    color: #ff5c36 !important;
  }
  .play{
    position: fixed;
    background: #ffffff;
    top:0;
    left:0;
    z-index:1;
    height: auto;
    width:100%;
    video{
      width:100%;
      height:21.1rem;
      background: #000;
    }
    i{
      position: absolute;
      top:2rem;
      left:1.5rem;
      font-size:1.6rem;
      color: #ffffff;
      z-index:99;
    }
  }
  .videoDetail{
    background: #ffffff;
    padding:1.5rem;
    margin-top: 21rem;
    p{
      font-size:1.8rem;
    }
    .doctor{
      margin:1.5rem 0;
      overflow: hidden;
      img{
        width:3.5rem;
        height:3.5rem;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        vertical-align: middle;
      }
      a{
        font-size:1.6rem;
        margin-left:1rem;
        span{
          font-size:1.2rem;
          color: #999999;
          margin-left: 0.6rem;
        }
      }
      .hospital{
        float: right;
        font-size:1.6rem;
        color: #999999;
        margin-top: 0.3rem;
      }
    }
    .action{
      margin-top:1rem;
      width:65%;
      display: flex;
      span{
        display: inline-block;
        flex:1;
        color: #999999;
        font-size:1.4rem;
        i{
          color: #999999;
          font-size: 2.1rem;
          margin-right: 0.4rem;
          vertical-align: middle;
        }
      }

    }
  }
  .comment{
    padding-left:1.5rem;
    margin-top:0.5rem;
    background: #ffffff;
    margin-bottom:5rem;
    ul{
      overflow: hidden;
      .list{
        overflow: hidden;
        border-bottom:solid 1px #d9d9d9;
        padding:1.5rem 1.5rem 1rem 0;
        i.imgBox{
          width:4rem;
          height:4rem;
          display: inline-block;
          border-radius: 100%;
          border: solid 1px #d9d9d9;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
        .right{
          width:84%;
          float: right;
          .name{
            font-size:1.4rem;
            overflow: hidden;
            .commentAction{
              float: right;
              span{
                font-size:1.2rem;
                color: #999999;
                margin-left: 1.5rem;
                i{
                  font-size:2rem;
                  color: #999999;
                  margin-right:0.4rem;
                  vertical-align: middle;
                }
              }
            }
          }
          .time{
            font-size:1.2rem;
            color: #999999;
          }
          p{
            font-size:1.5rem;
            margin-top: 1rem;
          }
          .commentMain{
            font-size:1.5rem;
            margin-top: 1rem;
            white-space:normal;
            word-break:break-all;
            overflow:hidden;
            /*text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;*/
          }
          .reply{
            margin-top: 1rem;
            .triangle{
              width: 0;
              height: 0;
              border-right: 1.5rem solid transparent;
              border-bottom: 1.5rem solid #f5f5f5;
              border-left: 1.5rem solid transparent;
              margin-left: 1.5rem;
            }
            .cont{
              background: #f5f5f5;
              border-radius: 0.4rem;
              padding:1.5rem;
              margin-top: -0.5rem;
              .people{
                font-size:1.5rem;
                color: #447ecf;
                span{
                  color: #000;
                  margin-left: 0.5rem;
                  white-space:normal;
                  word-break:break-all;
                  overflow:hidden;
                }
              }
            }
          }
        }
      }
    }
  }
  /*底部评论组件*/
  .writeComment{
    position: fixed;
    width:100%;
    background: #ffffff;
    padding:0.8rem 0 0.8rem 1.5rem;
    bottom:0;
    left:0;
    border-top:solid 1px #d9d9d9;
    input{
      display: inline-block;
      -webkit-border-radius: 0.6rem;
      -moz-border-radius: 0.6rem;
      border-radius: 0.6rem;
      border:solid 1px #dbd9d9;
      padding:0.8rem 1.2rem;
      font-size:1.4rem;
      width:68%;
      background: #f0f0f0;
    }
    i{
      font-size: 3rem;
      color: #999999;
      vertical-align: middle;
      // margin-left: 1.7rem;
    }
  }
}

</style>
