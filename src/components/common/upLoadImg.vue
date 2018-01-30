<template>
  <div>
    <div class="imgBox">
      <ul>
        <li class="list-li" v-for="(item, index) in imgList" :key="item">
          <span class="list-link"><img :src="item"/></span>
          <span class="list-img-close icon iconfont icon-guanbi1" @click='delImage(index)'></span>
        </li>
        <div class="list-default-img" v-show="showAdd" @click.stop="addPic" id="addimg">
          <span class="tianjia"></span>
          <input type="file" id="fileimg" @change="onFileChange()" multiple="multiple" accept="image/jpeg,image/png,image/gif,image/bmp" style="display:none"/>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  // import $ from 'jquery'
  export default {
    data: function () {
      return {
        url: null, // 存放图片文件的URL
        showAdd: true
      }
    },
    props: [
      'imgList'
    ],
    methods: {
      addPic () {
        $('#addimg').find($('input[type=file]')).trigger('click')
        return false
      },
      onFileChange () {
        var myFile = document.getElementById('fileimg').files[0]
        if (myFile.size > 1024 * 200) {
          MessageBox('提示', '图片大小必须小于200K')
          $('#fileimg').val('')
          return false
        }
        var objUrl = this.getObjectURL(myFile)
        // console.log(objUrl)
        if (objUrl) {
          this.imgList.push(objUrl)
          if (this.imgList.length === 4) {
            this.showAdd = false
          }
        }

        this.gen_base64(myFile)
      },
      getObjectURL (file) {
        if (window.createObjectURL !== undefined) { // basic
          this.url = window.createObjectURL(file)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          this.url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          this.url = window.webkitURL.createObjectURL(file)
        }
        return this.url
      },
      delImage (n) {
        this.imgList.splice(n, 1)

        if (this.imgList.length < 4) {
          this.showAdd = true
        }
      },
      gen_base64 (file) {
        var _this = this
        let r = new FileReader()
        r.readAsDataURL(file)
        r.onload = function () {
           // console.log(r.result)
          var str = r.result.split(';base64,')[1]
          // console.log(str)
          _this.$emit('base64', str)
        }
      }
    },
    components: {
      MessageBox
    }
  }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.imgBox{
  ul{
    width: auto;
    float: left;
    .list-li{
      width: 8.4rem;
      height: 8.4rem;
      overflow: hidden;
      position: relative;
      text-align: center;
      border: solid 1px #d9d9d9;
      float: left;
      margin: 0.4rem 1.3rem 1rem 0;
      .list-link{
        display: inline-block;
      }
      img{
        height: 100%;
        width: 100%;
      }
      .list-img-close{
        width: 2rem;
        height: 2rem;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        font-size: 2rem;
        color: #fff;
        background: rgba(100, 100, 100, 0.5);
      }
    }
    .list-default-img{
      width: 8.4rem;
      position: relative;
      text-align: center;
      float: left;
      margin: 0.4rem 1.3rem 1rem 0;
      .tianjia{
        width: 8.4rem;
        height: 8.4rem;
        display: inline-block;
        background: url(/static/img/imgBg_03.jpg);
        background-size: 100% 100%;
      }
    }
  }
}
</style>
