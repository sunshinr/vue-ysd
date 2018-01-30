<template>
    <div class="discuss">
      <HeaderBar3 :title="title"></HeaderBar3>
      <div class="comment">
        <ul>
          <li class="list">
            <img src="/static/img/userinfo_07.jpg" alt="">
            <div class="right">
              <div class="name">楚春风
                <div class="commentAction">
                  <span><i class="icon iconfont " :class="likeFlag ? 'icon-xihuan1' : 'icon-xihuan'" @click="like"></i>124</span>
                  <span><i class="icon iconfont icon-pinglun"></i></span>
                </div>
              </div>
              <div class="time">10:00</div>
              <p>讲的不错，挺详细的</p>
            </div>
          </li>
          <li class="list">
            <img src="/static/img/userinfo_07.jpg" alt="">
            <div class="right">
              <div class="name">邢岫烟
                <div class="commentAction">
                  <span><i class="icon iconfont icon-xihuan1"></i>124</span>
                  <span><i class="icon iconfont icon-pinglun"></i></span>
                </div>
              </div>
              <div class="time">10:00</div>
              <p>讲的不错，挺详细的</p>
              <div class="reply">
                <div class="triangle"></div>
                <div class="content">
                  <div class="people">马小月:<span>666</span></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--底部评论组件-->
      <div class="writeComment">
        <input type="text" placeholder="写评论...">
        <i class="icon iconfont icon-biaoqing2"></i>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '评论',
        likeFlag: false
      }
    },
    created () {

    },
    methods: {
      like () {
        this.likeFlag = !this.likeFlag
      }
    },
    components: {
    }
  }
</script>
<style lang="less" scoped>
.discuss{
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
            .content{
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
      width:80%;
      background: #f0f0f0;
    }
    i{
      font-size: 3rem;
      color: #999999;
      vertical-align: middle;
      margin-left: 1.7rem;
    }
  }
  .icon-xihuan{
    color: #ff5c36 !important;
  }
}
</style>
