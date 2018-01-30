<template>
    <div class="info">
      <HeaderBar3 title="修改信息" @arrowEvent="delLocal" goBack="MyInfo"></HeaderBar3>
      <ul class="simpleInfo infoTop">
        <li>真实姓名
          <input type="text" v-model="doctorName" v-verify="doctorName" @blur="changeIn('Name')" placeholder="请输入真实姓名">
          <label class="f1" v-remind="doctorName" ref="Name"></label>
        </li>
        <li>身份证号
          <input type="number" v-model="identityCard" v-verify="identityCard" @blur="changeIn('Card')" placeholder="请输入身份证号">
          <label class="f1" v-remind="identityCard" ref="Card"></label>
        </li>
        <li class="jobType"  @click="selectOccupation">职业类别
          <input type="text" v-model="occupation" v-verify="occupation" @blur="changeIn('occup')" placeholder="请输入职业类别" readonly="readonly">
          <label class="f1" v-remind="occupation" ref="occup"></label>
          <span class="icon iconfont icon-arrow-right"></span>
        </li>
        <li class="occupation">职称
          <input type="text" v-model="appellation" v-verify="appellation"  placeholder="请输入职称">
          <label class="f1" v-remind="appellation"></label>
        </li>
      </ul>
      <ul class="simpleInfo qualification">
        <li>执业资格
          <upimg class="upimg" :imgList="imglist" :oldImgList="oldImgList" @removeImg="delImg"></upimg>
        </li>
      </ul>
      <ul class="simpleInfo" >
        <li class="area" @click="selectArea">所在地区
          <input type="text" placeholder="请选择所在地区" v-model="splitCity" v-verify="userArea" readonly="readonly">
          <span class="icon iconfont icon-arrow-right" ></span>
        </li>
        <li>详细地址
          <textarea placeholder="请填写详细地址" v-model="detailAddress" v-verify="detailAddress"></textarea>
          <label class="f1" v-remind="detailAddress"></label>
        </li>
        <li class="area" @click="selectOrganizat">所在机构
          <input type="text" v-model="organization" v-verify="organization" placeholder="请选择所在机构" readonly="readonly">
          <span class="icon iconfont icon-arrow-right" ></span>
        </li>
      </ul>
      <ul class="simpleInfo qualification">
        <li class="info">个人简介</li>
        <li class="infotxt"><textarea v-model="doctorInfo" placeholder="请填写个人信息" v-verify="doctorInfo"></textarea></li>
        <li class="goodAt">擅长
          <div>
            <span v-for="(item, index) in goodAt">{{item.subject}}</span>
            <!--<router-link to="/beGoodAt">管理擅长<i class="icon iconfont icon-jiantou"></i></router-link>-->
            <a @click="goGoodAt">管理擅长<i class="icon iconfont icon-jiantou"></i></a>
          </div>
        </li>
        <div class="submitInfo" @click="submitVerify">提交</div>
      </ul>

      <transition name="mask-fade">
        <div class="mask" v-show="mask"></div>
      </transition>
      <!--选择地区组件-->
      <transition name="area-fade">
        <div v-show="showArea" class="sArea">
          <SelectAddress @selectDate="onSelected"></SelectAddress>
        </div>
      </transition>
      <OrganizationBox v-show="showOrganization" :area="userArea" @ee="ww" v-if="showOrganization"></OrganizationBox>
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="label_con">
          <label>
            <i class="icon iconfont" :class="occupation2 == '临床医师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="临床医师"/>临床医师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '预防医师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="预防医师"/>预防医师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '中医医师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="中医医师"/>中医医师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '职业护士' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="职业护士"/>职业护士
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '护师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="护师"/>护师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '主管护师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="主管护师"/>主管护师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '健康管理师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="健康管理师"/>健康管理师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '注册营养师' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="注册营养师"/>注册营养师
          </label>
          <label>
            <i class="icon iconfont" :class="occupation2 == '其他' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
            <input v-model="occupation2" type="radio" value="其他"/>其他
          </label>
        </div>
        <div class="btn2" @click="close">确认</div>
      </mt-popup>
    </div>
</template>
<script>
  import { Toast, MessageBox, Popup } from 'mint-ui'
  /* import VDistpicker from 'v-distpicker'*/
  import upimg from '@/components/common/UpLoadImg2.vue'
  import Vue from 'vue'
  import verify from 'vue-verify-plugin'
  import OrganizationBox from '@/components/SelectOrganization.vue'
  import SelectAddress from '@/components/common/address.vue'
  Vue.use(verify, {
    blur: true
  })
  export default {
    data () {
      return {
        popupVisible: false, // 控制职业类别弹框
        doctorName: '',
        identityCard: '',
        organization: '', // 所在机构
        occupation: '', // 职业类别
        occupation2: '',
        appellation: '', // 职称
        userArea: '', // 所在地区
        detailAddress: '', // 详细地址
        showArea: false,
        showOrganization: false,
        mask: false,
        file: null,
        imglist: [], // 存放职业资格的图片
        oldImgList: [], // 存放已经在数据库中的职业资格图片
        doctorInfo: '', // 个人简介
        goodAt: [], // 医生擅长
        temporaryInfo: {},
        splitCity: [],
        province: '',
        city: '',
        county: ''
      }
    },
    verify: {
      doctorName: 'required',
      identityCard: [
        'required',
        {
          test: function (val) {
            if (val.length !== 18) {
              return false
            }
            return true
          },
          message: '身份证号不是18位'
        }
      ],
      occupation: 'required',
      appellation: 'required',
      userArea: 'required',
      detailAddress: 'required',
      doctorInfo: 'required'
    },
    created () {
      this.loadApi()
    },
    methods: {
      async loadApi () {
        let editGoodAt = [] // 存放从数据库接收的擅长信息
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }
        let res = await this.$api.post('personalCenter/toGetPersonalInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode == '001') {
          let message = res.data.doctorList
          if(message.keyWords.length > 0){
            for(var i=0;i<message.keyWords.length;i++){
              editGoodAt.push({subject: message.keyWords[i].systemillKeyword.keywordName, id: message.keyWords[i].systemillKeyword.id})
            }
          }
          this.doctorName = message.doctorName
          this.identityCard = message.doctorIdCard
          this.occupation = message.doctorJobType
          this.appellation = message.doctorTitle
          this.splitCity = message.doctorArea
          this.detailAddress = message.doctorAddress
          this.organization = message.organName
          this.oldImgList = message.requirements
          this.doctorInfo = message.doctorIntro
          this.goodAt = editGoodAt
          this.province = message.province
          this.city = message.city
          this.county = message.county
          //console.log(this.oldImgList)
          if(JSON.parse(localStorage.getItem('goodAtArr'))) {
             // 本地存储中的擅长覆盖接口中返回的擅长数据
            this.goodAt = JSON.parse(localStorage.getItem('goodAtArr'))
          }
        }
        /*判断this.temporaryInfo不为空*/
        if(!$.isEmptyObject(localStorage.getItem('localInfo'))){
          this.temporaryInfo = JSON.parse(localStorage.getItem('localInfo'))
          console.log(this.temporaryInfo)
          this.doctorName = this.temporaryInfo.doctorName
          this.identityCard = this.temporaryInfo.identityCard
          this.occupation = this.temporaryInfo.occupation
          this.appellation = this.temporaryInfo.appellation
          this.userArea = this.temporaryInfo.userArea
          this.detailAddress = this.temporaryInfo.detailAddress
          this.imglist = this.temporaryInfo.imglist
          this.organization = this.temporaryInfo.organization
          this.doctorInfo = this.temporaryInfo.doctorInfo
          this.oldImgList = this.temporaryInfo.oldImgList
        }
      },
      close () {
        this.occupation = this.occupation2
        this.popupVisible = false
      },
      async submitVerify () {
        console.log(this.oldImgList)
        if (this.$verify.check() && this.doctorInfo != '' && this.goodAt.length > 0) {
          let arrImg = []
          for (var i = 0; i < this.imglist.length; i++) {
            arrImg.push(this.imglist[i].split(';base64,')[1])
          }

          let adept = []
          for (var i = 0; i < this.goodAt.length; i++) {
            adept.push(this.goodAt[i].id)
          }

          let oldImgStr = ''
          if (this.oldImgList.length > 0) {
            let imgId = []
            for (var i = 0; i < this.oldImgList.length; i++) {
              imgId.push(this.oldImgList[i].workRequirementsId)
            }
            oldImgStr = imgId.join(',')
          } else {
            oldImgStr = 'undefined'
          }

          let params = {
            doctorId: localStorage.getItem('doctorId'),
            name: this.doctorName,
            idCard: this.identityCard,
            organ: this.organization,
            jobType: this.occupation,
            title: this.appellation,
            imgList: JSON.stringify(arrImg),
            imgOldId: oldImgStr,  // 服务器未删除的图片的ID
            area: this.splitCity[0]+this.splitCity[1]+this.splitCity[2],
            address: this.detailAddress,
            intro: this.doctorInfo,
            skills: adept.join(','), // 擅长
            province: this.province,
            city: this.city,
            county: this.county
          }
          console.log(params)
          const res = await this.$api.post('personalCenter/toEditPersonalInfo.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            localStorage.removeItem('localInfo')
            localStorage.removeItem('goodAtArr')
            let instance = Toast('已提交，请等待审核通过')
            setTimeout(() => {
              instance.close()
            }, 2000)
            let _this = this
            setTimeout(() => {
              _this.$router.push({
                path: '/MyInfo'
              })
            }, 3000)
          }
        } else {
          MessageBox('提示', '请将所有信息填写完整！')
        }
      },
      onSelected (data) {
        this.userArea = data
        console.log(this.userArea)
        this.splitCity = data.split('-')
        this.province = this.splitCity[0]
        this.city = this.splitCity[1]
        this.county = this.splitCity[2]
        this.showArea = false
        this.mask = false
      },
      selectOrganizat () {
        if (this.province == '') {
          MessageBox('提示', '请先选择所在地区')
        } else {
          this.mask = true
          this.showOrganization = true
          $('body').css('overflow', 'hidden')
        }
      },
      selectArea () {
        this.showArea = true
        this.mask = true
      },
      delImg (arr) {
        console.log(arr)
        this.oldImgList = arr
      },
      selectOccupation () {
        this.popupVisible = true
      },
      delLocal () {
        localStorage.removeItem('localInfo')
        localStorage.removeItem('goodAtArr')
        this.$router.push({
          path: '/MyInfo'
        })
      },
      changeIn (valName) {
        var _this = this
        setTimeout(function () {
          if (_this.$refs[valName].innerText !== '必填' && _this.$refs[valName].innerText !== '') {
            Toast(_this.$refs[valName].innerText)
          }
        }, 100)
      },
      ww (str) {
        this.mask = false
        this.showOrganization = false
        if (str) {
          this.organization = str
        }
        $('body').css('overflow', 'auto')
      },
      goGoodAt () {
        //console.log(this.oldImgList)
        this.temporaryInfo.doctorName = this.doctorName
        this.temporaryInfo.identityCard = this.identityCard
        this.temporaryInfo.organization = this.organization
        this.temporaryInfo.occupation = this.occupation
        this.temporaryInfo.appellation = this.appellation
        this.temporaryInfo.oldImgList = this.oldImgList
        this.temporaryInfo.imglist = this.imglist
        this.temporaryInfo.userArea = this.userArea
        this.temporaryInfo.detailAddress = this.detailAddress
        this.temporaryInfo.doctorInfo = this.doctorInfo
        localStorage.setItem('localInfo', JSON.stringify(this.temporaryInfo))
        localStorage.setItem('goodAtArr', JSON.stringify(this.goodAt))
        this.$router.push({
          path: '/beGoodAt'
        })
      },
    },
    components: {
      upimg,
      OrganizationBox,
      Toast,
      MessageBox,
      Popup,
      SelectAddress
    }
  }
</script>
<style lang="less">
  body{
    background: #f5f5f5;
  }
  .f1{
    display: none;
  }
  .info{
    .infoTop{
      margin-top: 5.5rem;
    }
    .simpleInfo{
      padding:0 1rem;
      background: #fff;
      > li{
        border-bottom:solid 1px #d9d9d9;
        padding:1rem 0;
        font-size:1.5rem;
        // font-weight:bold;
      &:last-child{
         border:none;
       }
        input{
          width:65%;
          margin-left:5%;
          font-size:1.5rem;
        }
        textarea{
          display: inline-block;
          vertical-align: top;
          margin-left: 5%;
          width:70%;
          height:1.9rem;
          resize: none;
          overflow: hidden;
        }
      }
      li.occupation{
        input{
          margin-left: 14%;
        }
      }
      li.jobType > span{
        color: #d9d9d9;
        font-size: 1.6rem;
      }
      li.area{
        span{
          color: #d9d9d9;
          font-size:1.6rem;
        }
      }
      li.infotxt{

        textarea{
          width: 100%;
          margin-left: 0;
          height: 8rem;
        }
      }
      li.goodAt{
        margin-top:0.5rem;

        div{
          width:100%;
          overflow: hidden;
          padding: 1rem 0.2rem;
          span{
            padding:0.2rem 0.5rem;
            color: #ffffff;
            font-size:1.3rem;
            background: #10d1a0;
            border-radius:0.2rem;
            margin-right: 1rem;
          }
          a{
            display: inline-block;
            float: right;
            color: #bbbbbb;
            font-size:1.5rem;
            i{
              margin-left:0.3rem;
              color: #bbbbbb;
              font-size:1.5rem;
            }
          }
        }
      }
      .submitInfo{
        font-size: 1.6rem;
        color: #fff;
        width: 96%;
        text-align: center;
        border-radius: 0.5rem;
        padding: 1.2rem 0;
        background: #10d1a0;
        margin: 1rem 2% 0;
      }
    }

    .qualification{
      margin:0.5rem 0 0;
    &:last-of-type{
    padding-bottom:2rem ;
     }
      li{
        overflow: hidden;
      }
      .upimg{
        height:auto;
        overflow: hidden;
        // padding-left: 2.5rem
        width:77%;
        float: right;
      }
    }
    .sArea{
      width:100%;
      background: #fff;
      height:24.1rem;
      position: fixed;
      z-index:10;
      bottom:0;
      left:0;
      transition: 0.3s;

      .address-header{
        li{
          font-size: 1.3rem;
        }
      }
      .address-container{
        background-color: #fff;
        height: 15rem;
        overflow-y: auto;
      }
    }
    .mask{
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      position: fixed;
      top: 0;
      z-index: 1;
    }
    .mask-fade-enter-active, .mask-fade-leave-active{
      transition: opacity .5s;
    }
    .mask-fade-enter, .mask-fade-leave-active{
      opacity: 0;
    }
    .area-fade-enter-active{
      bottom:0;
    }
    .area-fade-enter, .area-fade-leave-active{
      bottom: -24.1rem;
    }
    .mint-popup-bottom{
      width:100%;
      .label_con{
        height: 25rem;
        overflow: scroll;
        padding-bottom: 5rem;
        label{
          font-size: 1.5rem;
          color: #999999;
          padding:0.5rem 0;
          display: block;
          input{
            display: none;
          }
          i{
            display: inline-block;
            font-size: 2rem;
            color: #d8d8d8;
            vertical-align: middle;
            margin-left: 35%;
          }
          .icon-xuanzhong2{
            color: #10d1a0;
          }
        }
      }

    }

  }
</style>
