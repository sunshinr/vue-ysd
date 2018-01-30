<template>
  <div class="concern">
    <HeaderBar3 title="我的关注"></HeaderBar3>

    <ul v-if="concerneArr.length>0">
      <li class="list clear " v-for='(item ,index) in concerneArr'>
        <img :src="item.doctorAvatar">
        <div class="people">
          <h3 v-text="item.doctorName"></h3>
          <p>{{item.dynamicNumber}}条动态*{{item.concernNumber}}人关注</p>
        </div>
        <div class="cBtn" @click="attentionFn(item.doctorId,index)">已关注</div>
      </li>
    </ul>


    <infinite-loading @infinite="infiniteHandler" spinner="waveDots"
                      v-if="!nodeDataStatus">
          <span slot="no-more" class="no-more-data" >
            ——没有更多啦——
          </span>
    </infinite-loading>

    <div class="no-data-wrap" v-if="nodeDataStatus">
      <NoData imgUrl="/static/images/nodata/null6.png" hintTxt="暂无关注" ></NoData>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: '',
    data () {
      return {
        concerneArr: [],
        total: 0,
        nodeDataStatus: false,
        pageSize: 2
      }
    },
    created () {
    },
    async mounted () {
      this.getConcernFn()
    },
    methods: {
      async getConcernFn () {
        const Res = await this.$api.post('column/attentionList.do', {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: this.pageSize,
          pageSize: 1
        })
        this.concerneArr = Res.data.attentions
        this.total = Res.data.total
        this.total < 1 ? this.nodeDataStatus = true : this.nodeDataStatus = false
      },
      // 加载更多数据
      async infiniteHandler ($state) {
        setTimeout(() => {
          if (this.pageSize > this.total) {
            $state.complete()
          } else {
            if (this.total === '0') {
              $state.complete()
            } else {
              $state.loaded()
              this.pageSize += 5
              this.getConcernFn()
            }
          }
          $state.loaded();
        }, 1000)
      },
      attentionFn (id, n) {
        MessageBox.confirm('是否取消关注该医师').then(action => {
          this.cancelAttentionFn(id)
          this.concerneArr.splice(n, 1)
        })
      },
      async cancelAttentionFn (id) {
        var _this = this
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          doctorInfoId: id,
          requestType: 0
        }
        const Res = await this.$api.post('column/attentionDoctor.do', params)
        MessageBox.alert(Res.data.message).then(function () {
          _this.getConcernFn()
          _this.total < 1 ? _this.nodeDataStatus = true : _this.nodeDataStatus = false
        })
      }
    },
    components: {MessageBox, InfiniteLoading},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .concern {
    .no-more-data{
      color: #ccc;
    }
  ul {
    background: #ffffff;
    margin-top: 6rem;

  .list {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    border-bottom: solid 1px #d9d9d9;
    position: relative;
    overflow: hidden;

  img {
    width: 5rem;
    height: 5rem;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    border: solid 1px #dddddd;
  }

  .people {
    float: right;
    width: 80%;

  h3 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1.3rem;
    color: #999999;
    margin-top: 0.5rem;
  }

  }
  .cBtn {
    position: absolute;
    right: 1.5rem;
    top: 2.2rem;
    font-size: 1.4rem;
    color: rgb(128, 128, 128);
    padding: 0.7rem 1.5em;
    border: solid 0px #00cb97;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
    background: rgb(235, 235, 235);
  }

  }
  }
  .no-data-wrap {
    margin-top: 13rem;
  }

  }

</style>
