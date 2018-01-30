<template>
  <div class="edit-schema-template-wrap">

    <HeaderBar3 title="新增方案模板" ></HeaderBar3>

    <button class="addSchema" @click="addSchema()">新增方案</button>

    <div class="edit-schema-template-main">
      <div class="edit-schema-template-top" id="template-name">
       <label>方案名称</label><input type="text" v-verify="schemeName"  placeholder="请输入方案名称" v-model="schemeName" :value="schemeName">   <!--<span class="fl" v-remind="schemeName"></span>-->
      </div>
      <div class="edit-schema-template-top" id="cycle">
        <label>方案周期</label><input type="text" placeholder="0" v-verify="schemeCycle"  v-model="schemeCycle"> <span>天</span>
      </div>
      <div class="edit-schema-template-top" id="kangbi">
        <label>康&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;币</label> <input type="text" placeholder="0">
      </div>

      <!--运动项目-->
      <ul class="edit-schema-template-sport-event">
        <h2 class="clear">
          <span>运动项目</span>
          <i class="icon iconfont icon-plus" @click="sportEventFn()"></i>
        </h2>
        <div @click="sportEventFn()"  v-show="sportItem == ''" class="null_val"> <i class="icon iconfont icon-plus"></i><p>暂无数据，立即添加</p> </div>
        <li class="clear" v-for="(sport, index) in sportItem">
          <i class="fa" :class="'fa-'+sport.sportTypeImg"></i>
          <div class="clear">
            <span>{{ sport.sportName }}</span>
            <span class="color-orange">{{  sport.sportContent }}</span>
            <i class="icon iconfont icon-bi-" @click="sportEventFn(sport, index)"></i>
            <i class="icon iconfont icon-shanchu" @click="sportEventRemoveFn(sport, index)"></i>
          </div>
        </li>
      </ul>

      <!--食谱-->
      <div class="Recipes_con" v-for="(food, index3) in newschemeRecipesVos" :key="food.value">
        <h2 class="clear">
          <span>{{ food.recipesName }}</span>
          <i class="icon iconfont icon-plus" @click="menuPopupStatusFn(index3)"></i>
        </h2>
        <div @click="menuPopupStatusFn()"  v-show="recipes == ''" class="null_val"> <i class="icon iconfont icon-plus"></i><p>暂无数据，立即添加</p> </div>
        <ul class="list_con dp_fix" v-for="(list, index2) in newschemeRecipesVos.recipes">
          <h4>{{ list.eatType }}</h4>
          <div class="list_li">
            <li v-for="(food,index) in list.list"> {{ food.recipesContent  }}
              <i class="icon iconfont icon-bi-" @click="menuPopupStatusFn( index, index2, index3, list)"></i>
              <i class="icon iconfont icon-shanchu" @click="foodEventRemoveFn(index, index2, index3, food)"></i>
            </li>
          </div>
        </ul>

        <!--模拟数据-->

        <!--<ul class="list_con dp_fix" v-for="(recipesul, index) in recipes2" >-->
          <!--<h4>{{ recipesul.eatType }}</h4>-->
          <!--<div class="list_li">-->
            <!--<li  v-for="(food,index) in recipesul.list" >{{ food.recipesContent }}</li>-->
          <!--</div>-->

        <!--</ul>-->

      </div>

      <!--标语-->
      <ul class="tips">
        <textarea id="describe" v-model="schemeDesc" placeholder="在此处输入方案描述"></textarea>
      </ul>
    </div>

    <div class="sub_button" @click="subButton">保存</div>


    <!--食谱弹窗-->
    <div class="menu-popup-wrap" v-if="menuPopupStatus">
      <div class="menu-popup">
        <h3>编辑食谱项目</h3>
        <ul class="popup-main">
          <li class="select-wrap clear">
            <span>餐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别 :</span>
            <dl>
              <!--<dt v-text="foodOpenVal.eatType" @click="dtClickFn"></dt>-->
              <dt v-text="newleixing" @click="dtClickFn"></dt>
              <dd v-for="item in FoodOptions" @click="ddClickFn(item.value)" v-if="menuSelectStatus" v-show="foodEventSelectStatusShow == 0">{{item.value}}
              </dd>
            </dl>
            <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy" v-show="foodEventSelectStatusShow == 0"></i>

          </li>
          <li>
            <span>项目名称 :</span> <input type="text"  :value="newFoodName" v-model="newFoodName">
          </li>

        </ul>
        <ul class=" menu-popup-footer clear">
          <li @click=" menuPopupcancelFn">取消</li>
          <li @click=" menuPopupsureFn">确定</li>
        </ul>
      </div>
    </div>

    <!--运动弹窗-->
    <div class="menu-popup-wrap" v-if="sportEventPopupStatue">
      <div class="menu-popup">
        <h3>编辑运动项目</h3>
        <ul class="popup-main">
          <li class=" clear">
            <span>项目类型:</span>
            <dl>
              <dt v-text="sportEventDtVal" @click="sportEventDtClickFn"></dt>
              <dd v-for="item in SportOptions" @click="sportEventDdClickFn(item)" v-if="sportEventSelectStatus" v-show="sportEventSelectStatusShow == 0">
                {{item.sportsTypeName}}
              </dd>
            </dl>
            <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy" v-show="sportEventSelectStatusShow == 0"></i>

          </li>
          <li>
           <span>项目名称:</span> <input type="text" :value="newSportVal.sportName" v-model="newSportVal.sportName">  <!--v-model="newSportVal.name"-->
          </li>
          <li>
            <span>运动量:</span> <input type="text" :value="newSportVal.sportContent" v-model="newSportVal.sportContent">    <!--v-model="newSportVal.val"-->
          </li>

        </ul>
        <ul class=" menu-popup-footer clear">
          <li @click=" sportEventPopupcancelFn">取消</li>
          <li @click=" sportEventPopupsureFn">确定</li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import { MessageBox, Toast } from 'mint-ui'
  import api from '../../fetch/api'
  import verify from 'vue-verify-plugin'

  var myRules = {
    notnull: {
     test: function (val) {
        if (val.length == 0) {
          Toast({
            message: '不得为空哦',
            position: 'middle',
            duration: 2000
          });
          return false
        }
        return true
      },
      message: '不得小于3位'
    },
    number: {
      test: function (val) {
        var reg = new RegExp("^[0-9]*$");
        if(!reg.test(val)){
          Toast({
            message: '请输入数字',
            position: 'middle',
            duration: 2000
          });
          return false
        }
        return true
      }
    }

  }

  Vue.use(verify, {
    blur: true ,
    rules: myRules
  })
  export default {
    name: '',
    data () {
      return {
        schemeName: '',
        schemeDesc: '',
        schemeCycle: '',
        FoodOptions: [
          {text: 'One', value: '早餐'},
          {text: 'One1', value: '早加餐'},
          {text: 'Two', value: '中餐'},
          {text: 'Two1', value: '中加餐'},
          {text: 'Three', value: '晚餐'},
          {text: 'Three1', value: '晚加餐'}
        ],

        SportOptions: [
//          {id: 1, value: '跑步', icon: 'icon-paobu-' },
//          {id: 2, value: '装逼', icon: 'icon-xiadun-' },
//          {id: 3, value: '睡觉', icon: 'icon-yachi-' },
//          {id: 4, value: '洗澡', icon: 'icon-xieya-' },
//          {id: 5, value: '打麻将', icon: 'icon-pingjia' },
//          {id: 6, value: '吹牛', icon: 'icon-xihuan' }
        ],

        menuPopupStatus: false, // 食谱弹窗状态
        sportEventPopupStatue: false, // 运动弹窗状态
        dtVal: '',// 食谱弹窗下拉框dt值
        menuSelectStatus: false,// 食谱弹窗下拉框dd状态
        sportEventSelectStatus: false,// 运动弹窗下拉框dd状态
        sportEventDtVal: '请选择类型',// 运动弹窗下拉框dt值
        sportOpenVal: '',
        foodOpenVal: { eatType: '请选择类型' },
        foodOpenName: '',
        //运动项目列表
        sportItem: [
          /* {
            sportTypeId: '装逼',
            icon: 'icon-xiadun-',
            sportName: '装逼',
            sportContent: '装完就跑'
          },
          {
            sportTypeId: '睡觉',
            icon: 'icon-xihuan',
            sportName: '睡觉',
            sportContent: '睡一天'
          },
          {
            sportTypeId: '睡觉',
            icon: 'icon-xihuan',
            sportName: '睡觉',
            sportContent: '睡一天'
          }*/
        ],


        //食谱列表
        newschemeRecipesVos:[],
        recipes: [
         /* {
          eatType:'早餐',
          list:[
            { recipesContent: '胡辣汤',eatType:'早餐', },
            { recipesContent: '肉夹馍',eatType:'早餐', }
          ]
        },
          {
            eatType:'午餐',
            list:[
              { recipesContent: '牛肉面',eatType:'午餐', }
            ]
          },
          {
            eatType:'晚餐',
            list:[
              { recipesContent: '牛肉面',eatType:'晚餐', },
              { recipesContent: '胡辣汤',eatType:'晚餐', }
            ]
          },
          {
            eatType:'晚加餐',
            list:[
              { recipesContent: '牛肉面',eatType:'晚餐', },
              { recipesContent: '麻辣粉',eatType:'晚餐', }
            ]
          }*/
        ],

        sportEventSelectStatusShow: 1,
        foodEventSelectStatusShow: 1,

        //两个下标
        valIndex: '',
        valIndex2: '',
        recipesNum: '',

        //新修改内容
        newFoodName: '',
        newSportVal: {
          sportTypeId: '',
          sportTypeImg: '',
          sportName: '',
          sportContent: '',
          sportsTypeName: ''
        },
        //11-2新增
        newleixing:''
      }
    },
    verify: {
      schemeName: ['notnull'],
      schemeCycle: ['number', 'notnull']
    },
    async created () {
      let params = {
      }
      const res = await api.post('doctorScheme/listSportType.do', params)
      if (res.data.stateCode === '001') {
       this.SportOptions = res.data.listSchemeSportsTypes
      }
    },
    mounted () {
    },
    methods: {
      menuPopupcancelFn () {
        this.menuPopupStatus = false
      },
      menuPopupsureFn () {
        if(this.foodOpenVal.eatType == '请选择类型'){
          Toast({
            message: '请选择项目类型',
            position: 'middle',
            duration: 2000
          });
        } else if(this.newFoodName == '') {
          Toast({
            message: '项目名称不得为空',
            position: 'middle',
            duration: 2000
          });
        } else {
        if(this.valIndex == 5){
          let n = 0;
          let newFoodList = {
            eatType: this.newleixing,
              list: [
                { recipesContent: this.newFoodName, eatType: this.newleixing }
              ]
            }

            for( var i = 0; i < this.recipes.length; i++ ) {
              if (this.recipes[i].eatType === newFoodList.eatType){
                 this.recipes[i].list.push(newFoodList.list[0])
                 n=1
               }
          }
          if( n === 0 ) {
            this.recipes.push(newFoodList);
          }
        } else {
          this.recipes[this.valIndex2].list[this.valIndex].recipesContent = this.newFoodName;
        }
        this.menuPopupStatus = false
        }
      },
      menuPopupStatusFn (index, index2,index3, val) {
        // console.log(this.foodList[0])
        if(val){
          console.log(val)
          this.foodOpenVal.eatType = val.eatType;
          this.newleixing = val.eatType;

          this.valIndex = index;
          this.valIndex2 = index2;
          this.foodOpenVal = val;
          this.newFoodName = this.foodOpenVal.list[this.valIndex].recipesContent;
          console.log(this.newFoodName)
        } else {
          this.valIndex = 5
          this.valIndex2 = '';
          this.recipesNum = index3;
          console.log(index3)
          this.newleixing = '请选择类型';
          //this.foodOpenVal.eatType = '请选择类型'    //11-2注掉的
          this.newFoodName = ''
        }
       // console.log(this.newFoodName)
        this.menuPopupStatus = true
      },
      ddClickFn (item) {
        console.log(item)
        this.foodOpenVal.eatType = item
        this.dtVal = item
        this.newleixing = item
        this.menuSelectStatus = false
      },
      dtClickFn () {
        this.menuSelectStatus = true
      },
      // 运动弹窗
      sportEventPopupcancelFn () {
        this.sportEventSelectStatus = false
        this.sportEventPopupStatue = false
      },
      sportEventRemoveFn (obj, index) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          this.sportItem.splice(index, 1)
        });
      },

      foodEventRemoveFn (obj, index, index2) {
        MessageBox.confirm('确定执行此操作?').then(action => {
          console.log(index2)
          this.recipes[index2].list.splice(index, 1);

          if( this.recipes[index2].list.length == 0 ){
             this.recipes.splice(index2, 1)
          }
          console.log(this.recipes)
        });
      },

      sportEventPopupsureFn () {
        console.log(this.sportItem)
        console.log(this.valIndex)
        if( this.valIndex == 5) {
          console.log('当前为新增')

          if( this.sportEventDtVal == '请选择类型' ){
            Toast({
              message: '请选择项目类型',
              position: 'middle',
              duration: 2000
            });
          }else if(this.newSportVal.sportName == ''){
            Toast({
              message: '项目名称不得为空',
              position: 'middle',
              duration: 2000
            });
          } else if(this.newSportVal.sportContent == ''){
            Toast({
              message: '运动量不得为空',
              position: 'middle',
              duration: 2000
            });
          } else {
            var sx = {sportTypeId: this.newSportVal.sportTypeId,
              sportTypeImg: this.newSportVal.sportTypeImg,
              sportName: this.newSportVal.sportName,
              sportContent:this.newSportVal.sportContent,
              sportsTypeName: this.sportEventDtVal,
            }
            this.sportItem.push(sx);
            this.sportEventPopupStatue = false;
          }

        } else {
          //此处接10-28号问题
          console.log(this.valIndex)
          this.sportItem[this.valIndex].sportsTypeName = this.sportEventDtVal
          this.sportItem[this.valIndex].sportContent = this.newSportVal.sportContent;
          this.sportItem[this.valIndex].sportName = this.newSportVal.sportName
          this.sportEventPopupStatue = false;
        }

      },
      sportEventFn (valtext, index) {
        if(valtext){
          //alert(111)
          console.log(valtext)
          this.valIndex = index;
          this.sportEventDtVal = valtext.sportsTypeName
          this.newSportVal.sportName = valtext.sportName
          this.newSportVal.sportContent = valtext.sportContent
          this.newSportVal.sportsTypeName = valtext.sportsTypeName
          console.log(this.newSportVal)
        //  this.sportEventName = val.name
        } else {
          this.valIndex = 5;
          this.newSportVal = {
            sportTypeId: '',
            sportTypeImg: '',
            sportName: '',
            sportContent: '',
            sportsTypeName: ''
          }
          console.log('当前为新增》打开按钮')
          this.sportEventDtVal = '请选择类型'
        }
        this.sportEventPopupStatue = true
        //this.sportOpenVal = val
       // console.log(this.sportOpenVal)s
      },
      sportEventDdClickFn (item) {
        console.log(item)
        this.sportEventDtVal = item.sportsTypeName
        this.newSportVal.sportTypeImg = item.sportTypeImg
        this.newSportVal.sportTypeId = item.sportsTypeId
        this.sportEventSelectStatus = false
      },
      sportEventDtClickFn () {
        this.sportEventSelectStatus = true
      },
      addSchema (){
        let recipes = {
          recipesName: '未命名食谱',
        }
        this.newschemeRecipesVos.push(recipes)

      },
      async subButton () {
        if(this.$verify.check()){
          //通过验证
        }
        //console.log(this.schemeName)
        var xx = [];
        for(var i = 0 ; i < this.recipes.length; i++){
          for(var n = 0; n < this.recipes[i].list.length; n++){
            xx.push( this.recipes[i].list[n] )
          }
          //  xx.push(this.recipes[i])
        }
        var sportTostring = JSON.stringify(this.sportItem)
        console.log(sportTostring)


        let params = {
          'doctorId': 1,
          'schemeName': this.schemeName,
          'schemeDesc': this.schemeDesc,
          'schemeCycle': this.schemeCycle,
          //  'sportItem': this.sportItem,
          'sportItem': sportTostring
          ,
          'recipes': '[{"recipesName":"食谱1","schemeRecipesInfos":[{"eatType":"早餐1","recipesContent":"馒头1"},{"eatType":"早餐2","recipesContent":"馒头2"}]},{"recipesName":"食谱2","schemeRecipesInfos":[{"eatType":"早餐1","recipesContent":"馒头1"},{"eatType":"早餐2","recipesContent":"馒头2"}]}]'
        }
        const res = await api.post('doctorScheme/saveScheme.do', params)
        if (res.data.stateCode === '001') {
          this.schemeModelList = res.data.schemeModelList;
          console.log(this.schemeModelList);
          this.loading = 1;
          console.log('成功')

          // this.nowCode = res.data.validateCode
        } else if (res.data.stateCode === '002') {
          console.log('参数异常')
        } else {
          console.log('系统错误')
        }

      }
    },
    components: {},
    filters: {},
    watch: {
      'valIndex':function(val){
        if(val == 5){
          this.sportEventSelectStatusShow = 0
          this.foodEventSelectStatusShow = 0
        } else {
          this.sportEventSelectStatusShow = 1
          this.foodEventSelectStatusShow = 1
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @color999999: #999999;
  @bordercolor: #d9d9d9;
  @color666666: #666666;
  @color333333: #333333;


  .edit-schema-template-wrap {
  .null_val{
    font-size: 1.4rem;
    padding: 2rem;
    text-align: center;
    color: #ccc;
    background: #fff;
  p{
    display: inline-block;
  }
  i{
    font-size: 2rem;
    display: inline-block;
    position: relative;
    top:0.2rem;
  }
  }
  .verify-error{ border: solid 1px red !important;}
  .sub_button{ padding: 1.2rem 0; font-size: 1.4rem; text-align: center; color: #fff;   border-radius:0.2rem;  width: 80%; margin: 0 auto; background: #10d1a0}
  .addFoodList{
    display: block;
    position: fixed;
    top:2rem;
    right: 1rem;
    z-index:9;
    font-size: 1.4rem;
    background: none;
    color: #fff;
  }
  .edit-schema-template-main {
    margin-top: 5.5rem;
  .edit-schema-template-top {
    font-size: 1.7rem;
    color: @color333333;
    padding: 1rem 1.5rem 0;
    background: #ffffff;
  input {
    width: 71.3%;
    background: #f5f5f5;
    margin: 0 1rem;
    border: solid 1px #f5f5f5;
    padding: 1.1rem 1.5rem;
    font-size: 1.5rem;
    border-radius: 0.4rem;
    color: @color999999;
  }
  label {
    display: inline-block;
    width: 20%;
  }
  }
  #kangbi {
    padding-bottom: 1.5rem;
  input {
    position: relative;
    left: -0.4rem;
  }
  }
  #template-name {
    padding-top: 1.5rem;
  }
  #cycle {
  input {
    width: 63%;
    margin: 0 -1rem 0 1rem;
    padding: 1.25rem 2rem 1.25rem 1.5rem;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    color: @color999999;
  }
  span {
  &:last-of-type {
     padding: 1.25rem 1rem;
     font-size: 1.5rem;
     color: @color999999;
     background: #f5f5f5;
     border-top-right-radius: 0.4rem;
     border-bottom-right-radius: 0.4rem;
   }

  }
  }

  h2 {
    font-size: 1.7rem;
    color: @color666666;
    background: #f5f5f5;
    padding: 1.2rem 1.5rem;
  span {
    position: relative;
    top: 0.5rem;
  input{
    background: #f5f5f5;
    color:#666
  }
  }
  .icon {
    font-size: 3.3rem;
    color: #10d1a0;
    float: right;

  }
  }
  .edit-schema-template-sport-event {
    background: #ffffff;
  li {
    padding: 1.3rem 0 1.5rem 1.5rem;
    font-size: 1.6rem;
    color: @color333333;
  .icon {
    color: #10d1a0;
    font-size: 2.5rem;
  }
  .fa {
    color: #10d1a0;
    font-size: 3.2rem;
    margin-left: 1.2rem;
  }
  & > .icon {
      font-size: 4rem;
      float: left;
    }
  & > div {
      width: 80%;
      float: right;
      position: relative;
      top: 0.6rem;
      border-bottom: 1px solid @bordercolor;
      padding: 0 1.5rem 1rem 0;

  span {
  &:first-child {
     width: 6rem;
     display: inline-block;
   }
  &:last-of-type {
     width: 10rem;
     display: inline-block;
     text-align: center;
   }
  }
  .icon {
    float: right;
  &:last-of-type {
     margin-right: 2rem;
   }
  }

  }
  .color-orange {
    color: #ffaa3e;
  }
  }

  }

  .Recipes_con {
  ul {
    background: #ffffff;

  }
  .dp_fix {
    display: flex;
    margin-bottom: 0.5rem;
  &:last-of-type {
     margin-bottom: 0;
   }
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
    width: 80%;
  li {
    padding: 2.1rem 0;
    border-top: solid 1px #d9d9d9;
    height: auto;
    overflow: hidden;
    font-size: 1.6rem;
    color: @color333333;
  .icon {
    float: right;
    font-size: 2.5rem;
    margin-right: 1.7rem;
    color: #10d1a0;
  }
  }
  li:first-child {
    border: none;
  }
  }

  }

  .tips {
    display: block;
    min-height: 12rem;
    background: #fff;
    border-radius:0.3rem;
    width:90%;
    border: solid 1px #ccc;
    margin:2rem auto;
    font-size: 1.5rem;
    color: @color999999;
    padding: 1rem;
  }
  }
  .menu-popup-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  .menu-popup {
    background: #ffffff;
    border-radius: 0.4rem;
    width: 91%;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
  h3 {
    color: #10d1a0;
    font-size: 1.8rem;
    text-align: center;
    padding: 1.7rem 0;
    border-bottom: 1px solid @bordercolor;
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
  .popup-main {
    padding: 1.5rem 3.5rem;
    color: @color333333;
    font-size: 1.6rem;
  li {
    margin-bottom: 0.5rem;
    position: relative;
  &:first-of-type{
     margin-bottom: 0.9rem;
   }
  &:last-of-type{
     margin-bottom: 0;
   }
  span {
    display: inline-block;
    width: 30%;
    float: left;
    padding: 0.8rem 0;
  }
  input {
    padding: 1rem 1.5rem;
    background: #f5f5f5;
    width: 62%;
    font-size: 1.5rem;
    color: @color999999;
    margin-left: 1rem;
    border-radius: 0.4rem;
  }
  dl {
    background: #f5f5f5;
    width: 62%;
    font-size: 1.5rem;
    color: @color999999;
    border-radius: 0.4rem;
    float: left;
    position: absolute;
    right: 1.2rem;
    z-index: 2;
  dt {
    padding: 1rem 1.5rem;
  }
  dd {
    padding: 1rem 1.5rem;
  &:hover {
     background: #10d1a0;
     color: #fff;
   }
  }
  }

  .icon {
    display: inline-block;
    position: absolute;
    right: 2.5rem;
    top: 1.2rem;
    color: @color999999;
    z-index: 3;

  }
  }

  }
  .menu-popup-footer {
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
     color: @color999999;
   }
  }
  }

  }
  }
  }


</style>
