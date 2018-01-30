<template>
  <div class="personalInfo">
    <HeaderBar3 :title="title" :goBack="goBackUrl"></HeaderBar3>
    <div class="box">
      <div class="hint failHint" @click="failMessage" v-show="checkFlag == 2"><i class="icon iconfont icon-warning"></i>审核失败,<a>点击查看</a></div>
      <div class="hint waitReviewing" v-show="checkFlag == 0">审核中...<a  @click="checkInfo">查看修改信息</a></div>
      <div class="infoTop" v-show="doctoricon != ''">
        <div class="imgLeft" @click="editPic(doctoricon)">
          <img :src="doctoricon" alt="">
        </div>
        <div class="imgRight">
          <h3>{{doctorName}}</h3>
          <div class="classes">{{appellation}}</div>
          <router-link :to="{path:'/editInfo'}">
            <div class="editBtn">修改<span class="icon iconfont icon-jiantou"></span></div>
          </router-link>
        </div>
      </div>
      <div class="goodAt">
        <div class="tit">擅长</div>
        <span class="goodAtList" v-for="(item, index) in beGoodAt" :key="index">{{item.systemillKeyword.keywordName}}</span>
      </div>
      <div class="introduce"><span>简介：</span>{{doctorInfo}}</div>
      <ul class="simpleInfo">
        <li>真实姓名
          <span>{{doctorName}}</span>
        </li>
        <li>身份证号
          <span>{{identityCard}}</span>
        </li>
        <li>所在机构
          <span>{{organization}}</span>
        </li>
        <li>职业类别
          <span>{{occupation}}</span>
        </li>
        <li class="occupation">职称
          <span>{{appellation}}</span>
        </li>
        <li class="zige">执业资格
          <span>
          <img v-for="(item, index) in oldImgList" :key="index" :src="item"/>
        </span>

        </li>
        <li>所在地区
          <span>{{userArea}}</span>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  import api from '../fetch/api'
  export default {
    data () {
      return {
        title: '我的信息',
        doctorInfo: '', // 简介
        beGoodAt: [], // 擅长
        doctorName: '',
        identityCard: '',
        organization: '', // 所在机构
        occupation: '', // 职业类别
        appellation: '', // 职称
        userArea: '', // 所在地区
        oldImgList: [], // 执业资格
        doctoricon: '', // 医生头像
        checkFlag: 1, // 显示审核的状态
        checkMessage: '', // 审核失败的提示信息
        goBackUrl: '/MyPage'
      }
    },
    created () {
      console.log(this.$route.query.checkEditInfo)
      if (this.$route.query.checkEditInfo) {
        this.toGetRevisedInfo()
      } else {
        console.log(localStorage.getItem('doctorId'))
        this.loadApi()
     //   this.doctoricon = localStorage.getItem('newPicUrl')
     //   console.log(localStorage.getItem('newPicUrl'))
      }
    },
    mounted () {
      /* console.log(localStorage.getItem('doctorId'))
      this.loadApi()
      this.doctoricon = localStorage.getItem('newPicUrl')
      console.log(localStorage.getItem('newPicUrl')) */
    },
    methods: {
      async loadApi () {
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }
        const res = await this.$api.post('personalCenter/toGetPersonalInfo.do ', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          let message = res.data.doctorList
          this.doctorName = message.doctorName
          this.identityCard = message.doctorIdCard
          this.occupation = message.doctorJobType
          this.appellation = message.doctorTitle
          this.userArea = message.doctorArea
          this.detailAddress = message.doctorAddress
          this.doctoricon = message.doctorAvatar
          // this.imgList = baseList // 职业资格
          this.organization = message.organName
          this.oldImgList = this.getImg(message.requirements)
          this.doctorInfo = message.doctorIntro // 简介
          this.beGoodAt = message.keyWords // 擅长
          this.checkFlag = message.flag
          this.checkMessage = message.advice
          console.log(this.oldImgList)
        }
        /* if (localStorage.getItem('newPicUrl') !=  null) {
          this.doctoricon = localStorage.getItem('newPicUrl')
        } */
      },
      async toGetRevisedInfo () {
        this.goBackUrl = '/MyInfo'
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }
        const res = await this.$api.post('personalCenter/toGetRevisedInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          let message = res.data.revisedInfo
          this.doctorName = message.doctorName
          this.identityCard = message.doctorIdCard
          this.occupation = message.doctorJobType
          this.appellation = message.doctorTitle
          this.userArea = message.doctorArea
          this.detailAddress = message.doctorAddress
          // this.imgList = baseList // 职业资格
          this.organization = message.organName
          this.oldImgList = this.getImg2(message.requirements)
          this.doctorInfo = message.doctorIntro // 简介
          this.beGoodAt = message.keyWords // 擅长
          console.log(this.oldImgList)
        }
      },
      getImg (imgArr) {
        let arr = []
        for (var i = 0; i < imgArr.length; i++) {
          arr.push(imgArr[i].workRequirements)
        }
        return arr
      },
      getImg2 (imgArr) {
        let arr = []
        for (var i = 0; i < imgArr.length; i++) {
          arr.push(imgArr[i].doctorCheckingRequire)
        }
        return arr
      },
      editPic (picURL) {
        this.$router.push({
          path: '/EditAvatar',
          query: {
            imgUrl: picURL
          }
        })
      },
      failMessage () {
        var _this = this
        MessageBox('提示', _this.checkMessage)
      },
      checkInfo () {
        this.$router.push({
          path: '/myInfo',
          query: {
            checkEditInfo: true
          }
        })
        window.location.reload()
      }
    },
    components: {
    }
  }
</script>
<style lang="less" scoped>
  .personalInfo{
    .box{
      margin-top:5.3rem;
      .hint{
        font-size:1.4rem;
        color: #ffffff;
        text-align: center;
        padding:0.8rem 1.5rem;
      }
      .failHint{
        background: #ff9090;
        i{
          color: #ea2718;
          font-size: 1.5rem;
          vertical-align: middle;
          margin-right: 0.5rem;
        }
        a{
          color: #ffffff;
          text-decoration: underline;
          margin-left:0.7rem;
        }
      }
      .waitReviewing{
        background: #ffd247;
        position: relative;
        a{
          color: #ffffff;
          font-size:1.3rem;
          text-decoration: underline;
          position: absolute;
          right:1.5rem;
        }
      }
      .infoTop{
        padding:1.8rem 0 1.6rem 1.5rem;
        overflow: hidden;
        border-bottom:solid 1px #d9d9d9;
        background: -webkit-linear-gradient(left, #dbf8f1, #f3fefb, #dbf8f1); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #dbf8f1, #f3fefb, #dbf8f1); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #dbf8f1, #f3fefb, #dbf8f1); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #dbf8f1, #f3fefb, #dbf8f1); /* 标准的语法（必须放在最后） */
        .imgLeft{
          width:6.1rem;
          height:6.1rem;
          float:left;
          border-radius: 100%;
          border: solid 1px #d9d9d9;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
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
      .goodAt{
        padding:1.5rem;
        background: #ffffff;
        border-bottom:solid 1px #d9d9d9;
        .tit{
          font-size:1.5rem;
          color: #777777;
          margin-bottom:1rem;
        }
        .goodAtList{
          display: inline-block;
          padding:0.3rem 0.6rem;
          font-size:1.3rem;
          color: #ffffff;
          background: #10d1a0;
          border-radius: 0.2rem;
          margin-right:1rem;
        }
      }
      .introduce{
        padding:1.8rem 1.5rem;
        background: #ffffff;
        font-size:1.5rem;
        span{
          font-size:1.5rem;
          color: #777777;
          margin-right:0.4rem;
        }
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
        li.zige{
          overflow: hidden;
          span{
            display: inline-block;
            float: right;
            margin-left:0;
            width: 75%;
            img{
              text-align: center;
              border: solid 1px #d9d9d9;
              float: left;
              margin: 0.4rem 1.3rem 1rem 0;
            }
          }
        }
      }
    }
  }
</style>
