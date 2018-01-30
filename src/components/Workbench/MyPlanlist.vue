<template>
  <div class="MyAssess">
    <HeaderBar3 :title="title" :titleBtnTxt="tBTxt" :titleUrl="tUrl"></HeaderBar3>


          <ul class="list-ul">
          <li class="list-li list-item" v-for="(ModelList, index) in schemeModelList" v-bind:key="index">
            <router-link :to="'/ProgrammeDetails'+ ModelList.schemeId">
              <h3>{{ ModelList.schemeName }}</h3>
              <div class="aContent"><span v-if="ModelList.modelType == 0">我的</span><span v-else>收藏—{{ ModelList.doctorName }}</span>
                <div class="ContentRight">已评估<span>{{ ModelList.schemeDoNum }}次</span></div>
              </div>
            </router-link>
            <router-link :to="'/PatientList'+ ModelList.schemeId"><div class="btn">查看使用患者</div></router-link>
            <div class="li-btn">
              <span v-show="ModelList.modelType == 0"> <router-link :to="'/EditSchemaTemplate'+ModelList.schemeId" class="br-n" ><i class="icon iconfont icon-bi1"></i>编辑</router-link></span>
              <span @click="RemovePlan(ModelList, index)" :class=" ModelList.modelType == 0 ? 'bord-l':''"><i class="icon iconfont icon-shanchu"></i>删除</span>
            </div>
          </li>
          <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
              <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
          </infinite-loading>
          </ul>
    <div class="no-data" v-if="nullVal">
      <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无方案" ></NoData>
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
        title: '我的方案',
        tBTxt: '添加',
        tUrl: '/AddSchemaTemplate',
        schemeModelList:'',
        loading: false,
        pageSize: 5,
        nullVal:false
      }
    },
    methods: {
      randomIndex: function () {
        return Math.floor(Math.random() * this.items.length)
      },
      add: function () {
        this.items.splice(this.randomIndex(), 0, this.nextNum++)
      },
      remove: function () {
        this.items.splice(this.randomIndex(), 1)
      },
      RemovePlan (val,index){
        var _this = this;
        let params = {
          schemeId: val.schemeId
        }
        MessageBox.confirm('确定执行此操作?').then( async action => {
          const res = await api.post('doctorScheme/removeScheme.do', params)
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

        setTimeout(async () => {
          let params = {
            'doctorId': localStorage.getItem('doctorId'),
            'pageSize': this.pageSize,
            'currentPage':1
          }
          const res = await api.post('doctorScheme/listSchemeModel.do', params)
          if (res.data.stateCode === '001') {
            this.schemeModelList = res.data.schemeModelList;
            console.log(res.data);
            if(this.pageSize > res.data.countRecord){
              this.pageSize += (this.pageSize - res.data.countRecord )
              $state.complete();
            } else {
              $state.loaded();
              this.pageSize += 5
            }

            if(this.schemeModelList.length ===0){
              this.nullVal = true
            }

          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.loaded();
        }, 1000)
      },

    },
    mounted () {
    },
    components: {
      InfiniteLoading
    }
  }
</script>
<style lang="less" scoped>

  .MyAssess{
    .bord-l{
      border-left:solid 1px #d9d9d9;
    }
    .no-more-data{
      color: #ccc;
    }
    .list-item {

      margin-right: 10px;
    }
    .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to
      /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateX(-30px);
    }
    .list-ul{
     // height: 57rem;
      .br-n{
        span{
          border-left: none !important;
        }
      }

      padding:0 1.5rem;
     margin-top: 5.5rem;
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
          border-radius: 0.2rem;
          border: solid 1px #10d1a0;
          margin-left: 5%;
          margin-top: 1.6rem;
        }
        .li-btn{
          width:100%;
          padding:1.2rem 0;
          display: flex;
          border-top: solid 1px #d9d9d9;
          margin-top: 1.5rem;
          span{
            display: inline-block;
            width:100%;
            font-size:1.5rem;
            color: #10d1a0;
            text-align: center;
            a{
              color: #10d1a0;
            }
            i{
              font-size: 1.9rem;
              margin-left:0.4rem;
              vertical-align: text-top;
            }
          }
        }
      }
    }
  }
  .no-data{
    padding-top: 8rem;
  }
</style>
