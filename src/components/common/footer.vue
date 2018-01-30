<template>
  <div>
    <mt-tabbar v-model="selected" class="footBar">
      <mt-tab-item id="/">
        <i slot="icon" class="icon iconfont icon-zhishiku"></i>
        知识库
      </mt-tab-item>
      <mt-tab-item id="Workbench">
        <i slot="icon" class="icon iconfont icon-gongzuotai"></i>
        工作台
      </mt-tab-item>
      <mt-tab-item id="Message">
        <i slot="icon" class="icon iconfont icon-xiaoxi"></i>
        康信
      </mt-tab-item>
      <mt-tab-item id="MyPage">
        <i slot="icon" class="icon iconfont icon-menzhenyiliao"></i>
        我
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        selected: ''
      }
    },
    props: ['selectedVal'],
    watch: {
      selected: function (val, oldVal) {
       // console.log(val)
        this.$router.push(val)
      }
    },
    created () {
      this.selected = this.selectedVal
    }
  }
</script>

<style lang="less" scoped>
  .footBar{
    position: fixed;
    border-top:solid 1px #d9d9d9;
    z-index:10;

      .mint-tab-item{
        color: #999999;
        .icon{
          display: block;
          font-size: 24px;

        }
      }
      .mint-tab-item.is-selected {
        background: none;
        color: #10d1a0;
      }
  }
</style>
