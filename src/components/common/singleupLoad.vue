<template>
  <div>
      <ul>
        <li class="list-li" v-for="(item, index) in iconList" @click.stop="addPic" id="addicon" :key="item">
          <span class="list-link"><img :src="item"/></span>
          <input type="file" id="fileicon" @change="onFileChange()" multiple="multiple" accept="image/jpeg,image/png,image/gif,image/bmp" style="display:none"/>
        </li>
      </ul>
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
      'iconList'
    ],
    methods: {
      addPic () {
        $('#addicon').find($('input[type=file]')).trigger('click')
        return false
      },
      onFileChange () {
        var myFile = document.getElementById('fileicon').files[0]
        if (myFile.size > 1024 * 200) {
          MessageBox('提示', '图片大小必须小于200K')
          $('#fileicon').val('')
          return false
        }
        var objUrl = this.getObjectURL(myFile)
        // console.log(objUrl)
        if (objUrl) {
          this.iconList.push(objUrl)
          this.iconList.splice(0, 1)
        }
        this.gen_base642(myFile)
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
      gen_base642 (file) {
        var _this = this
        let r = new FileReader()
        r.readAsDataURL(file)
        r.onload = function () {
          // console.log(r.result)
          var str = r.result.split(';base64,')[1]
          // console.log(str)
          _this.$emit('baseIcon64', str)
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
    overflow: hidden;
    .list-li{
      overflow: hidden;
      text-align: center;
      float: left;
      margin: 0.4rem 1.3rem 1rem 0;
      .list-link{
        display: inline-block;
        width: 7rem;
        height:7rem;
      }
      img{
        height: 100%;
        width: 100%;
        border-radius: 100%;
        border: solid 1px #d9d9d9;
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
  }
}
</style>
