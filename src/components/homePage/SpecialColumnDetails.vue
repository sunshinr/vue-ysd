<template>
  <div class="SpecialCoDet">
    <headerBar4 :headUrl="headUrl"></headerBar4>
    <div class="Title">
      <div class="clear">
        <h1 v-text="columnsTitle.title"></h1>
        <mt-button type="danger" plain @click="columnsFn(columnsTitle.doctorInId,columnsTitle.followStatus)"
                   v-text="columnsTitle.followStatus===0 ? '+关注':'已关注'"
                   :class="columnsTitle.followStatus===1? 'active':''"></mt-button>
      </div>


      <p v-text="columnsTitle.synopsis"></p>
      <div class="label_con clear">
        <i class="icon iconfont icon-biaoqian"></i><span v-for="j in columnsTitle.keywords" v-text="j"></span> <span
        class="followNum" v-text="columnsTitle.followNum+'人关注'"></span>
      </div>
    </div>

    <!--专栏列表容器-->
    <ul class="specia_list_con" v-if="!columnsListStatus">
      <li v-for="(item,index) in columnsList" @click="goPath(item.infotype,item.knowledgeId)">
        <h1 v-text="item.name"></h1>
        <img class="coverImg" :src="item.cover">
        <!--<video
          src="http://59.49.85.11/variety.tc.qq.com/AqH5HjC3awb3czmg3HqpkALyzyj2NOtiMDIUPgQsRP70/p0200bz5hhz.p201.1.mp4?vkey=9FCBA5098FF6D1F282BE8C6AD5AF97EE82C1865EE77163D6F93BF56F371893B8E3B315AA50D378FCA79CB6E21F4DEAB52FC0A23B107A998EBD95AD37E7880756EF26ECDFC5B0341A530B987604981A38477F96823F1EFCDE&amp%3bplatform=10201&amp%3bsdtfrom=&amp%3bfmt=shd&amp%3blevel=0&locid=d7dd8f19-6ddc-422d-9882-6ca81e66d81a&size=2544283&ocid=325588396"
          controls="false" class="video_paused"></video>-->
        <p v-text="item.synopsis"></p>
        <div class="Fabulous_comment">
          <span v-text="'收藏 '+ item.collectNum"></span>
          <span v-text="'评论 '+ item.commentNum"></span>
          <span v-text="'有用 '+ item.likeNum"></span>
          <span class="time" v-text="$WhiteBackground.timeFn(item.createTime)"></span>
        </div>
      </li>

    </ul>
    <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无专栏文章" v-if="columnsListStatus"></NoData>

    <infinite-loading @infinite="infiniteHandler" spinner="waveDots" v-if="!columnsListStatus">
      <span slot="no-more">
             ——没有更多啦——
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import { Button, Toast, MessageBox } from 'mint-ui'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        columnId: this.$route.query.columnsId,
        columnsList: [],
        columnsTitle: [],
        buttonText: '+关注',
        buttonStatus: false,
        headUrl: {
          imgurl: '',
          name: '',
          color: 1
        },
        columnsListStatus: false,
        countRecord: 0, // 数据总条数
        pageSize: 2 // 页面加载俩条数据
      }
    },
    components: {
      Toast, MessageBox, InfiniteLoading, 'mt-button': Button
    },
    async created () {
      this.getKnowLedgeList()
      this.getColumnTitle()
    },
    methods: {
      async getColumnTitle () {
        let titleParam = {
          doctorId: localStorage.getItem('doctorId'),
          columnId: this.columnId
        }
        let titleRes = await this.$api.post('column/getColumnTitle.do', titleParam)
        if (titleRes.data.stateCode === '001') {
          this.columnsTitle = titleRes.data.Column
          // console.log(this.columnsTitle)
          this.headUrl.name = this.columnsTitle.doctorName
          this.headUrl.imgurl = this.columnsTitle.doctorPicture
        }
      },
      async getKnowLedgeList () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          currentPage: 1,
          showCount: this.pageSize,
          columnId: this.columnId,
          typeId: 1
        }
        const res = await this.$api.post('column/getKnowLedgeList.do', params)

        if (res.data.stateCode === '001') {
          this.columnsList = res.data.knowledgeList
          console.log(res.data)
          this.countRecord = res.data.countRecord

          console.log(this.columnsList)
          if (this.columnsListStatus.length > 0) {
            this.columnsListStatus = true
          }

        }
      },
      infiniteHandler ($state) {
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

      goPath (type, id) {
        if (type === 1) {
          this.$router.push({
            path: '/KnowledgeDetails',
            query: {
              id: id
            }
          })
        } else {
          this.$router.push({
            path: '/playVideo/' + id
          })
        }
      },
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
        let _this = this
        const columnsRes = await this.$api.post('column/attentionDoctor.do', params)
        if (columnsRes.data.stateCode === '001') {
          if (status === 1) {
            MessageBox.alert(columnsRes.data.message).then(function () {
              _this.getColumnTitle()
            })
          } else {
            MessageBox.confirm('是否要取消关注该医生').then(function () {
              MessageBox.alert(columnsRes.data.message).then(function () {
                _this.getColumnTitle()
              })
            })
          }
        }
      },
      /*    // 收藏
          async Collection (id) {
            let params = {
              Id: id,
              type: 2,
              doctorId: 1
            }
            let res = await this.$api.post('basic/mark.do', params)
            if (res.data.stateCode == '001') {
              Toast(res.data.message)
              this.getKnowLedgeList()
            }
          },
          // 有用
          async Like (id) {
            let params = {
              Id: id,
              type: 2,
              doctorId: 1
            }
            let res = await this.$api.post('basic/helpful.do', params)
            if (res.data.stateCode == '001') {
              Toast(res.data.message)
              this.getKnowLedgeList()
            }
          },
          // 评论
          goComment (id) {
            this.$router.push({
              path: '/comment',
              query: {id: id, type: 2}
            })
          },*/
    },
    mounted () {

//      视频播放暂停切换
      for (var i = 0; i < $('.video_con').length; i++) {
        (function (i) {
          document.getElementsByClassName('video_play')[i].onclick = function () {
            for (var n = 0; n < $('.video_con').length; n++) {
              document.getElementsByClassName('video_paused')[n].pause()
              $('.video_play_num').fadeIn(100)
            }
            document.getElementsByClassName('video_paused')[i].play()
            $(this).parent().fadeOut(100)
          }
          document.getElementsByClassName('video_paused')[i].onclick = function () {
            document.getElementsByClassName('video_paused')[i].pause()
            $(this).prev().fadeIn(100)
          }
          document.getElementsByClassName('video_paused')[i].addEventListener('ended', function () {
            $('.video_play_num').fadeIn(100)
          })
        })(i)
      }
    }
  }
</script>

<style lang="less">
  .SpecialCoDet {
    padding: 5.4rem 0 0;

  .Title {
    margin-top: 0.6rem;
    background: #fff;

  .active {
    color: #808080 !important;
    background: #ebebeb !important;
    border: none !important;
  }

  h1 {
    padding: 1.5rem;
    padding-bottom: 0;
    font-size: 1.8rem;
    height: auto;
    overflow: hidden;
    width: 76%;
    float: left;
  }

  .mint-button--danger {
    float: left;
    margin-top: 1.5rem;
  }

  .mint-button {
    height: 3rem;
    font-size: 1.6rem;
  }

  .is-plain {
    color: #10d1a0;
    border: 1px solid #10d1a0;
  }

  p {
    font-size: 1.6rem;
    padding: 1.5rem;
    line-height: 2.4rem;
    color: #666666;
  }

  .label_con {
    display: block;
    margin-left: 1.5rem;
    border-top: solid 1px #d9d9d9;
    padding: 1.5rem;
    padding-left: 0;
    font-size: 1.4rem;

  span {
    color: #666666;
    margin-left: 1rem;
  }

  .followNum {
    color: #10d1a0;
  }

  .icon {
    color: #ff9313;
  }

  .followNum {
    float: right;
  }

  }
  }
  .specia_list_con {
    padding-left: 1.5rem;
    margin-top: 0.6rem;
    background: #fff;

  li {
    border-top: solid 1px #d9d9d9;

  h1 {
    padding: 1.5rem 0;
    padding-bottom: 0;
    font-size: 1.8rem;
    height: auto;
    overflow: hidden;
  }

  .coverImg {
    margin-top: 1.5rem;
    width: 95%;
    margin-right: 1.5rem;
    border-radius: 0.4rem
  }

  .video_con {
    width: 95%;
    margin-top: 1.5rem;
    overflow: hidden;
    position: relative;

  .video_play_num {
    height: 100%;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;

  .icon {
    font-size: 6.6rem;
    color: #fff;
    display: inline-block;
    margin-top: 6.5rem;
  }

  span {
    position: absolute;
    bottom: 0;
    color: #ffffff;
    width: 100%;
    display: block;
    padding: 1rem;
    font-size: 1.2rem;
    text-align: left;
  }

  }
  video {
    width: 100%;
    height: 100%;
    display: block;
  }

  video::-webkit-media-controls {
    display: none !important;
  }

  }

  p {
    font-size: 1.6rem;
    padding: 1.5rem 0;
    padding-bottom: 0;
    line-height: 2.4rem;
    color: #333333;
    padding-right: 1.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .Fabulous_comment {
    font-size: 1.4rem;
    padding: 1.5rem 0;

    line-height: 2.4rem;
    color: #bbbbbb;

  span {
    margin-right: 1rem;
  }

  .time {
    float: right;
    margin-right: 1.5rem;
  }

  }
  }
  li:first-child {
    border: none
  }

  }
  }
</style>

