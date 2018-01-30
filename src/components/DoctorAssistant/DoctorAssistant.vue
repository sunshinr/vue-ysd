<template>
    <div class="doctorAssisrant">
      <Top :title="title"></Top>
      <div class="infoTop">
        <img src="/static/img/userinfo_03.jpg" alt="">
        <div class="imgRight">
          <h3>章洲<span>健康管理师</span></h3>
          <div class="classes"><span class="icon iconfont icon-jinbi"></span>101</div>
          <div class="editBtn">我的信息<span class="icon iconfont icon-jiantou"></span></div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '健康由我 医生助手'
      }
    },
    created () {

    },
    methods: {},
    components: {
      Top
    }
  }
</script>
<style lang="less" scoped>
.doctorAssisrant{
  .infoTop{
    margin-top:5.3rem;
    padding:1.8rem 0 1.6rem 1.5rem;
    overflow: hidden;
    border-bottom:solid 1px #d9d9d9;
    background: -webkit-linear-gradient(#dbf8f1, #e4faf4, #dbf8f1); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#dbf8f1, #e4faf4, #dbf8f1); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#dbf8f1, #e4faf4, #dbf8f1); /* Firefox 3.6 - 15 */
    background: linear-gradient(#dbf8f1, #e4faf4, #dbf8f1); /* 标准的语法（必须放在最后） */
    img{
      width:6.1rem;
      height:6.1rem;
      border-radius: 100%;
      border:solid 1px #d9d9d9;
    }
    .imgRight{
      float: right;
      position: relative;
      width:78%;
      h3{
        font-size:1.8rem;
        margin-top:1rem;
        span{
          font-size:1.3rem;
          color: #666666;
        }
      }
      .classes{
        font-size: 1.3rem;
        color: #666666;
        margin-top: 0.4rem;
      }
      .editBtn{
        position: absolute;
        font-size: 1.3rem;
        color: #fff;
        background: rgba(110,110,110,0.4);
        padding: 0.8rem 1.5rem;
        border-radius: 2.5rem 0 0 2.5rem;
        top: 1.3rem;
        right: 0;
        span{
          margin-left: 0.5rem;
          font-size: 1.3rem;
        }
      }
    }
  }
}
</style>
