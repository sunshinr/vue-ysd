<template>
  <div class="version-update-wrap" id="white-background">
    <HeaderBar3 title="版本更新"></HeaderBar3>

    <div class="version-update-top">
      <img src="../../../static/images/logo.png" alt="">
      <p>当前版本： V1.4.0</p>
    </div>

    <dl>
      <dt>更新版本V2.0</dt>
      <dd>优化了部分功能及界面</dd>
      <dd>优化了用户的细节体验</dd>
      <dd>更新了部分图标</dd>

    </dl>

    <button type="button">下载并安装</button>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {}
    },
    created () {
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    methods: {},
    components: {},
    filters: {}

  }
</script>


<style lang="less">
  html, body {
    height: 100%;
  }

  .version-update-wrap {
    height: 100%;
  .version-update-top {
    border-top: 6.2rem solid #f5f5f5;
    border-bottom: 1px solid #d9d9d9;
    text-align: center;
    padding: 3rem 0;
  img {
    width: 6rem;
    height: 6rem;
    margin-bottom: 1.8rem;
  }
  p {
    font-size: 1.5rem;
    color: #999999;
  }

  }
  dl {
    padding: 0 1.5rem;
    color: #666;
    margin-bottom: 4rem;
  dt {
    margin: 2.5rem 0;
    font-size: 1.8rem;
    font-weight: bold;
  }
  dd {
    font-size: 1.5rem;
    margin: 0.7rem 0;
  }
  }
  button {
    width: 92%;
    padding: 1.4rem 0;
    margin: 0 4%;
    background: #10d1a0;
    color: #ffffff;
    font-size: 1.6rem;
  }
  }

</style>
