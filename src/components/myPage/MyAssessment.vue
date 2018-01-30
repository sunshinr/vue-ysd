<template>
  <div class="assessment">
    <HeaderBar3 :title="title"></HeaderBar3>
    <ul>
      <li class="list" @click="assessmentDetail(item.consultID)" v-for="(item,index) in consultBasicList" :key="index">
        <img :src="item.memberImg" alt="">
        <div class="listRight">
          <h4>{{item.memberName}}
            <span>
              <i class="icon iconfont icon-xing" v-for="(i,ind) in 5" v-if="ind<startNum(item.score)"></i>

            {{item.score}}分
            </span>
          </h4>
          <p>{{item.appraise}} <span v-text="$WhiteBackground.timeFn(item.timeDate)"></span></p>
        </div>
      </li>

    </ul>
    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!nullVal">
      <span slot="no-more" class="no-more-data" >——没有更多啦——</span>
    </infinite-loading>

    <div class="no-data" v-if="nullVal">
      <NoData imgUrl="/static/images/nodata/null7.png" hintTxt="暂无评价"></NoData>
    </div>

  </div>
</template>
<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: '',
    data () {
      return {
        title: '我的评价',
        consultBasicList: [],
        nullVal: false,
        pageSize: 5,
        total: 0
      }
    },
    mounted () {
    },
    methods: {
      assessmentDetail (id) {
        this.$router.push({
          path: '/assessmentDetails',
          query: {
            consultId: id
          }
        })
      },
      // 加载更多数据
       infiniteHandler($state) {
        setTimeout(async () => {
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            currentPage: this.pageSize,
            pageSize: 1,
          }
          const res = await this.$api.post('personalCenter/findConsultsOfIdList.do', params)

          if (res.data.stateCode === '001') {
            this.consultBasicList = res.data.consultBasicList
            this.total = res.data.total
            console.log(this.total)
            this.total < 1 ? this.nullVal = true : this.nullVal = false
            $state.complete();

            if (this.pageSize > this.total) {
              $state.complete()
            } else {
              if (this.countRecord === '0') {
                alert(2)
                $state.complete()
              } else {
                alert(3)
                $state.loaded()
                this.pageSize += 5
              }
            }


          } else if (res.data.stateCode === '002') {
            console.log('参数异常')
          } else {
            console.log('系统错误')
          }
          $state.loaded();
        }, 1000)
      },
      startNum (num) {
        if (num <= 0) {
          return 0
        } else if (num <= 2) {
          return 1
        } else if (num <= 4) {
          return 2
        } else if (num <= 6) {
          return 3
        } else if (num <= 8) {
          return 4
        } else if (num <= 10) {
          return 5
        }
      }
    },
    components: {InfiniteLoading},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .assessment {
    .no-more-data{
      color: #ccc;
    }
  ul {
    margin-top: 6rem;
    background: #ffffff;
    overflow: hidden;

  .list {
    overflow: hidden;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-bottom: solid 1px #d9d9d9;

  img {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
  }

  .listRight {
    float: right;
    width: 80%;

  h4 {
    font-size: 1.6rem;

  span {
    float: right;
    font-size: 1.4rem;
    color: #ff9313;

  i {
    font-size: 1.5rem;
  }

  }
  }
  p {
    color: #999999;
    font-size: 1.4rem;
    margin-top: 0.6rem;

  span {
    float: right;
  }

  }
  }
  }
  }
  }
  .no-data {
    padding-top: 8rem;
  }
</style>
