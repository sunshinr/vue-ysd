<template>
  <div class="feedBack">
    <HeaderBar3 :title="title"></HeaderBar3>
    <div class="box">
      <textarea name="" id="" placeholder="请输入您的意见或建议" v-model="feed"></textarea>
      <div class="sendBtn" @click="submitFn">发送</div>
    </div>
  </div>
</template>


<script>
  import { Toast } from 'mint-ui'

  export default {
    name: '',
    data () {
      return {
        title: '意见反馈',
        feed: ''
      }
    },
    created () {
    },
    async mounted () {
    },
    methods: {
      submitFn () {
        this.apiFn()
      },
      async apiFn () {
        let _this = this
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          suggestionCotent: this.feed
        }
        const Res = await this.$api.post('personalCenter/saveSuggestion.do', params)
        if (Res.data.stateCode === '001') {
          Toast({
            message: '意见提交成功',
          })
          setTimeout(function () {
            _this.$router.push('/MyPage')
          }, 3100)

        }

      }
    },
    components: {
      Toast
    },
    filters: {}

  }
</script>


<style lang="less" scoped>
  .box {
    margin-top: 6rem;
    background: #ffffff;
    padding: 1rem 1.5rem 1.5rem;

  textarea {
    width: 100%;
    height: 16rem;
    border: solid 1px #d9d9d9;
    font-size: 1.5rem;
    padding: 0.7rem 0.6rem;
    line-height: 2.2rem;
    border-radius: 0.2rem;
    color: #999;
  }

  .sendBtn {
    width: 100%;
    margin-top: 1.3rem;
    font-size: 1.6rem;
    color: #ffffff;
    padding: 1rem 0;
    text-align: center;
    background: #10d1a0;
    border-radius: 0.4rem;
  }

  }
</style>
