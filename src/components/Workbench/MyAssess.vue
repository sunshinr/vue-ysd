<template>
    <div class="MyAssess">
      <HeaderBar3 :title="title" :titleBtnTxt="tBTxt" :titleUrl="tUrl"></HeaderBar3>
      <ul class="list-ul">
        <li class="list-li" v-for="(item, index) in schemeModelList" :key="index">
          <router-link :to="{ path:'/ViewEvaluation', query: { evaluateId:item.doctorEvaluateId} }"><h3>{{item.evaluateTitle}}</h3></router-link>
          <div class="aContent"><span v-if="item.modelType ==1">收藏--{{item.evaluateDoctorName}}</span><span v-else>我的</span>
            <div class="ContentRight">已评估<span>{{item.evaluateDoNumber}}次</span></div>
          </div>
          <router-link :to="{ path:'/CommentSuggest', query: { evaluateId:item.doctorEvaluateId} }"><div class="btn">查看评价结果</div></router-link>
          <div class="li-btn">
            <span @click="goEdit(item.doctorEvaluateId)" v-show="item.modelType == 0"><i class="icon iconfont icon-bi1"></i>编辑</span>
            <span @click="RemovePlan(item, index)" :class=" item.modelType == 0 ? 'bord-l':''"><i class="icon iconfont icon-shanchu"></i>删除</span>
          </div>
        </li>
        <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
          <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
        </infinite-loading>
      </ul>
      <div class="no-data" v-if="nullVal">
      <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无评估" ></NoData>
      </div>
    </div>
</template>
<script>
  import { MessageBox, Toast } from 'mint-ui'
  import api from '../fetch/api'
  import InfiniteLoading from 'vue-infinite-loading'
  export default {
    data () {
      return {
        title: '我的评估',
        tBTxt: '添加',
        tUrl: '/AddEvaluation',
        schemeModelList: '',
        nullVal:false
      }
    },
    methods: {
      goEdit (i) {
        this.$router.push({
          path: '/ModifyEvaluation',
          query: { evaluateId:i}
        })
      },
      RemovePlan (val,index){
        var _this = this;
        console.log(val)
        let params = {
          evaluateId: val.doctorEvaluateId
        }
        MessageBox.confirm('确定执行此操作?').then( async action => {
          const res = await api.post('doctorEvaluate/removeEvaluateIns.do', params)
          if (res.data.stateCode === '001') {
            Toast({
              message: '删除成功',
              position: 'bottom',
              duration: 2000
            });
            _this.schemeModelList.splice(index, 1)
            if(_this.schemeModelList.length < 5){
              this.infiniteHandler()
            }
            if(_this.schemeModelList.length ===0){
              this.nullVal = true
            }
          }
        });

      },
      infiniteHandler($state) {
        console.log(11)
        setTimeout(async () => {

          let params = {
            'doctorId':localStorage.getItem('doctorId'),
          }
          const res = await api.post('doctorEvaluate/evaluateList.do', params)
          console.log(res.data)
          if (res.data.stateCode == '001') {
            this.schemeModelList = res.data.evaluateList

            if(this.schemeModelList.length ===0){
              this.nullVal = true
            }

          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.complete();
          $state.loaded();
        },1000)
      }
    },
    components: {
      InfiniteLoading
    }
  }
</script>
<style lang="less" scoped>
.MyAssess{
  .m-header1{
    padding: 0.5rem 1.5rem 0.4rem !important;
  }
  .no-more-data{
    color: #ccc;
  }
  .list-ul{
    padding:0 1.5rem;
    margin-top:5.5rem;
    overflow: hidden;
    .list-li{
      background: #ffffff;
      -webkit-border-radius: 1rem;
      -moz-border-radius: 1rem;
      border-radius: 1rem;
      overflow: hidden;
      margin-top:0.5rem;
      width:100%;
      h3{
        font-size:1.7rem;
        padding:1.5rem;
      }
      .aContent{
        font-size:1.3rem;
        color: #999999;
        padding:0 1.5rem;
        width:100%;
        .ContentRight{
          float: right;
          span{
            color: #ff9b0d;
            margin-left: 0.4rem;
          }
        }
      }
      .btn{
        width: 90%;
        text-align: center;
        padding: 1.2rem 0;
        font-size: 1.5rem;
        color: #10d1a0;
        border-radius: 0.4rem;
        border: solid 1px #10d1a0;
        margin-left: 5%;
        margin-top: 1.6rem;
      }
      .li-btn{
        width:100%;
        padding:1.2rem 0;
        border-top: solid 1px #d9d9d9;
        margin-top: 1.5rem;
        display: flex;
        span{
          display: inline-block;
          width:100%;
          font-size:1.5rem;
          color: #10d1a0;
          text-align: center;
          i{
            font-size: 1.9rem;
            margin-right:0.4rem;
            vertical-align: inherit;
          }
        }
        span:first-of-type{
          border-right:solid 1px #d9d9d9;
        }
      }
    }
  }
}
.no-data{
  padding-top: 8rem;
}
</style>
