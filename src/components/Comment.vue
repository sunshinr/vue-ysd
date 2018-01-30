<template>
  <div class="commentBox">
    <HeaderBar3 title="评论"></HeaderBar3>
    <div class="comment">
      <ul>
        <li class="list" v-for="(item, index) in discussList" :key="index">
          <img :src="item.doctorPic" alt="">
          <div class="right">
            <div class="name">{{item.doctorName}}
              <div class="commentAction">
                <span><i class="icon iconfont " :class="item.helpfulStatus == 0 ? 'icon-xihuan' : 'icon-xihuan1'" @click="discusslike(item.doctorCommentId)"></i>{{item.helpfulCount}}</span>
                <span><i class="icon iconfont icon-pinglun" @click="againComment(item.doctorCommentId)"></i></span>
              </div>
            </div>
            <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
            <p>{{item.content}}</p>
            <div class="reply" v-show="item.additionalVos != null">
              <div class="triangle"></div>
              <div class="cont" v-for="cell in item.additionalVos">
                <div class="people">{{cell.doctorName}}:<span>{{cell.content}}</span></div>
              </div>
            </div>
          </div>
        </li>

      </ul>

    </div>
    <!--底部评论组件-->
    <div class="writeComment">
      <i class="icon iconfont icon-biaoqing2"></i>
      <input type="text" placeholder="写评论..." v-model="discuss">
      <i class="icon iconfont icon-fasong" @click="sendComment"></i>
    </div>
    <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无评论" v-if="discussList.length===0"></NoData>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        collectFlag: true,
        discuss: '',
        discussList: []
      }
    },
    created () {
      console.log(this.$route.query.type)
      this.commentApi()
    },
    mounted () {
      //this.commentApi()
    },
    methods: {
      async likeSchoolVideo () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.query.id,
          type: this.$route.query.type // 知识点赞
        }
        const res = await this.$api.post('basic/helpful.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.commentApi()
        }
      },
      async collectSchoolVideo () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.query.id,
          type: 3 // 收藏的学堂知识
        }
        const res = await this.$api.post('basic/mark.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.commentApi()
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
      async commentApi () {
        /* 查询评论列表 */
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.query.id, // 知识ID
          // Id: 4,
          type: this.$route.query.type, // 知识的评论
          pageSize: 10,
          currentPage: 1
        }
        const res = await this.$api.post('basic/commentList.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.discussList = res.data.commentList
        }
      },
      async sendComment () {
        if (this.discuss != '') {
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            // Id: this.$route.params.id,
            Id: this.$route.query.id,
            type: this.$route.query.type, // 知识的评论
            commentContent: this.discuss
          }
          const res = await this.$api.post('basic/comment.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            this.commentApi()
            this.discuss = ''
          }
        }
      },
      async discusslike (disscussId) {
        /* 对评论的点赞 */
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: disscussId, // 评论的ID
          type: 3 // 对评论的点赞
        }
        const res = await this.$api.post('basic/helpful.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.commentApi()
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
      MessageBox
    }
  }
</script>
<style lang="less" scoped>
.commentBox{
  .icon-shoucang1{
    color: #ff9b0d !important;
  }
  .icon-xihuan{
    color: #ff5c36 !important;
  }
  .comment{
    padding-left:1.5rem;
    margin-top:5.5rem;
    background: #ffffff;
    margin-bottom:5rem;
    ul{
      overflow: hidden;
      .list{
        overflow: hidden;
        border-bottom:solid 1px #d9d9d9;
        padding:1.5rem 1.5rem 1rem 0;
        img{
          width:4rem;
          height:4rem;
          display: inline-block;
          border-radius: 100%;
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
      width:78%;
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
