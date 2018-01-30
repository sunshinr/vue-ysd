<template>
  <div class="disscussDetail">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="detail">
      <img src="/static/img/userinfo_07.jpg" alt="">
      <div class="right">
        <div class="name">楚春风</div>
        <div class="time">10:00</div>
        <p>讲的不错，挺详细的</p>
      </div>
    </div>
    <div class="content">
      <p class="barTitle">2条回复</p>
      <ul>
        <li class="list">
          <img src="/static/img/userinfo_07.jpg" alt="">
          <div class="right">
            <div class="name">汪洋洋</div>
            <div class="time">16:30</div>
            <p>听起来好有道理的样子，可以试试看</p>
          </div>
        </li>
        <li class="list">
          <img src="/static/img/userinfo_07.jpg" alt="">
          <div class="right">
            <div class="name">江水悠</div>
            <div class="time">16:30</div>
            <p>呵呵哒，不知道效果怎de</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '评论详情'
      }
    },
    created () {

    },
    methods: {},
    components: {
    }
  }
</script>
<style lang="less" scoped>
.disscussDetail{
  .detail{
    margin-top:5.4rem;
    overflow: hidden;
    padding:1.5rem 1.5rem 1rem 1.5rem;
    background: #ffffff;
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
      }
      .time{
        font-size:1.2rem;
        color: #999999;
      }
      p{
        font-size:1.5rem;
        margin-top: 1rem;
      }
    }
  }
  .content{
    padding-left:1.5rem;
    .barTitle{
      padding: 1.5rem 0;
      font-size:1.6rem;
      color: #666666;
      border-bottom:solid 1px #d9d9d9;
    }
    ul{
      .list{
        overflow: hidden;
        padding-top:1.2rem;
        img{
          width:4rem;
          height:4rem;
          display: inline-block;
          border-radius: 100%;
        }
        .right{
          width:84%;
          float: right;
          padding-bottom:1.2rem;
          border-bottom:solid 1px #d9d9d9;
          .name{
            font-size:1.3rem;
            overflow: hidden;
          }
          .time{
            font-size:1.2rem;
            color: #999999;
          }
          p{
            font-size:1.4rem;
            margin-top: 1rem;
          }
        }
      }
    }
  }
}
</style>
