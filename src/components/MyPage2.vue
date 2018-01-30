<template>
  <div class="doctorAssisrant">
    <Top :title="title"></Top>
    <div class="infoTop">
      <img :src="doctorInfo.doctorAvatar">
      <div class="imgRight">
        <h3>{{doctorInfo.doctorName}} <span v-text="doctorInfo.doctorType ===0 ? '医生':'' || doctorInfo.doctorType ===1 ? '营养师':'' "></span></h3>
        <div class="classes"><span><img src="../../static/img/kangbi_03.png" alt=""></span>{{doctorInfo.candy}}</div>
        <div class="editBtn">
          <router-link to="/MyInfo">我的信息<span class="icon iconfont icon-jiantou"></span></router-link>
        </div>
      </div>
    </div>
    <ul>
      <li class="list-li">
        <span class="icon iconfont icon-qianbao"></span>
        <router-link to="MyWallet">
          <div class="list-cell">我的钱包
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
      <li class="list-li">
        <span class="icon iconfont icon-shoucang1"></span>
        <router-link to="MyCollection">
          <div class="list-cell">我的收藏
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
      <li class="list-li">
        <span class="icon iconfont icon-yiguanzhutianchong01"></span>
        <router-link to="MyConcern">
          <div class="list-cell">我的关注
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
      <li class="list-li">
        <span class="icon iconfont icon-yiyuandongtai"></span>
        <router-link to="MyDynamic">
          <div class="list-cell">我的动态
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
      <li class="list-li">
        <span class="icon iconfont icon-pingjia1"></span>
        <router-link to="MyAssessment">
          <div class="list-cell">我的评价
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
      <li class="list-li">
        <span class="icon iconfont icon-shezhi"></span>
        <router-link to="Settings">
          <div class="list-cell">设置
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
    </ul>
    <ul class="ul-second">
      <li class="list-li">
        <span class="icon iconfont icon-yijianfankui"></span>
        <router-link to="Feedback">
          <div class="list-cell">意见反馈
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>
   <!--   <li class="list-li">
        <span class="icon iconfont icon-icon103"></span>
        <router-link to="VersionUpdate">
          <div class="list-cell">版本更新
            <div class="versions">V1.8.0</div>
            <div class="newVersions" v-text="doctorInfo.versionNum"></div>
            <span class="icon iconfont icon-jiantou"></span>
          </div>
        </router-link>
      </li>-->
    </ul>
    <Bottom selectedVal="MyPage"></Bottom>
  </div>
</template>
<script>
  import Top from '@/components/common/HeaderBar.vue'
  import Bottom from '@/components/common/footer.vue'

  export default {
    data () {
      return {
        title: '健康由我 医生助手',
        doctorInfo: []
      }
    },
    created () {
    },
    async mounted () {
      let params = {
        doctorId: localStorage.getItem('doctorId')
      }
      const Res = await this.$api.post('basic/getIndexBasic.do', params)
      this.doctorInfo = Res.data.doctorDynamicVo
      console.log(Res.data)
    },
    methods: {},
    components: {
      Top,
      Bottom
    }
  }
</script>
<style lang="less" scoped>
  .doctorAssisrant {

  .infoTop {
    margin-top: 5.3rem;
    padding: 1.8rem 0 1.6rem 1.5rem;
    overflow: hidden;
    border-bottom: solid 1px #d9d9d9;
    background: -webkit-linear-gradient(left, #dbf8f1, #f3fefb, #dbf8f1); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #dbf8f1, #f3fefb, #dbf8f1); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #dbf8f1, #f3fefb, #dbf8f1); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #dbf8f1, #f3fefb, #dbf8f1);

  /* 标准的语法（必须放在最后） */
  >img {
    width: 6.1rem;
    height: 6.1rem;
    border-radius: 100%;
    border: solid 1px #d9d9d9;
  }

  .imgRight {
    float: right;
    position: relative;
    width: 78%;

  h3 {
    font-size: 1.8rem;
    margin-top: 1rem;

  span {
    font-size: 1.3rem;
    color: #666666;
    margin-right: 0.4rem;

  }

  }
  .classes {
    font-size: 1.3rem;
    color: #666666;
    margin-top: 0.4rem;

  span {
    color: #ffd800;
    font-size: 1.4rem;
    margin-right: 0.4rem;
  img{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    position: relative;
    top: -0.2rem;
  }
  }

  }
  .editBtn {

  a {
    display: inline-block;
    position: absolute;
    font-size: 1.3rem;
    color: #fff;
    background: rgba(10, 10, 10, 0.3);
    padding: 0.8rem 1.5rem;
    border-radius: 2.5rem 0 0 2.5rem;
    top: 1.3rem;
    right: 0;
  }

  span {
    margin-left: 0.2rem;
    font-size: 1.3rem;
  }

  }
  }
  }
  ul {
    background: #ffffff;
    overflow: hidden;

  .list-li {
    overflow: hidden;

  > span {
    font-size: 1.8rem;
    color: #10d1a0;
    display: block;
    float: left;
    padding: 1.6rem 0 1.6rem 1.5rem;
  }

  .list-cell {
    width: 85%;
    border-top: solid 1px #d9d9d9;
    padding: 1.6rem 1.5rem 1.6rem 0;
    overflow: hidden;
    font-size: 1.6rem;
    float: right;

  span {
    font-size: 1.3rem;
    color: #bbbbbb;
    float: right;
    margin-top: 0.3rem;
  }

  }

  };
    .list-li:first-child{
     .list-cell{
       border: none;
     }
    }
  }
  .ul-second {
    margin-top: 0.5rem;

  .list-cell {
    position: relative;

  .versions {
    font-size: 1.5rem;
    color: #bbbbbb;
    display: inline-block;
    margin-left: 1.5rem;
  }

  .newVersions {
    position: absolute;
    display: inline-block;
    font-size: 1.5rem;
    color: #ffffff;
    background: #ff3c1c;
    padding: 0.2rem 1.1rem;
    border-radius: 2rem;
    right: 4rem;
  }

  }
  }
  }
</style>
