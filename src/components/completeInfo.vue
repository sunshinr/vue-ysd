<template>
    <div class="info">
      <div class="top">完善信息<span class="font iconfont icon-huaban" @click="colsePage"></span></div>
      <div class="infoImg">
        <h3 v-show="firstReg">恭喜您，注册成功！</h3>
        <div class="imgBox" id="uploadicon">
         <iconimg :iconList="iconlist"></iconimg>
        </div>
        <p @click="uploadIcon">上传头像</p>
      </div>
      <ul class="simpleInfo">
        <li>真实姓名
          <input type="text" v-model="doctorName" v-verify="doctorName" @blur="changeIn('Name')" placeholder="请输入真实姓名">
          <label class="f1" v-remind="doctorName" ref="Name"></label>
        </li>
        <li>身份证号
          <input type="number" v-model="identityCard" v-verify="identityCard" @blur="changeIn('Card')" placeholder="请输入身份证号">
          <label class="f1" v-remind="identityCard" ref="Card"></label>
        </li>
        <li class="jobType">职业类别
          <input type="text" v-model="occupation" v-verify="occupation" @blur="changeIn('occup')" placeholder="请输入职业类别" readonly="readonly">
          <label class="f1" v-remind="occupation" ref="occup"></label>
          <span class="icon iconfont icon-arrow-right" @click="selectOccupation"></span>
        </li>
        <li class="occupation">职称
          <input type="text" v-model="appellation" v-verify="appellation"  placeholder="请输入职称">
          <label class="f1" v-remind="appellation"></label>
        </li>
      </ul>
      <ul class="simpleInfo qualification">
        <li>执业资格
          <upimg class="upimg" :imgList="imglist" :oldImgList="oldImgList" @removeId="delId" @removeImg="delImg"></upimg>
        </li>
      </ul>
      <ul class="simpleInfo">
        <li class="area">所在地区
          <input type="text" placeholder="请选择所在地区" v-model="userArea" v-verify="userArea" readonly="readonly">
          <span class="icon iconfont icon-arrow-right" @click="selectArea"></span>
        </li>
        <li>详细地址
          <textarea placeholder="请填写详细地址" v-model="detailAddress" v-verify="detailAddress"></textarea>
          <label class="f1" v-remind="detailAddress"></label>
        </li>
        <li class="area">所在机构
          <input type="text" v-model="organization" v-verify="organization" placeholder="请选择所在机构" readonly="readonly">
          <span class="icon iconfont icon-arrow-right" @click="selectOrganizat"></span>
        </li>
        <!--<li class="info">个人简介</li>
        <li class="infotxt"><textarea v-model="doctorInfo" placeholder="请填写个人信息" v-verify="doctorInfo"></textarea></li>
        <li class="goodAt">擅长
          <div>
            <span v-for="(item, index) in goodAt">{{item.subject}}</span>
            &lt;!&ndash;<router-link to="/beGoodAt">管理擅长<i class="icon iconfont icon-jiantou"></i></router-link>&ndash;&gt;
            <a @click="goGoodAt">管理擅长<i class="icon iconfont icon-jiantou"></i></a>
          </div>
        </li>-->
        <div class="submitInfo" @click="submitVerify">提交并申请认证</div>
      </ul>

      <transition name="mask-fade">
        <div class="mask" v-show="mask"></div>
      </transition>
      <!--选择地区组件-->
      <transition name="area-fade">
        <div v-show="showArea" class="sArea">
          <!--<v-distpicker type="mobile" @selected="onSelected"></v-distpicker>-->
          <SelectAddress @selectDate="onSelected"></SelectAddress>
          <!--<div class="btn" @click="ensureArea">确定</div>-->
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
  import iconimg from '@/components/common/SingleupLoad2.vue'
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
        firstReg: false, // 用户第一次注册进入时显示的“恭喜您，注册成功！”
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
        iconlist: ['data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAYAAAA+s9J6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE1QUY1RjFGQzZBNjExRTc5NjhBQTQ1QzY2NjBGRjE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE1QUY1RjIwQzZBNjExRTc5NjhBQTQ1QzY2NjBGRjE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTVBRjVGMURDNkE2MTFFNzk2OEFBNDVDNjY2MEZGMTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTVBRjVGMUVDNkE2MTFFNzk2OEFBNDVDNjY2MEZGMTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5MQ/9PAAAdpklEQVR42uxd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'],
        imglist: [], // 存放职业资格的图片
        oldImgList: [], // 存放已经在数据库中的职业资格图片
        delIdList: [], // 存放数据库中要删除的图片的ID
        doctorPhone: '',
        status: 0, // 记录从登录页进入的状态
        splitCity : [],
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
      detailAddress: 'required'
    },
    created () {
      //this.doctorPhone = localStorage.getItem('doctorPhone')
      this.doctorPhone = this.$route.query.phone
      this.status = this.$route.query.status
      console.log(this.status)
      console.log(this.doctorPhone)

      if (this.status === 1) {
        this.firstReg = true
      } else if (this.status === 3) {
        // 审批未通过，继续完善信息
        this.loadFunction()
      }
    },
    methods: {
      async loadFunction () {
        this.iconlist = []

        let params = {
          doctorPhone: this.doctorPhone
        }
        let res = await this.$api.post('basic/toGetCompleteInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode == '001'){
          let message = res.data.completeInfo

          this.doctorName = message.doctorName
          this.identityCard = message.doctorIdCard
          this.occupation = message.doctorJobType
          this.appellation = message.doctorTitle
          this.userArea = message.doctorArea
          this.detailAddress = message.doctorAddress
          this.iconlist = message.doctorAvatar.split(',')
          // this.imgList = baseList // 职业资格
          this.organization = message.organName
          this.oldImgList = message.requirements
        }
      },
      close () {
        this.occupation = this.occupation2
        this.popupVisible = false
      },
      selectArea () {
        this.showArea = true
        this.mask = true
      },
      selectOccupation () {
        this.occupation2 = this.occupation
        this.popupVisible = true
      },
      onSelected (data) {
        this.userArea = data
        this.splitCity = [],
        console.log(this.userArea)
        this.splitCity = data.split('-')
        this.showArea = false
        this.mask = false
      },
      async submitVerify () {
        if (this.$verify.check() && this.iconlist.length > 0) {
          let arrImg = []
          for (var i = 0; i < this.imglist.length; i++) {
            arrImg.push(this.imglist[i].split(';base64,')[1])
          }

          let iconImg = ''
          iconImg = this.iconlist[0].split(';base64,')[1]
          console.log('1'+this.iconlist)
          console.log(iconImg)
          if(iconImg == undefined){
            iconImg = String(iconImg)
          }

          let oldImgStr = ""
          if (this.delIdList.length>0){
            let imgId = []
            for (var i = 0; i < this.delIdList.length; i++) {
              imgId.push(this.delIdList[i])
            }
            oldImgStr = imgId.join(',')
          } else {
            oldImgStr = 'undefined'
          }

          let params = {
            picture: iconImg,
            doctorPhone: this.doctorPhone,
            name: this.doctorName,
            idCard: this.identityCard,
            organ: this.organization,
            jobType: this.occupation,
            title: this.appellation,
            imgList: JSON.stringify(arrImg),
            imgOld: oldImgStr,  // 服务器中要删除的图片的ID
            area: this.splitCity[0] + this.splitCity[1] + this.splitCity[2],
            address: this.detailAddress,
            province: this.splitCity[0],
            city: this.splitCity[1],
            county: this.splitCity[2]
            // intro: this.doctorInfo,
            // skills: adept.join(',') // 擅长
          }
          console.log(params)
          const res = await this.$api.post('basic/toCompleteInfo.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            let instance = Toast('已提交，请等待审核通过')
            setTimeout(() => {
              instance.close()
            }, 2000)
            let _this = this
            setTimeout(() => {
              _this.$router.push({
                path: '/waitReview'
              })
            }, 3000)
          }
        } else {
          MessageBox('提示', '请将所有信息填写完整！')
        }
      },
      changeIn (valName) {
        var _this = this
        setTimeout(function () {
          if (_this.$refs[valName].innerText !== '必填' && _this.$refs[valName].innerText !== '') {
            Toast(_this.$refs[valName].innerText)
          }
        }, 100)
      },
      fileChange (file, name) {
        console.log('File:', file)
        console.log('FileName:', name)
      },
      uploadIcon () {
        $('#uploadicon').find($('input[type=file]')).trigger('click')
        return false
      },
      selectOrganizat () {
        if (this.splitCity == '') {
          MessageBox('提示', '请先选择所在地区')
        } else {
          this.mask = true
          this.showOrganization = true
          $('body').css('overflow', 'hidden')
        }
      },
      ww (str) {
        this.mask = false
        this.showOrganization = false
        if (str) {
          this.organization = str
        }
        $('body').css('overflow', 'auto')
      },
      delId (id) {
        this.delIdList.push(id)
        console.log(this.delIdList)
      },
      delImg (arr) {
        //console.log(arr)
        this.oldImgList = arr
      },
      delLocal (){
        /*localStorage.removeItem('localInfo')
        localStorage.removeItem('goodAtArr')*/
      },
      colsePage () {
        localStorage.removeItem('localInfo')
        localStorage.removeItem('goodAtArr')
        this.$router.push({
          path: '/login'
        })
      }
    },
    components: {
      upimg,
      iconimg,
      OrganizationBox,
      Toast,
      MessageBox,
      Popup,
      SelectAddress
    }
  }
</script>
<style lang="less" scoped>
  body{
    background: #f5f5f5;
  }
  .f1{
    display: none;
  }
  .info{
    .top{
      background: #10d1a0;
      text-align: center;
      color: #fff;
      font-size: 1.8rem;
      top: 0;
      right: 0;
      left: 0;
      position: fixed;
      z-index: 1;
      width: 100%;
      height: 5.4rem;
      line-height: 5.4rem;
      span{
        font-size: 2rem;
        display: inline-block;
        margin-top: 0.2rem;
        position: absolute;
        right: 1.2rem;
      }
    }
    .infoImg{
      width:100%;
      background: #fff;
      text-align: center;
      padding:1rem;
      margin-top: 5.4rem;
      h3{
        font-size:1.5rem;
        color: #00cc98;
        margin-top:1.6rem;
      }
      .imgBox{
        margin-left: 40%;
        margin-top:1.5rem;
        img{
          width:100%;
        }
      }
      p{
        font-size:1.3rem;
        color: #666666;
        margin-top:0.8rem;
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
        // font-weight:bold;
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
        border:none;
        textarea{
          width: 100%;
          margin-left: 0;
          height: 8rem;
        }
      }
      li.goodAt{
        margin-top:0.5rem;
        border:none;
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
        margin: 1rem 2%;
      }
    }

    .qualification{
      margin:0.5rem 0;
      li{
        border:none;
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
