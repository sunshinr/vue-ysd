<template>
  <mt-header fixed :title="title" class="m-header1">
    <mt-button icon="back" slot="left" @click="goback(goBack)"></mt-button>
    <mt-button slot="right" class="right-text" @click="goAdd">{{ titleBtnTxt }}</mt-button>
  </mt-header>
</template>


<script>
  import { Header } from 'mint-ui'
  export default {
    data () {
      return {
      }
    },
    props: ['title', 'titleBtnTxt', 'titleUrl', 'goBack'],
    components: {
      'mt-header': Header
    },
    methods: {
      goAdd () {
        this.$router.push({
          path: this.titleUrl
        })
      },
      goback (goBack) {
        if (goBack) {
          window.location.reload()
          this.$router.push({
            path: goBack
          })
        } else {
          this.$router.go(-1)
        }
        this.$emit('arrowEvent')
      }
    }
  }
</script>

<style lang="less">
  .m-header1{
    position: fixed;
    z-index: 99 !important;
    top: 0;
    width: 100%;
    background: #10d1a0;
    text-align: center;
    padding:0.7rem 1.5rem 0.4rem;
    height: 5.4rem;
    .mint-header-button {
      -webkit-box-flex: 0;
      -ms-flex: 0;
      flex: 0;
    }
    .mint-button{
      height: 4rem;
    }
    h1{
      font-size: 1.6rem;
    }
    .right-text{
      font-size:1.5rem;
    }
  }
</style>

