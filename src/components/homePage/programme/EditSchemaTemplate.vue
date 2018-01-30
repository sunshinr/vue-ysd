<template>
  <div class="edit-schema-template-wrap">

    <HeaderBar3 title="编辑方案模板" ></HeaderBar3>
    <div class="edit-schema-template-main">
      <span class="addFoodList" @click="addSchema()">新增食谱</span>
      <div class="edit-schema-template-top" id="template-name">
        <label>方案名称</label><input type="text" placeholder="请输入方案名称" v-model="schemeName " v-verify="schemeName">
      </div>
      <div class="edit-schema-template-top" id="cycle">
        <label>方案周期</label><input type="text" placeholder="请输入方案执行周期" v-model="schemeCycle"  v-verify="schemeCycle"> <span>天</span>
      </div>
      <div class="edit-schema-template-top" id="kangbi">
        <!--<label>康&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;币</label> <input type="text" placeholder="0">-->
      </div>

      <!--运动项目-->
      <ul class="edit-schema-template-sport-event">
        <h2 class="clear">
          <span>运动项目</span>
          <i class="icon iconfont icon-plus"  @click="sportEventFn()"></i>
        </h2>
        <div @click="sportEventFn()" v-show="schemeModelSportVos == ''"  class="null_val"> <i class="icon iconfont icon-plus"></i><p>暂无数据，立即添加</p></div>
        <li class="clear" v-for="(sport, index) in schemeModelSportVos" :key="sport.value">
          <i class="icon iconfont" :class="'icon-'+sport.schemeSportsType.sportTypeImg"></i>
          <div class="clear">
            <span>{{ sport.sportsName }}</span>
            <span class="color-orange">{{ sport.sportsContent }}</span>
            <i class="icon iconfont icon-bi-" @click="sportEventFn(sport, index)"></i>
            <i class="icon iconfont icon-shanchu" @click="sportEventRemoveFn(sport, index)"></i>
          </div>
        </li>
      </ul>

      <!--食谱-->
      <div class="Recipes_con" v-for="(food, index) in newschemeRecipesVos" :key="food.value">
        <h2 class="clear">
         <span> <input type="text" v-model="food.recipesName" placeholder="未命名食谱"></span>
          <i class="icon iconfont icon-plus" @click="menuPopupStatusFn(index)"></i>
        </h2>
        <div @click="menuPopupStatusFn(index)" v-show="food.schemeRecipesInfos == ''"  class="null_val"> <i class="icon iconfont icon-plus"></i><p>暂无数据，立即添加</p></div>
        <ul class="list_con dp_fix" v-for="(foodType, index2) in food.schemeRecipesInfos" :key="foodType.value">
          <h4>{{ foodType.eatType }}</h4>
          <div class="list_li">
            <li v-for="(foodlist, index3) in foodType.data" :key="foodlist.value"> {{ foodlist.recipesContent }}
              <i class="icon iconfont icon-bi-" @click="menuPopupStatusFn(index, index2, index3, foodlist)"></i>
              <i class="icon iconfont icon-shanchu" @click="foodEventRemoveFn(index, index2, index3)"></i>
            </li>
          </div>
        </ul>
      </div>

      <!--标语-->
      <textarea class="tips" v-model="schemeDesc" v-verify="schemeDesc"> {{ schemeDesc }}</textarea>
    </div>

    <div class="sub_button" @click="subButton">保存</div>



    <!--食谱弹窗-->
    <div class="menu-popup-wrap" v-if="menuPopupStatus">
      <div class="menu-popup">
        <h3>编辑食谱项目</h3>
        <ul class="popup-main">
          <li class="select-wrap clear">
            <span>餐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
            <dl>
              <dt v-text="editFoodVal.eatType" @click="dtClickFn" :class="foodEventSelectStatusShow == 0? '':'InptDisable'"></dt>
              <dd v-for="item in options" :key="item.value" @click="ddClickFn(item.value)" v-if="menuSelectStatus" v-show="foodEventSelectStatusShow == 0">{{item.value}}
              </dd>
            </dl>
            <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy" v-show="foodEventSelectStatusShow == 0"></i>
          </li>
          <li>
            <span>项目名称:</span> <input type="text" v-model="editFoodVal.recipesContent">
          </li>

        </ul>
        <ul class=" menu-popup-footer clear">
          <li @click=" menuPopupcancelFn">取消</li>
          <li @click="menuPopupsureFn">确定</li>
        </ul>
      </div>
    </div>

    <!--运动弹窗-->
    <div class="menu-popup-wrap" v-if="sportEventPopupStatue">
      <div class="menu-popup">
        <h3>编辑运动项目</h3>
        <ul class="popup-main">
          <li class=" clear">
            <span>项目类型 :</span>
            <dl>
              <dt v-text="editSportVal.schemeSportsType.sportsTypeName" @click="sportEventDtClickFn" :class="sportEventSelectStatusShow == 0? '':'InptDisable'"></dt>
                <dd v-for="item in listSchemeSportsTypes" :key="item.value" @click="sportEventDdClickFn(item)"  v-if="sportEventSelectStatus" v-show="sportEventSelectStatusShow == 0" >
                  {{item.sportsTypeName}}
                </dd>
             </dl>
             <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy" v-show="foodEventSelectStatusShow == 0"></i>
           </li>
           <li>
             <span>项目名称 :</span> <input type="text" :value="editSportVal.sportsName" v-model="editSportVal.sportsName">
           </li>
           <li>
             <span>运动量　 :</span> <input type="text"  v-model="editSportVal.sportsContent">
           </li>

         </ul>
         <ul class=" menu-popup-footer clear">
           <li @click="sportEventPopupcancelFn">取消</li>
           <li @click="sportEventPopupsureFn">确定</li>
         </ul>
       </div>
     </div>
   </div>
 </template>


 <script>
   import Vue from 'vue'
   import api from '../../fetch/api'
   import { MessageBox, Toast } from 'mint-ui'
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
         schemeCycle: '',
         options: [
           {text: 'One', value: '早餐'},
           {text: 'One1', value: '早加餐'},
           {text: 'Two', value: '午餐'},
           {text: 'Two1', value: '午加餐'},
           {text: 'Three', value: '晚餐'},
           {text: 'Three1', value: '晚加餐'}
         ],

         sportEventSelectStatusShow: 0,//箭头显示隐藏
         foodEventSelectStatusShow: 0,//箭头显示隐藏

         listSchemeSportsTypes: '',
         menuPopupStatus: false, // 食谱弹窗状态
         sportEventPopupStatue: false, // 运动弹窗状态
         dtVal: '早餐',// 食谱弹窗下拉框dt值
         menuSelectStatus: false,// 食谱弹窗下拉框dd状态
         sportEventSelectStatus: false,// 运动弹窗下拉框dd状态
         sportEventDtVal: '早餐',// 运动弹窗下拉框dt值
         schemeName: '',
         schemeCycle: '',
         schemeDesc: '',


         indexVal: '',  //下标
         indexVal2: '',  //下标2
         indexVal3: '',  //下标3

         schemeModelSportVos: '', //运动列表
         schemeModelSportVos2: [],

         sportTypeList: [], //运动类型分类列表

         schemeModel: '',   //总数据列表
         newschemeRecipesVos: [],//格式化后的食谱列表

         editSportVal: {  //运动项目暂存数据
           schemeSportsType: {
             sportsTypeName: '请选择类型',
             sportsTypeId: 0,
             sportTypeImg: ''
           },
           sportsName: '',
           sportsContent: '',
           sportsId: ''
         },

         editFoodVal: {
           eatType: '',
           recipesContent: '',
           recipesInfoInsId: 0
         }  //食谱项目暂存数据
       }
     },
     verify: {
       schemeName: ['notnull'],
       schemeCycle: ['number', 'notnull'],
       schemeDesc: ['notnull']
     },
     async created(){
       let params = {
         'schemeId': this.$route.params.id
       }
       const res = await api.post('doctorScheme/searchSchemeModel.do', params)
       if (res.data.stateCode === '001') {
         this.schemeModel = res.data.schemeModel;
         this.schemeName = res.data.schemeModel.schemeName;
         this.schemeCycle = res.data.schemeModel.schemeCycle;
         this.schemeDesc = res.data.schemeModel.schemeDesc

         console.log(this.schemeModel)
         this.schemeModelSportVos = res.data.schemeModel.schemeModelSportVos;

         for(var i = 0; i< this.schemeModelSportVos.length; i++){
         var  sportlist2 = {
           schemeSportsType: {
             sportsTypeId: this.schemeModelSportVos[i].schemeSportsType.sportsTypeId
           },
           sportsContent: this.schemeModelSportVos[i].sportsContent,
           sportsCycle: this.schemeModelSportVos[i].sportsCycle,
           sportsId: this.schemeModelSportVos[i].sportsId,
           sportsName: this.schemeModelSportVos[i].sportsName
           }
         }
         //console.log(this.schemeModelSportVos2)


         var arr = res.data.schemeModel.schemeRecipesVos; //获取食谱列表
         console.log(arr)
         //食谱列表格式转换
         for( var n = 0; n < arr.length; n++ ){
           var map = {},
             dest = [];
           for(var i = 0; i < arr[n].schemeRecipesInfoVo.length; i++){
             var ai = arr[n].schemeRecipesInfoVo[i];
             if(!map[ai.eatType]){
               dest.push({
                 eatType:ai.eatType,
                 data:[ai]
               });
               map[ai.eatType] = ai;
             }else{
               for(var j = 0; j < dest.length; j++){
                 var dj = dest[j];
                 if(dj.eatType == ai.eatType){
                   dj.data.push(ai);
                   break;
                 }
               }
             }
           }
           this.newschemeRecipesVos.push({
             recipesName: arr[n].recipesName,
             schemeRecipesInfos: dest
           });
         };

         console.log(this.newschemeRecipesVos)
        // this.loading = 1;
       } else if (res.data.stateCode === '002') {
         console.log('参数异常')
       } else {
         console.log('系统错误')
       }
     },
     mounted (){
     },
     methods: {
       menuPopupcancelFn () {
         this.menuPopupStatus = false
         this.menuSelectStatus = false
       },
       addSchema () {
         console.log(this.newschemeRecipesVos)
        var swxx = JSON.stringify(this.newschemeRecipesVos)
         console.log(swxx)
         //新增食谱按钮
         let addFoodList = {
           recipesName: '',
           schemeRecipesInfos: []
         }

         this.newschemeRecipesVos.push(addFoodList)
       },
       menuPopupsureFn () {

         if (this.editFoodVal.eatType === '请选择类型') {
           Toast({
             message: '请选择餐别',
             position: 'middle',
             duration: 2000
           });
         } else if (this.editFoodVal.recipesContent === '') {
           Toast({
             message: '请填写项目名称',
             position: 'middle',
             duration: 2000
           });
         } else {

           if(this.indexVal === 5){
             let n = 0;
             console.log(this.indexVal2)
          //   console.log(this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos[0]);
             let newFoodList = {
               eatType: this.editFoodVal.eatType,
               data: [
                 {
                   recipesContent: this.editFoodVal.recipesContent,
                   eatType: this.editFoodVal.eatType,
                 }
               ]
             }

//             if( this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos == ''||  n === 0){
//               this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos.push(newFoodList);
//             }

             for( var i = 0; i < this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos.length; i++ ) {
               if (this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos[i].eatType === newFoodList.eatType){
                 this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos[i].data.push(newFoodList.data[0])
                 n=1
               }
             }
             if( n === 0 ) {
               this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos.push(newFoodList);
             }
             this.menuPopupStatus = false


             console.log(this.newschemeRecipesVos)

           } else {
             // console.log(this.indexVal2 + '-' +this.indexVal + '-' +this.indexVal3)
             this.newschemeRecipesVos[this.indexVal2].schemeRecipesInfos[this.indexVal].data[this.indexVal3].recipesContent = this.editFoodVal.recipesContent
             this.menuPopupStatus = false
           }
         }


       },
       menuPopupStatusFn (ind, ind2, ind3, foodlist) {
          //this.indexVal = ind
         if(foodlist){
           this.indexVal = ind2,
           this.indexVal2 = ind,
           this.indexVal3=  ind3,
           //console.log(ind + '-' + ind2 + '-' + ind3)
             this.editFoodVal.eatType = foodlist.eatType,
             this.editFoodVal.recipesContent = foodlist.recipesContent,
             this.editFoodVal.recipesInfoInsId = foodlist.recipesInfoInsId
         } else {
           this.indexVal2 = ind,
           this.indexVal = 5,
           this.indexVal3 = ind2,
           //  console.log(ind)
           this.editFoodVal = {
             eatType: '请选择类型',
             recipesContent: '',
             recipesInfoInsId: 0
           }
           }
         this.menuPopupStatus = true
       },
       foodEventRemoveFn (ind, ind2, ind3){
        // alert(ind + '-' + ind2 + '-'+ ind3)
           this.indexVal = ind2,
           this.indexVal2 = ind,
           this.indexVal3=  ind3,
             MessageBox.confirm('确定执行此操作?').then(action => {
             this.newschemeRecipesVos[ind].schemeRecipesInfos[ind2].data.splice(ind3, 1)  //
               //this.newschemeRecipesVos[this.index2][this.ind].list.splice(index, 1);

               if( this.newschemeRecipesVos[ind].schemeRecipesInfos[ind2].data.length == 0 ){
                 this.newschemeRecipesVos[ind].schemeRecipesInfos.splice(ind2, 1)
               }
             //  console.log(this.recipes)
             });
         //食谱列表删除按钮
       },
       ddClickFn (item) {
         console.log(item)
        // this.dtVal = item
         this.editFoodVal.eatType = item
         this.menuSelectStatus = false
       },
       dtClickFn () {
         this.menuSelectStatus = true
       },
       // 运动弹窗
       sportEventPopupcancelFn () {
         this.sportEventPopupStatue = false;
         this.sportEventSelectStatus = false
       },

       sportEventPopupsureFn () {

           if (this.editSportVal.schemeSportsType.sportsTypeName === '请选择类型') {
             Toast({
               message: '请选择项目类型',
               position: 'middle',
               duration: 2000
             });
           } else if (this.editSportVal.sportsName === '') {
             Toast({
               message: '请填写项目名称',
               position: 'middle',
               duration: 2000
             });
           } else if (this.editSportVal.sportsContent === '') {
             Toast({
               message: '请填写运动量',
               position: 'middle',
               duration: 2000
             });
           } else {
             if ( this.indexVal === 5 ) {

             var xxx = {
               schemeSportsType: {
                 sportsTypeName: this.editSportVal.schemeSportsType.sportsTypeName,
                 sportsTypeId: this.editSportVal.schemeSportsType.sportsTypeId,
                 sportTypeImg: this.editSportVal.schemeSportsType.sportTypeImg
               },
               sportsName: this.editSportVal.sportsName,
               sportsContent: this.editSportVal.sportsContent,
               sportsId: ''
             }

             this.schemeModelSportVos.push(xxx)
             this.sportEventPopupStatue = false

           console.log(this.editSportVal.sportsName)

           console.log(this.editSportVal)
           console.log(this.schemeModelSportVos)
         } else {
          // alert(2)

         //  this.schemeSportIns[this.indexVal] = this.editSportVal

           this.schemeModelSportVos[this.indexVal].schemeSportsType.sportsTypeName = this.editSportVal.schemeSportsType.sportsTypeName
           this.schemeModelSportVos[this.indexVal].schemeSportsType.sportTypeImg = this.editSportVal.schemeSportsType.sportTypeImg
           this.schemeModelSportVos[this.indexVal].sportsName = this.editSportVal.sportsName
           this.schemeModelSportVos[this.indexVal].sportsContent = this.editSportVal.sportsContent
           this.schemeModelSportVos[this.indexVal].sportsId = this.editSportVal.sportsId
           this.sportEventPopupStatue = false
         }
           }
       },

       sportEventFn (sportVal,ind) {    //运动新增、编辑按钮
         if(sportVal){
           this.indexVal = ind;
        //   this.editSportVal = sportVal
           this.editSportVal.schemeSportsType.sportsTypeName = sportVal.schemeSportsType.sportsTypeName
           this.editSportVal.schemeSportsType.sportTypeImg = sportVal.schemeSportsType.sportTypeImg
           this.editSportVal.sportsName = sportVal.sportsName
           this.editSportVal.sportsContent = sportVal.sportsContent
           this.editSportVal.sportsId = sportVal.sportsId

         } else {
           this.indexVal = 5,
           this.editSportVal = {
             schemeSportsType: {
               sportsTypeName: '请选择类型',
               sportsTypeId: 1,
               sportTypeImg:''
             },
             sportsName: '',
             sportsContent: '',
             sportsId: ''
       }
     }
     console.log(this.editSportVal)
   console.log(this.editSportVal.schemeSportsType.sportsTypeName)

   this.sportEventPopupStatue = true
   },
   sportEventRemoveFn (obj, index) {  //删除按钮
     MessageBox.confirm('确定执行此操作?').then(action => {
       this.schemeModelSportVos.splice(index, 1)
     });
   },
   sportEventDdClickFn (item) {
     console.log(item)
     // this.dtVal = item
     this.editSportVal.schemeSportsType.sportsTypeName = item.sportsTypeName;
     this.editSportVal.schemeSportsType.sportTypeImg = item.sportTypeImg;
     this.editSportVal.schemeSportsType.sportsTypeId = item.sportsTypeId
     this.sportEventSelectStatus = false
   },
   async sportEventDtClickFn () {
         if(this.foodEventSelectStatusShow == 0){
           this.sportEventSelectStatus = true
           let params = {
             // 'schemeInsId': this.$route.params.id
           }
           const res = await api.post('doctorScheme/listSportType.do', params)
           if (res.data.stateCode === '001') {

             this.listSchemeSportsTypes = res.data.listSchemeSportsTypes
             console.log(this.listSchemeSportsTypes)
           }
         }
   },
   async subButton () {
     if(this.$verify.check()){
       //提交按钮
       var sportString = this.schemeModel.schemeModelSportVos;
       console.log(JSON.stringify(this.schemeModel.schemeModelSportVos));
       console.log(this.schemeModel.schemeName + '-' + this.schemeModel.schemeCycle)

       var foodlist = [];

       for(var i = 0 ; i< this.newschemeRecipesVos.length; i++) {
         var cxcx = [];
         var vvv = [];

        if( this.newschemeRecipesVos[i].schemeRecipesInfos.length != 0){
           for(var n = 0; n < this.newschemeRecipesVos[i].schemeRecipesInfos.length; n++){
             for(var p = 0; p < this.newschemeRecipesVos[i].schemeRecipesInfos[n].data.length; p++){
               var xx = this.newschemeRecipesVos[i].schemeRecipesInfos[n].data[p]
               vvv.push(xx)
               console.log(vvv)
               var pp = {
                 recipesName: this.newschemeRecipesVos[i].recipesName,
                 schemeRecipesInfos: vvv
               }

             }
             cxcx.push(pp)

           }
        } else {
           var pp = {
             recipesName: this.newschemeRecipesVos[i].recipesName,
             schemeRecipesInfos: []
           }
           cxcx.push(pp)
        }

         foodlist.push(pp)


       }

       let params = {
         doctorId:  this.schemeModel.doctorId,
         shemeModelId: this.schemeModel.schemeId,
         schemeName: this.schemeName,
         schemeCycle: this.schemeCycle,
         schemeDesc: this.schemeModel.schemeDesc,
         sportItem: JSON.stringify(this.schemeModel.schemeModelSportVos),
         recipes:  JSON.stringify(foodlist),
       }
       const res = await api.post('doctorScheme/updateSchemeModelsSave.do', params)
       if (res.data.stateCode === '001') {
         let instance = Toast({
           message: '保存成功,返回',
           position: 'middle',
           iconClass: 'icon iconfont icon-jian-copy'
         });
         setTimeout(() => {
           instance.close();
           this.$router.go(-1)
         }, 2000);

         console.log(params)
       } else if( res.data.stateCode === '002'){
         Toast({
           message: '网络错误，稍后再试',
           position: 'middle',
           duration: 2000
         });
       } else {
         Toast({
           message: '网络错误，稍后再试',
           position: 'middle',
           duration: 2000
         });
       }
     }
       }
     },
     components: { },
     filters: {},
     watch: {
       'indexVal':function(val){
         if(val == 5){
           this.sportEventSelectStatusShow = 0
           this.foodEventSelectStatusShow = 0
         } else {
           this.sportEventSelectStatusShow = 1
           this.foodEventSelectStatusShow = 1
         }
       },
//       'indexVal2':function(val){
//         if(val == 5){
//           this.foodEventSelectStatusShow = 0
//         } else {
//           this.foodEventSelectStatusShow = 1
//         }
//       }
     }

   }
 </script>


 <style lang="less" scoped>
   @color999999: #999999;
   @bordercolor: #d9d9d9;
   @color666666: #666666;
   @color333333: #333333;

.InptDisable{
  background: #fff;
}
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
       font-size: 2.8rem;
       float: left;
     width: 5rem;
     text-align: center;
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
    width: 8rem;

     float: left;
    }
   &:last-of-type {
     margin-left: 2rem;
      width: 8rem;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
      display: inline-block;
      text-align: left;
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
     line-height: 2rem;
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
