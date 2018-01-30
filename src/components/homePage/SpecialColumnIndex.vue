<template>
  <div class="SpecialColu_con">
    <headerBar3 title="专栏"></headerBar3>
    <ul class="programme_list" v-if="!columnsListStatus">

      <li v-for="columns in columnsList" :key="columns.id">
        <div>
          <div class="head">
            <img :src="columns.doctorPicture" alt="">
            <h3>{{ columns.doctorName }}</h3>
            <mt-button type="danger" plain @click="columnsFn(columns.doctorInId,columns.followStatus)"
                       v-text="columns.followStatus===0 ? '+关注':'已关注'"
                       :class="{active:columns.followStatus===1}"></mt-button>
          </div>

          <div @click="goSpecialColumnDetails(columns.columnId)">
            <p class="programme_name">{{ columns.title }}</p>
            <p class="text_con">{{ columns.synopsis }}
            </p>
          </div>
        </div>
        <div>
          <div class="Assessment_num">
            <router-link to="#"><i class="icon iconfont icon-shoucang1"></i>最近更新：{{ columns.newKnowledgeName }}
            </router-link>
          </div>
          <div class="Assessment_num">
            <span v-if=" columns.keywords.length>0">
                   <a v-for="columns_label in columns.keywords" :key="columns_label"><i
                     class="icon iconfont icon-biaoqian"></i>{{ columns_label }}
                   </a>
               </span>
            {{ columns.followNum }}人关注


          </div>
        </div>
      </li>
    </ul>

    <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无专栏" v-if="columnsListStatus"></NoData>

    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!columnsListStatus">
      <span slot="no-more">
             ——没有更多啦——
      </span>
    </infinite-loading>
  </div>
</template>


<script>
  import loading from '../common/loading.vue'
  import api from '../fetch/api'
  import { Toast, MessageBox } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        columnsList: '',
        loading: 0,
        columnsListStatus: false, // 没有数据状态
        countRecord: 0, // 数据总条数
        pageSize: 2 // 页面加载俩条数据
      }
    },
    created () {
      this.getColumnList()
    },
    methods: {

      // 获取专栏数据
      async getColumnList () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: 1,
          showCount: this.pageSize,
        }
        const res = await api.post('column/getColumnList.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.columnsList = res.data.columnsList
          console.log(res.data)
          this.countRecord = res.data.totalCount
          this.countRecord < 1 ? this.columnsListStatus = true : this.columnsListStatus = false

          this.loading = 1
          // this.nowCode = res.data.validateCode
        } else if (res.data.stateCode === '002') {
          console.log('参数异常')
        } else {
          console.log('系统错误')
        }
      },
      // 加载更多
      async infiniteHandler ($state) {

        setTimeout(() => {
          if (this.pageSize > this.countRecord) {
            $state.complete()

          } else {
            if (this.countRecord === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 2
            }
          }
        }, 1000)
      },
      // 跳转专栏详情
      goSpecialColumnDetails (id) {
        this.$router.push({
          path: '/SpecialColumnDetails',
          query: {
            columnsId: id
          }
        })
      },
      // 关注和取消关注
      columnsFn (id, status) {
        var columnsStatus = null
        if (status === 0) {
          columnsStatus = 1
        } else {
          columnsStatus = 0
        }
        this.columnsChangeStatus(id, columnsStatus)
      },
      async columnsChangeStatus (id, status) {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          doctorInfoId: id,
          requestType: status,
        }
        var _this = this
        const columnsRes = await api.post('column/attentionDoctor.do', params)
        if (columnsRes.data.stateCode === '001') {
          if (status === 1) {
            MessageBox.alert(columnsRes.data.message).then(function () {
              _this.getColumnList()
            })
          } else {
            MessageBox.confirm('是否要取消关注该医生').then(function () {
              MessageBox.alert(columnsRes.data.message).then(function () {
                _this.getColumnList()
              })
            })
          }
        }
      }
    },
    components: {
      loading: loading,
      Toast,
      MessageBox,
      InfiniteLoading
    }
  }
</script>

<style lang="less">
  .SpecialColu_con {
    padding: 5.4rem 0 0;

  .programme_list {
    height: auto;
    padding: 1rem;

  li {

    background: #fff;
    border-radius: 1.2rem;
    margin-bottom: 1rem;

  > div {
    padding: 1.8rem;
  }

  > div:first-child {
    border-bottom: solid 1px #d9d9d9;
  }

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
    font-size: 1.6rem;
  }

  .mint-button {
    float: right
  }

  .is-plain {
    border: solid 1px #10d1a0;
    color: #10d1a0;
    padding: 0.6rem 2rem;
    height: auto;
    font-size: 1.6rem;
    margin-top: 0.5rem;
  }

  .active {
    color: rgb(128, 128, 128);
    background: rgb(235, 235, 235);
    border: solid 0px #10d1a0;
  }

  }
  .programme_name {
    margin-top: 0.5rem;
    font-size: 1.8rem;
    padding: 1rem 0;

  span {
    float: right;
    color: #999999;
  }

  }
  .text_con {
    font-size: 1.5rem;
    color: #999999;
    line-height: 2.4rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .Assessment_num {
    text-align: right;
    font-size: 1.4rem;
    color: #00ca97;
    height: auto;
    overflow: hidden;

  a {
    float: left;
    color: #999;

  .icon {
    margin-right: 0.6rem;
    color: #ff9b0d;
  }

  }
  }
  .Assessment_num:first-child {
    margin-bottom: 1rem;
    text-align: left;

  span {
    color: #000;
  }

  }
  }
  }
  }
</style>

