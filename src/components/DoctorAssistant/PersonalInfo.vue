<template>
    <div class="personalInfo">
      <Top :title="title"></Top>
      <div class="infoTop">
        <img src="/static/img/userinfo_03.jpg" alt="">
        <div class="imgRight">
          <h3>章洲</h3>
          <div class="classes">主任医师</div>
          <div class="editBtn">修改<span class="icon iconfont icon-jiantou"></span></div>
        </div>
      </div>
      <div class="introduce">儿科主任医师，12年儿科工作经验，擅长儿童常见疾病及疑难病症的诊治，尤其是儿童血液系统疾病、儿童肿瘤的诊断与治疗。</div>
      <ul class="simpleInfo">
        <li>真实姓名
          <span>程剑桥</span>
        </li>
        <li>身份证号
          <span>63011********3608</span>
        </li>
        <li>所在机构
          <span>西安市中心医院</span>
        </li>
        <li>职业类别
          <span>临床</span>
        </li>
        <li class="occupation">职称
          <span>主任医师</span>
        </li>
        <li>执业资格
          <span><img src="/static/img/userinfo_07.jpg"/></span>
        </li>
        <li>所在地区
          <span>陕西省 西安市 碑林区</span>
        </li>
      </ul>
    </div>
</template>
<script>
  import Top from '@/components/common/HeaderBar.vue'
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
.personalInfo{
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
        background: #10d1a0;
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
  .introduce{
    padding:1.8rem 1.5rem;
    background: #ffffff;
    font-size:1.5rem;
  }
  .simpleInfo{
    padding:0 1rem;
    background: #fff;
    margin-top: 0.5rem;
    > li{
      border-bottom:solid 1px #d9d9d9;
      padding:1rem 0;
      font-size:1.5rem;
      color: #777777;
      // font-weight:bold;
      span{
        width:65%;
        margin-left:5%;
        font-size:1.5rem;
        color: #000;
        img{
          width:8.4rem;
          height:8.4rem;
        }
      }
    }
    li.occupation{
      span{
        margin-left: 14%;
      }
    }
  }
}
</style>
