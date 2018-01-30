<template>
  <div class="dataNull">
    <div class="imgBox">
      <img :src="imgUrl"/>
      <p>{{hintTxt}}</p>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      }
    },
    props: ['imgUrl', 'hintTxt'],
    components: {
    }
  }
</script>

<style lang="less">
  .dataNull{
    width:100%;
    margin-top:5.5rem;
    overflow: hidden;
    .imgBox{
      width: 66%;
      margin: 5rem 0 5rem 17%;
      background: #ffffff;
      border: solid 1px #eaeaea;
      border-radius: 0.4rem;
      padding: 4rem 0;
      img{
        width: 80%;
        margin-left: 10%;
      }
      p{
        font-size:1.6rem;
        color: #999999;
        width:100%;
        text-align: center;
        margin-top:1.6rem;
      }
    }
  }
</style>
