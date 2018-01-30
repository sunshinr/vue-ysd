<template>
  <div class="m-header">
  <mt-header :title="title">
    <router-link to="/SearchIndex" class="icon iconfont icon-sousuo" slot="right"></router-link>
  </mt-header>
  </div>
</template>


<script>
  import { Header } from 'mint-ui'
  export default {
    data () {
      return {
      }
    },
    props: ['title'],
    components: {
      'mt-header': Header
    }
  }
</script>

<style lang="less">
.m-header{
.mint-header{
   position: fixed;
   z-index: 99;
   top: 0;
   width: 100%;
   background: #10d1a0;
   text-align: left;
   padding:0.7rem 1.5rem;
   height: 5.4rem;
   .mint-header-button {
     -webkit-box-flex: 0;
     -ms-flex: 0;
     flex: 0;
   }
  .mint-header-title{
    overflow:visible
  }
   .mint-button{
     height: 4rem;
     font-size: 3rem;
   }
   h1{
     font-size: 1.8rem;
   }
   .icon{
     display: inline-block;
     background-color: transparent;
     border: 0;
     box-shadow: none;
     color: inherit;
     padding: 0;
     height: 4rem;
     font-size: 3rem;
     position: relative;
     top: 0.6rem;
   }
 }
 }
</style>
