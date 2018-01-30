<template>
  <div class="workbench_con">
    <headerBar title="健康由我　医生助手"></headerBar>
    <div class="workbench_btn">
      <router-link to="/MyAssess">
        <mt-button type="primary">我的评估</mt-button>
      </router-link>
      <router-link to="/PlanList">
        <mt-button type="primary">我的方案</mt-button>
      </router-link>
    </div>
    <div class="programme_con">
      <mt-navbar class="page-part" v-model="tabSelected">
        <mt-tab-item id="1">进行中</mt-tab-item>
        <mt-tab-item id="2">已完成</mt-tab-item>
      </mt-navbar>


      <!-- tab-container -->
      <mt-tab-container v-model="tabSelected">
        <mt-tab-container-item id="1">
          <!--<loading v-show="loading == 0"></loading>-->
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无进行中的方案" v-if="nullValConduct"></NoData>
          <div class="ProgrammeList_con" v-for="(programme, index) in UnfinishedNew">
            <h4 @click="openOrclose(index, UnfinishedNew)"> {{ programme.schemeName }} <i class="icon iconfont"
                                                                                          :class="programme.type === '0' ?'icon-jiantou':'icon-chevron-copy-copy-copy-copy-copy'"></i>
            </h4>
            <ul class="ProgrammeList" v-show="programme.type == 1">
              <li v-for="vals in programme.data">
                <router-link :to="'plandetails'+ vals.schemeInsId ">
                  <img :src="vals.memberImg" alt="">
                  <div class="progra_infor">
                    <h5>{{ vals.memberName }}<span v-show="!vals.memberSex==''">{{  vals.memberSex  }}</span> <span v-show="!vals.memberAge==''">{{ vals.memberAge + '岁' }}</span> <span
                      class="cycle">{{ vals.doRatio }}个周期</span></h5>
                    <div class="Speed"><span>进度 {{ vals.doRatio + '%' }}</span>
                      <mt-progress :value="parseInt(vals.doRatio)" :bar-height="10"></mt-progress>
                    </div>
                  </div>
                </router-link>
              </li>

            </ul>
          </div>
          <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullValConduct">
            <span slot="no-more" class="no-more-data">——没有更多啦——</span>
          </infinite-loading>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无已完成的方案" v-if="nullValcomplete"></NoData>
          <div class="ProgrammeList_con" v-for="(programme, index) in CompletedNew">
            <h4 @click="openOrclose(index, CompletedNew)"> {{ programme.schemeName }} <i class="icon iconfont"
                                                                                         :class="programme.type === '0' ?'icon-jiantou':'icon-chevron-copy-copy-copy-copy-copy'"></i>
            </h4>
            <ul class="ProgrammeList" v-show="programme.type == 1">
              <li v-for="vals in programme.data">
                <router-link :to="'plandetails'+vals.schemeInsId">
                  <img :src="vals.memberImg" alt="">
                  <div class="progra_infor">
                    <h5>{{ vals.memberName }} <span>{{ vals.memberSex + ' ' + vals.memberAge + '岁' }}</span> <span
                      class="cycle">{{ vals.doRatio }}个周期</span></h5>
                    <div class="Speed"><span>进度 {{ 100 + '%' }}</span>
                      <mt-progress :value="100" :bar-height="10"></mt-progress>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <footerBar selectedVal="Workbench"></footerBar>
  </div>
</template>

<script>
  import api from './fetch/api'
  import InfiniteLoading from 'vue-infinite-loading';

  export default {
    data() {
      return {
        tabSelected: '1',
        //已完成方案(未转格式)
        Completed: [],
        //已完成方案(转格式)
        CompletedNew: [],
        //未完成方案
        Unfinished: [],
        //未完成方案(转格式)
        UnfinishedNew: [],
        loading: 0,
        doRatio: '',

        nullValConduct: false,
        nullValcomplete: false,
      }
    },
    async created() {
      console.log(parseInt(this.ceshi))
    },
    methods: {
      openOrclose: function (indexNum, dataType) {
        if (dataType[indexNum].type === '0') {
          dataType[indexNum].type = '1'
        } else {
          dataType[indexNum].type = '0'
        }
      },
      infiniteHandler($state) {
        setTimeout(async () => {
          let params = {
            'doctorId': localStorage.getItem('doctorId')
          }
          const res = await api.post('doctorScheme/listScheme.do', params)
          if (res.data.stateCode === '001') {
            var workbenLength = res.data.doctorSchemeInsList;
            console.log(workbenLength)
            for (var i = 0; i < workbenLength.length; i++) {
              if (workbenLength[i].finishStatus == 0) {
                this.Unfinished.push(workbenLength[i])
              } else {
                this.Completed.push(workbenLength[i])
              }
            }

            var map = {}
            for (var i = 0; i < this.Completed.length; i++) {
              var ai = this.Completed[i];
              if (!map[ai.schemeId]) {
                this.CompletedNew.push({
                  schemeName: ai.schemeName,
                  type: '0',
                  schemeId: ai.schemeId,
                  data: [ai]
                });
                map[ai.schemeId] = ai;
              } else {
                for (var j = 0; j < this.CompletedNew.length; j++) {
                  var dj = this.CompletedNew[j];
                  if (dj.schemeId == ai.schemeId) {
                    dj.data.push(ai);
                    break;
                  }
                }
              }
            }


            var map2 = {}
            for (var i = 0; i < this.Unfinished.length; i++) {
              var ai = this.Unfinished[i];
              if (!map2[ai.schemeId]) {
                this.UnfinishedNew.push({
                  schemeName: ai.schemeName,
                  type: '0',
                  schemeId: ai.schemeId,
                  data: [ai]
                });
                map2[ai.schemeId] = ai;
              } else {
                for (var j = 0; j < this.UnfinishedNew.length; j++) {
                  var dj = this.UnfinishedNew[j];
                  if (dj.schemeId == ai.schemeId) {
                    dj.data.push(ai);
                    break;
                  }
                }
              }
            }

            if (this.UnfinishedNew.length === 0) {
              this.nullValConduct = true
            }
            ;
            if (this.CompletedNew.length === 0) {
              this.nullValcomplete = true
            }

            // this.nowCode = res.data.validateCode
          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.complete();
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
  .workbench_con {
    .no-more-data{
      color: #ccc;
    }
    padding: 5.4rem 0;
    .workbench_btn {
      padding: 1rem;
      display: flex;
      justify-content: center;
      a {
        display: block;
        width: 48%;
        margin-left: 4%;
        button {
          width: 100%;
          height: 7rem;
          border: none;
          box-shadow: none;
          font-size: 1.8rem;
        }
      ;
      }
      a:first-child {
        margin-left: 0
      }
      a:nth-child(1) button {
        background: #67c3fd url('../../static/img/Workbench_img_06.png') 80% no-repeat;
        -webkit-background-size: 30%;
        background-size: 25%;
      }
      a:nth-child(2) button {
        margin-right: 0;
        background: #6be07e url('../../static/img/Workbench_img_03.png') 80% no-repeat;
        -webkit-background-size: 30%;
        background-size: 23%;
      }

    }

    .programme_con {
      height: auto;
      .mint-navbar {
        border-bottom: solid 1px #d9d9d9;
        .mint-tab-item {
          color: #666666;
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
      .ProgrammeList_con {
        margin-bottom: 0.6rem;
        background: #fff;
        h4 {
          font-size: 1.5rem;
          padding: 1.5rem;
          border-bottom: solid 1px #d9d9d9;
          .icon {
            float: right;
            color: #ccc;
          }
        }
        .ProgrammeList {
          display: block;
          padding-left: 2rem;
          li {
            padding: 1.8rem 0;
            border-top: solid 1px #d9d9d9;
            height: auto;
            overflow: hidden;
            img {
              width: 11%;
              height: 3.91rem;
              border-radius: 50%;
              display: block;
              float: left;
            }
            .progra_infor {
              float: left;
              margin-left: 3%;
              width: 80%;
              h5 {
                font-size: 1.4rem;
                line-height: 1.4rem;
                margin-bottom: 0.9rem;
                span {
                  font-size: 1.2rem;
                  margin-left: 10%;
                  color: #999999
                }
                .cycle {
                  float: right
                }
              }
              .Speed {
                font-size: 1.2rem;
                color: #999999;
                height: auto;
                overflow: hidden;
                span {
                  float: left;
                }
                .mt-progress {
                  width: 40%;
                  float: right;
                  margin-top: .8rem;
                  margin-right: 34%;
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
        ;
          li:first-child {
            border: none;
          }
        }
      }
    }
  }

</style>
