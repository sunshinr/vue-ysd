<template>
  <div class="programme_con2">
    <headerBar3 title="方案"></headerBar3>
    <div>
      <mt-navbar class="page-part" v-model="tabSelected">
        <mt-tab-item id="1">评估检测</mt-tab-item>
        <mt-tab-item id="2">健康方案</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="tabSelected">
        <mt-tab-container-item id="1">
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无评估检测" v-if="nullValProgramme"></NoData>
          <ul class="programme_list">
            <li v-for="(item, index) in assessmentList" :key="index">
              <router-link :to="{path: '/EvaluationDetails', query: {id: item.evaluateId}}">
                <div class="head">
                  <img :src="item.doctorPic" alt="">
                  <h3>{{item.doctorName}}</h3>
                </div>
                <div class="programme_name">{{item.title}}<span>{{item.questionNumber}}项</span></div>
                <div class="Assessment_num"><span v-show="item.evaluateScore != 0"><img src="/static/images/jinbi.png" alt="">{{item.evaluateScore}}</span>已评估{{item.evaluateNumber}}次</div>
              </router-link>
            </li>
            <infinite-loading @infinite="assessmentHandler" spinner="waveDots" v-if="!nullValProgramme">
              <span slot="no-more" class="no-more-data">——没有更多啦——</span>
            </infinite-loading>
          </ul>

        </mt-tab-container-item>


        <mt-tab-container-item id="2">
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无健康方案" v-if="nullValAssessment"></NoData>
          <ul class="programme_list">

            <li v-for="ModelList in schemeModelList" :key="ModelList.id">
              <router-link :to="'/SystemProgrammeDetails'+ ModelList.sysSchemeId">
                <div class="head">
                  <img :src="ModelList.doctorPic" >
                  <h3>{{ ModelList.doctorName }}</h3>
                </div>
                <div class="programme_name">{{ ModelList.schemeName }} <span>15项</span></div>
                <div class="Assessment_num"><span><img src="/static/images/jinbi.png" alt="">{{ ModelList.schemeScore }}</span>已使用 {{ ModelList.schemeFavNum }}次</div>
              </router-link>
            </li>
            <infinite-loading @infinite="infiniteHandler" spinner="waveDots"  v-if="!nullValAssessment">
              <span slot="no-more" class="no-more-data">——没有更多啦——</span>
            </infinite-loading>
          </ul>

        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>


<script>
  import loading from '../../common/loading.vue'
  import api from '../../fetch/api'
  import InfiniteLoading from 'vue-infinite-loading';
  export default {
    data() {
      return {
        tabSelected: '2',
        schemeModelList: '',
        assessmentList: [],
        loading: 0,
        pageSize:5,
        nullValAssessment:false,
        nullValProgramme:false,
      }
    },
    created() {
      this.infiniteHandler()
    },
    watch: {
      tabSelected: function (nowVal, oldVal) {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (nowVal == 1) {
           this.assessmentHandler()
        } else {
           this.infiniteHandler()
        }
      }
    },
    methods: {
      infiniteHandler($state) {
        setTimeout(async() => {
          let params = {
            'doctorId': localStorage.getItem('doctorId'),
            'pageSize': this.pageSize,
            'currentPage': 1
          }
          const res = await api.post('systemScheme/schemeList.do', params)
          if (res.data.stateCode === '001') {
            this.schemeModelList = res.data.systemSchemeList;
            console.log(res.data);
            if (this.pageSize > res.data.countRecord) {
              this.pageSize += (this.pageSize - res.data.countRecord)
               $state.complete();
            } else {
              this.pageSize += 5
              $state.loaded();
            }
          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
         console.log(this.schemeModelList.length,this.assessmentList.length)
          if(this.schemeModelList.length === 0){
            this.nullValAssessment = true
          } else {
            this.nullValAssessment = false
          }
          if(this.assessmentList.length === 0){
            this.nullValProgramme = true
          } else {
            this.nullValProgramme = false
          }
          $state.loaded();
        }, 1000)
      },
      assessmentHandler ($state) {
        setTimeout(async() => {
          let params = {
            'doctorId': localStorage.getItem('doctorId'),
            'pageSize': this.pageSize,
            'currentPage': 1
          }
          const res = await api.post('systemEvaluate/evaluateList.do', params)
          if (res.data.stateCode === '001') {
            this.assessmentList = res.data.systemEvaluateList;
            console.log(res.data);
            if (this.pageSize > res.data.countRecord) {
              console.log(this.pageSize, res.data.countRecord)
              this.pageSize += (this.pageSize - res.data.countRecord)
              if(this.assessmentList.length === 0){
                this.nullValProgramme = true
              } else {
                this.nullValProgramme = false
              }

              console.log(this.nullValAssessment)

              $state.complete();
            } else {
              this.pageSize += 5
              $state.loaded();
            }



          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.loaded();
        }, 1000)
      }
    },
    components: {
      InfiniteLoading
    }
  }
</script>

<style lang="less">
  .programme_con2 {
    padding: 5.4rem 0 0;
    /*mint修改样式start*/
    .page-part {
      position: fixed;
      width: 100%;
      z-index: 999;
    }
    .mint-navbar {
      border-bottom: solid 1px #d9d9d9;
      .mint-tab-item {
        color: #ccc;
      }
      .mint-tab-item-label {
        font-size: 1.6rem;
      }
      .is-selected {
        border-bottom: 3px solid #10d1a0;
        color: #10d1a0;
        margin-bottom: -1px;
      }
    }
    .mint-tab-container {
      top: 5.4rem
    }
    /*mint修改样式end*/
    .programme_list {
      height: auto;
      padding: 1rem;
      li {
        padding: 1.8rem;
        background: #fff;
        border-radius: 1.2rem;
        margin-bottom: 1rem;
        .head {
          height: auto;
          overflow: hidden;
          img {
            height: 4.5rem;
            width: 4.5rem;
            border-radius: 4.5rem;
            float: left;
          }
          h3 {
            height: 4.5rem;
            line-height: 4.5rem;
            float: left;
            margin-left: 1.5rem;
            font-size: 1.4rem;
          }
        }
        .programme_name {
          font-size: 1.6rem;
          padding: 1rem 0;
          span {
            float: right;
            color: #999999;
          }
        }
        .Assessment_num {
          text-align: right;
          font-size: 1.4rem;
          color: #ff9b0d;
          span {
            float: left;
            color: #999;
            img {
              width: 1.6rem;
              margin-right: 0.6rem;
              color: #ff9b0d;
            }
          }
        }
      }
    }
  }
</style>
