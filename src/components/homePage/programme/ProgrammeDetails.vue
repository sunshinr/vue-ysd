<template>
  <div class="ProgrammeDet">
    <headerBar3 title="方案详情"></headerBar3>
    <span class="jinbi"><img src="/static/images/jinbi.png" alt="">{{ schemeModel.schemeScore | valnull }}</span>
    <!--<loading v-show="loading == 0"></loading>-->
    <div class="head"><img :src="schemeModel.doctorImg" alt=""><h3> {{ schemeModel.doctorName }}</h3> <mt-button type="danger" plain>已收藏</mt-button> </div>
    <div class="motion_con">
       <h3 class="list_title">运动项目</h3>
       <ul class="list_con">
         <div  v-show="schemeModel.schemeModelSportVos == ''"  class="null_val"><p>暂无数据</p></div>
        <li v-for="sportList in schemeModel.schemeModelSportVos">
          <i class="icon iconfont" :class="'icon-'+sportList.schemeSportsType.sportTypeImg"></i><h3>{{ sportList.sportsName }}</h3><span class="list_con_val">{{ sportList.sportsContent}}</span>
        </li>
      </ul>
    </div>

    <div class="Recipes_con" v-for="recipes in newschemeModel">
      <h3 class="list_title">食谱</h3>
      <ul class="list_con dp_fix" v-for="recipesul in recipes" >
        <h4>{{ recipesul.eatType }}</h4>
        <div class="list_li" >
          <li v-for="schemeRecipesVos in recipesul.data" >{{ schemeRecipesVos.recipesContent }}</li>
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
  </div>
</template>


<script>
  import loading from '../../common/loading.vue'
  import api from '../../fetch/api'
  export default {
    data () {
      return {
        title: '我的方案',
        tBTxt: '添加',
        tUrl: '/',
        schemeModel: '',
        loading:0,

        newschemeModel:[] //格式化后的数据
      }
    },
    async created (){
      let params = {
        'schemeId': this.$route.params.id
      }
      console.log(params)
      const res = await api.post('doctorScheme/searchSchemeModel.do', params)
      if (res.data.stateCode === '001') {
        this.schemeModel = res.data.schemeModel;
        console.log(res.data);
        var arr = res.data.schemeModel.schemeRecipesVos

        for( var n = 0; n < res.data.schemeModel.schemeRecipesVos.length; n++ ){
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
          this.newschemeModel.push(dest);
        }

        console.log(this.newschemeModel);
        var last=JSON.stringify(res.data.schemeModel.schemeRecipesVos);
        console.log(last)
        this.loading = 1;
        // this.nowCode = res.data.validateCode
      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    methods: {},
    components: {
      loading:loading
    },
    filters: {
      valnull: function (value) {
        //return value.charAt(0).toUpperCase() + value.slice(1);
        return '免费'
      }
    },
  }
</script>

<style lang="less">
  .ProgrammeDet{
    padding: 5.4rem 0 0;
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
    .jinbi{
      font-size: 1.4rem;
      position: fixed;
      right: 2rem;
      top:2rem;
      z-index: 999;
      color: #fff;
      img{
        width: 1.6rem;
        margin-right: 0.6rem;
        color: #ff9b0d;
      }
    }
    .list_title{ padding: 1.5rem;
      font-size: 1.6rem;
    }
    .mg_0{
      margin-bottom: 0 !important;
    }
    .list_con{
      background: #fff;
      border-bottom: solid 1px #d9d9d9;
    }
    .head{
      font-size: 1.6rem;
      background: #fff;
      padding: 1.6rem;
      height: auto;
      overflow: hidden;
      border-bottom: solid 1px #d9d9d9;
      h3{
        height: 4.5rem;
        line-height: 4.5rem;
        float: left;
        margin-left: 1.5rem;
      }
      img{
        height: 4.5rem;
        width: 4.5rem;
        border-radius:4.5rem;
        float: left;
      }
      .mint-button{
         float: right;
        background: #ebebeb;
        color: #808080;
      }
      .is-plain{
        border:solid 0px #10d1a0;
        color: #808080;
        padding: 0.6rem 2.4rem;
        height: auto;
        font-size: 1.6rem;
        margin-top: 0.3rem;
      }
    }
    .motion_con{
      height: auto;
      overflow: hidden;
      ul{
        li{
          padding: 0.5rem 0;
           width: 93%;
          margin-left: 7%;
          border-top: solid 1px #d9d9d9;
          height: auto;
          overflow: hidden;
          .icon{
            font-size: 2.8rem;
            line-height: 5rem;
            color: #10d1a0;
            display: block;
            float: left;
          }
          h3{
            font-size: 1.6rem;
            display: block;
            float: left;
            line-height: 5rem;
            margin-left: 1rem;
          }
          .list_con_val{
            font-size: 1.8rem;
            display: block;
            float: right;
            line-height: 5rem;
            margin-right: 2rem;
            color: #ff9b0d;
          }
        }
        li:first-of-type{
          border:none
        }
      }

    }
    .Recipes_con{
      .dp_fix{
        display: flex;
        margin-bottom: 1rem;
      }
      h4{
        width: 24%;
        text-align: center;
        height: 6.4rem;
        line-height: 6.4rem;
        font-size: 1.8rem;
        color: #10d1a0;
      }
      .list_li{
        width: 76%;
        li{
          padding:2.1rem 0;
          border-top: solid 1px #d9d9d9;
          height: auto;
          overflow: hidden;
          font-size: 1.6rem;
        }
        li:first-child{
          border:none;
        }
      }

    }
    .describe{
      p{
        font-size: 1.6rem;
        background: #fff;
        padding: 1.5rem;
        line-height: 2.6rem;
        color: #999999;
      }
    }
  }
</style>

