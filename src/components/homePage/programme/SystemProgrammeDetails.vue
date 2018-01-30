<template>
  <div class="ProgrammeDet">
    <headerBar3 title="方案详情"></headerBar3>
    <span class="jinbi"><img src="/static/images/jinbi.png" alt="">{{schemeModel.schemeScore}}</span>
    <div class="head"><img :src="schemeModel.doctorPic">
      <h3> {{ schemeModel.doctorName }}</h3>
      <mt-button type="danger" plain @click="collectFn(schemeModel.sysSchemeId)" v-text="schemeModel.isCollection == 0?'收藏':'已收藏'" :class="{active:schemeModel.isCollection == 1}">{{collectStatus}}</mt-button>
    </div>
    <div class="motion_con">
      <h3 class="list_title">运动项目</h3>
      <ul class="list_con">
        <div v-if="schemeModel.schemeSportVos === 0" class="null_val"><p>暂无数据</p></div>
        <li v-for="sportList in schemeModel.schemeSportVos">
          <i class="icon iconfont" :class="'icon-'+ sportList.schemeSportsType.sportTypeImg"></i>
          <h3>{{ sportList.sportsName }}</h3><span class="list_con_val">{{ sportList.sportsContent}}</span>
        </li>
      </ul>
    </div>

    <div class="Recipes_con" v-for="recipes in newschemeModel">
      <h3 class="list_title">食谱</h3>
      <ul class="list_con dp_fix" v-for="recipesul in recipes">
        <h4>{{ recipesul.eatType }}</h4>
        <div class="list_li">
          <li v-for="systemRecipesVos in recipesul.data">{{ systemRecipesVos.recipesContent }}</li>
        </div>
      </ul>
    </div>
    <!--方案描述-->
    <div class="describe" v-show="schemeModel.schemeDesc != ''">
      <h3 class="list_title">方案描述</h3>
      <p>
        {{ schemeModel.schemeDesc }}
      </p>
    </div>

    <!--弹窗层-->
    <div class="evaluation-details-popup-wrap" v-show="popupStatus">
      <div class="popup">
        <h3>收藏需支付：<i class="jinbi-icon"></i> <span v-text="schemeModel.schemeScore"></span></h3>
        <p>我的康币：{{ myschemeScore }}</p>
        <ul class="clear">
          <li @click="cancelFn">取消</li>
          <li @click="payFn">支付</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import loading from '../../common/loading.vue'
  import api from '../../fetch/api'
  import { MessageBox, Toast } from 'mint-ui'

  export default {
    data () {
      return {
        title: '我的方案',
        tBTxt: '添加',
        tUrl: '/',
        schemeModel: [],
        loading: 0,
        newschemeModel: [], //格式化后的数据
        collectStatus: '收藏',
        popupStatus: false,
        myschemeScore: 0
      }
    },
    async created () {
      let params = {
        systemSchemeId: this.$route.params.id,
        doctorId:localStorage.getItem('doctorId')
      }
      const res = await api.post('systemScheme/schemeInfo.do', params)
      if (res.data.stateCode === '001') {
        this.schemeModel = res.data.systemScheme
        console.log(this.schemeModel)
        var arr = res.data.systemScheme.systemRecipesVos
        for (var n = 0; n < res.data.systemScheme.systemRecipesVos.length; n++) {
          var map = {},
            dest = []
          for (var i = 0; i < arr[n].systemRecipesInfoVos.length; i++) {
            var ai = arr[n].systemRecipesInfoVos[i]
            if (!map[ai.eatType]) {
              dest.push({
                eatType: ai.eatType,
                data: [ai]
              })
              map[ai.eatType] = ai
            } else {
              for (var j = 0; j < dest.length; j++) {
                var dj = dest[j]
                if (dj.eatType == ai.eatType) {
                  dj.data.push(ai)
                  break
                }
              }
            }

          }
          this.newschemeModel.push(dest);
          if(this.schemeModel.isCollection ===1){
            this.collectStatus = '已收藏'
          }
        }

        console.log(this.newschemeModel)
      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    methods: {
      async collectFn () {
        if (this.collectStatus === '收藏') {
          this.popupStatus = true
        }
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }

        const res = await api.post('basic/getIndexBasic.do', params)
        if (res.data.stateCode === '001') {
         console.log(res.data)
         this.myschemeScore = res.data.doctorDynamicVo.candy
        }

      },
      async payFn () { // 点击弹窗支付按钮
        if((this.myschemeScore - this.schemeModel.schemeScore) < 0 ){
          console.log(this.myschemeScore - this.schemeModel.schemeScore)

          MessageBox.confirm('是否前往充值？','康币不足').then(action => {
            this.$router.push({path:'/ReCharge'})
          });

        } else {
          var _this = this
          this.popupStatus = false
          let params = {
            systemSchemeId: this.$route.params.id,
            doctorId: localStorage.getItem('doctorId')
          }
          const res = await api.post('systemScheme/schemeMark.do', params)
          if (res.data.stateCode === '001') {
            MessageBox.alert(res.data.message).then(function () {
              _this.collectStatus = '已收藏'
            })
          }
        }


      },
      cancelFn () { // 点击弹窗取消按钮
        this.popupStatus = false
      },
    },
    components: {
      MessageBox,
      Toast
    }
  }
</script>

<style lang="less" scoped>
  .ProgrammeDet {
    padding: 5.4rem 0 0;

  .null_val {
    font-size: 1.4rem;
    padding: 2rem;
    text-align: center;
    color: #ccc;
    background: #fff;

  p {
    display: inline-block;
  }

  i {
    font-size: 2rem;
    display: inline-block;
    position: relative;
    top: 0.2rem;
  }

  }
  .jinbi {
    font-size: 1.4rem;
    position: fixed;
    right: 2rem;
    top: 2rem;
    z-index: 99;
    color: #fff;

  img {
    width: 1.6rem;
    margin-right: 0.6rem;
    color: #ff9b0d;
  }

  }
  .list_title {
    padding: 1.5rem;
    font-size: 1.6rem;
  }

  .mg_0 {
    margin-bottom: 0 !important;
  }

  .list_con {
    background: #fff;
    border-bottom: solid 1px #d9d9d9;
  }

  .head {
    font-size: 1.6rem;
    background: #fff;
    padding: 1.6rem;
    height: auto;
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;

  h3 {
    height: 4.5rem;
    line-height: 4.5rem;
    float: left;
    margin-left: 1.5rem;
  }

  img {
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 4.5rem;
    float: left;
  }

  .mint-button {
    float: right;
  }

  .is-plain {
    border: solid 1px #10d1a0;
    color: #10d1a0;
    padding: 0.6rem 2.4rem;
    height: auto;
    font-size: 1.6rem;
    margin-top: 0.3rem;
  }
  .active{
   color: rgb(128, 128, 128);
   background: rgb(235, 235, 235);
   border: solid 0px #10d1a0;
  }
  }
  .motion_con {
    height: auto;
    overflow: hidden;

  ul {

  li {
    padding: 0.5rem 0;
    width: 93%;
    margin-left: 7%;
    border-top: solid 1px #d9d9d9;
    height: auto;
    overflow: hidden;

  .icon {
    font-size: 2.8rem;
    line-height: 5rem;
    color: #10d1a0;
    display: block;
    float: left;
  }

  h3 {
    font-size: 1.6rem;
    display: block;
    float: left;
    line-height: 5rem;
    margin-left: 1rem;
  }

  .list_con_val {
    font-size: 1.8rem;
    display: block;
    float: right;
    line-height: 5rem;
    margin-right: 2rem;
    color: #ff9b0d;
  }

  }
  li:first-child {
    border: none
  }

  }

  }
  .Recipes_con {

  .dp_fix {
    display: flex;
    margin-bottom: 1rem;
  }

  h4 {
    width: 24%;
    text-align: center;
    height: 6.4rem;
    line-height: 6.4rem;
    font-size: 1.8rem;
    color: #10d1a0;
  }

  .list_li {
    width: 76%;

  li {
    padding: 2.1rem 0;
    border-top: solid 1px #d9d9d9;
    height: auto;
    overflow: hidden;
    font-size: 1.6rem;
  }

  li:first-child {
    border: none;
  }

  }

  }
  .describe {

  p {
    font-size: 1.6rem;
    background: #fff;
    padding: 1.5rem;
    line-height: 2.6rem;
    color: #999999;
  }

  }
  .evaluation-details-popup-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;

  .popup {
    background: #ffffff;
    padding: 1rem 0 0;
    border-radius: 0.4rem;
    width: 70%;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);

  h3 {
    color: #333333;
    font-size: 1.7rem;
    padding: 0 2rem;

  i {
    display: inline-block;
    position: relative;
    top: 0.5rem;
    width: 2.3rem;
    height: 2.3rem;
    margin: 0 0.7rem;

  }

  span {
    color: #ff9b0d;
  }

  }
  p {
    color: #999999;
    font-size: 1.5rem;
    margin: 1rem 0 2rem;
    padding: 0 2rem;
  }

  ul {

  li {
    width: 50%;
    float: left;
    text-align: center;
    border-top: 1px solid #dbdbdb;
    padding: 1.6rem 0;
    color: #10d1a0;
    font-size: 1.7rem;

  &:first-of-type {
    border-right: 1px solid #d9d9d9;
  }

  }
  }

  }
  }
  }
</style>

