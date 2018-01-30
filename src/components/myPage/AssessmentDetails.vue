<template>
  <div class="assessmentDetail">
    <HeaderBar3 :title="title"></HeaderBar3>
    <ul>
      <li class="list">
        <img src="/static/img/userinfo_07.jpg" alt="">
        <div class="listRight">
          <h4>陈一飞
            <span>
              <i class="icon iconfont icon-xing"></i>
              <i class="icon iconfont icon-xing"></i>
              <i class="icon iconfont icon-xing"></i>
              <i class="icon iconfont icon-xing"></i>
              <i class="icon iconfont icon-xing"></i>
            9.8分
            </span>
          </h4>
          <div class="time">2017.7.1</div>
        </div>
        <p>服务非常好，医生很专业，也很耐心。这里显示评价正文的所有内容。</p>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        title: '评价详情',
        consultBasicList: [],
        consultId: this.$route.query.consultId
      }
    },
    created () {
      this.getAssessmentDetails()
    },
    mounted () {
    },
    methods: {
      async getAssessmentDetails () {
        let params = {
          consultId: this.consultId
        }
        let res = await this.$api.post('personalCenter/findConsultsOfList.do', params)

        if (res.data.stateCode === '001') {
          console.log(res.data)
        //  this.consultBasicList = res.data.consultBasicList

        } else if (res.data.stateCode === '002') {
          console.log('参数异常')
        } else {
          console.log('系统错误')
        }
      },
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  .assessmentDetail {

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
  .time {
    color: #999999;
    font-size: 1.4rem;
    margin-top: 0.6rem;
  }

  }
  p {
    width: 100%;
    font-size: 1.6rem;
    margin-top: 1.7rem;
  }

  }
  }
  }
</style>
