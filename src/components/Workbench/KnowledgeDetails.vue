<template>
  <div class="knowledge-details-wrap" id="white-background">
    <HeaderBar3 title="知识详情"></HeaderBar3>

    <h3 class="knowledge-details-title">{{articleDetail.name}}</h3>
    <dl>
      <dt class="clear"><img :src="articleDetail.doctorPic"> {{articleDetail.doctorName}} <span>回答</span> <span>{{$WhiteBackground.timeFn(articleDetail.createTime)}}</span></dt>
       <dd v-html="articleDetail.content">
       </dd>
    </dl>

    <ul class="clear knowledge-nav-wrap">
      <li @click="scFn()"><i class="icon  iconfont "  :class="articleDetail.collectStatus === 1 ? 'icon-shoucang ' :'icon-shoucang1 active'" ></i>{{articleDetail.collectNum}}
      </li>
      <li @click="dzFn()"><i class="icon iconfont "  :class="articleDetail.likeStatus === 1 ? 'icon-xihuan1' :'icon-xihuan likeactive'"></i>{{articleDetail.likeNum}}</li>
      <li  @click="comment()"><i class="icon iconfont icon-pinglun"></i>{{articleDetail.commentNum}}</li>
      <li><i class="icon iconfont icon-fenxiang" @click="share"></i></li>
    </ul>

    <transition name="mask-fade">
      <div class="mask" v-show="isShow"></div>
    </transition>

    <transition name="share-fade">
      <div class="share_con" v-show="isShow">
        <h3>分享至</h3>
        <ul class="clear">
          <li>
            <a class="icon iconfont icon-sharemoments">
              <p>朋友圈</p>
            </a>
          </li>
          <li>
            <a class="icon iconfont icon-weixinhaoyou">
              <p>微信好友</p>
            </a>
          </li>
        </ul>
        <div class="cancel" @click="sClose()">取消</div>
      </div>
    </transition>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        sc: true,
        dz: true,
        isShow: false,
        articleDetail: {}
      }
    },
    created () {
    },
    mounted: function () {
      this.$WhiteBackground.whiteBg()
      this.loadApi()
    },
    methods: {
      async loadApi () {
        let params = {
          knowledgeId: this.$route.query.id,
          doctorId: localStorage.getItem('doctorId')
        }
        const res = await this.$api.post('column/getColumnKnowledgeInfo.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.articleDetail = res.data.knowledge
        }
      },
      async scFn () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.query.id,
          type: 2 // 收藏的专栏知识
        }
        const res = await this.$api.post('basic/mark.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.loadApi()
        }
      },
      async dzFn () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          Id: this.$route.query.id,
          type: 2 // 知识点赞
        }
        const res = await this.$api.post('basic/helpful.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.loadApi()
        }
      },
      share () {
        this.isShow = true
      },
      sClose () {
        this.isShow = false
      },
      comment () {
        this.$router.push({
          path: '/comment',
          //query: {id: this.articleDetail.knowledgeId, type: this.articleDetail.type}
          query: {id: this.articleDetail.knowledgeId, type: 2}
        })
      }
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less">
  body, html {
    height: 100%;
  }

  .knowledge-details-wrap {
    padding: 5.5rem 0 4.5rem;
    overflow: auto;

  .knowledge-details-title {
    font-size: 1.8rem;
    color: #333;
    padding: 2rem;
    line-height: 2.8rem;
  }

  dl {
    padding: 0 2rem;

  dt {
    font-size: 1.3rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin-right: 0.8rem;

  }

  span {
    color: #999999;
    margin-left: 0.5rem;

  &:last-of-type {
    float: right;
    position: relative;
    top: 0.7rem;

  }

  }

  }
  dd {
    color: #333;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  }
  .knowledge-nav-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;

  li {
    float: left;
    margin: 0 2rem;
    padding: 1.1rem 0;
    font-size: 1.4rem;
    color: #999999;

  .iconfont {
    font-size: 2rem;
    position: relative;
    top: 0.25rem;
    margin-right: 0.5rem;

  }

  .active {
    color: #ff9313;
  }
  .likeactive{
    color: #ff5c36;
  }

  &:last-of-type {
    float: right;
  }

  }
  }
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    z-index: 1;
  }

  .mask-fade-enter-active, .mask-fade-leave-active {
    transition: opacity .5s;
  }

  .mask-fade-enter, .mask-fade-leave-active {
    opacity: 0;
  }

  .share_con {
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 4px 4px 0 0;
    position: fixed;
    transition: 0.3s;
    z-index: 10;
    bottom: 0;
  }

  .share_con h3 {
    font-size: 1.4rem;
    text-align: center;
    padding: 2rem;
    font-weight: 500;
  }

  .share_con ul {
    text-align: center;
  }

  .share_con ul li {
    width: 50%;
    float: left;

  a {
    display: inline-block;
    font-size: 3rem;
    color: #5ccb6b;
  }

  }
  .share_con ul li p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #8f8f94;
    margin-top: 1rem;
  }

  .cancel {
    border-top: solid 1px #e4e4e4;
    display: block;
    padding: 1.4rem;
    text-align: center;
    margin-top: 1.6rem;
    font-size: 1.3rem;
  }

  .share-fade-enter-active {
    bottom: 0;
  }

  .share-fade-enter, .share-fade-leave-active {
    bottom: -20rem;
  }

  }
</style>
