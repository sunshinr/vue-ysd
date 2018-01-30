<template>
  <div class="user-patient-list-wrap">
    <HeaderBar3 title="使用患者"></HeaderBar3>
    <div class="user-patient-list-main">
      <!--<loading v-show="loading == 0"></loading>-->
      <div class="clear" v-for="InsList in schemeInsList">
        <img :src="InsList.memberImg">
        <dl>
          <dt class="clear">{{ InsList.memberName  }} <span>{{ InsList.memberSex | nullSex }} {{ InsList.memberAge  | nullSex }} 岁</span><span>已完成 {{ InsList.doRatio + '%'}}</span></dt>
          <dd class="clear">
            <span>新</span>
            <span>
            <mt-progress :value="InsList.doRatio" :bar-height="10"></mt-progress>
          </span>
          </dd>
        </dl>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
      <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
    </infinite-loading>
    <div class="no-data" v-if="nullVal">
      <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无患者使用" ></NoData>
    </div>
  </div>
</template>


<script>
  import api from '../fetch/api'
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    name: '',
    data () {
      return {
        schemeInsList:'',
        nullVal:false
      }
    },
    async created (){

    },
    mounted () {
    },
    methods: {
      infiniteHandler($state) {
        setTimeout(async () => {
          let params = {
            'schemeId': this.$route.params.id,
            'pageSize':5,
            'currentPage':1
          }
          const res = await api.post('doctorScheme/getSchemeModelUser.do', params)
          if (res.data.stateCode === '001') {
            this.schemeInsList = res.data.schemeInsList;
            console.log(res.data.schemeInsList)

            if(res.data.schemeInsList.length != 0){
              this.nullVal = false

            } else {
              this.nullVal = true
            }

            $state.complete();
            // this.nowCode = res.data.validateCode
          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.loaded();
        },1000)
      }
    },
    components: {
      InfiniteLoading
    },
    filters: {
      'nullSex':function(value){
        if(!value) { return '-'}
        return value
      }
    }

  }
</script>


<style lang="less" >
  .user-patient-list-wrap {
    .no-more-data{
      color: #ccc;
    }
    .nulltext{
      padding: 3rem;
      font-size: 1.4rem;
      color: #ccc;
      text-align: center;
    }
  .user-patient-list-main {

    margin-top: 5.5rem;
  & > div {
      background: #fff;
      padding: 1.5rem 0 0 1.5rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    float: left;
    margin-right: 1rem;
  }
  dl {
    float: left;
    border-bottom: 1px solid #d9d9d9;
    width: 86%;

  dt {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: #333333;
  span{
    font-size: 1.2rem;
    color: #999;
  &:first-of-type{
     margin-left: 1rem;
   }
  &:last-of-type{
     float:right;
     margin-right: 1.5rem;
   }
  }
  }

  dd {
    margin-bottom: 1.5rem;
  span {
    color: #ff9b0d;
    font-size: 1.2rem;
  }
  .mt-progress {
    width: 40%;
    float: right;
    margin-top: .8rem;
    margin-right: 1.5rem;
    position: inherit;
    height: auto;
  .mt-progress-runway {
    border-radius: 1rem
  }
  .mt-progress-progress {
    border-radius: 1rem;
    background: #ff9b0d
  }
  }
  }
  }
  }
   > div:last-child{
     dl{
       border: none;
     }
   }
  }
  }


</style>
