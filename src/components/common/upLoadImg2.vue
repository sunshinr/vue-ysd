<template>
  <div>
    <div class="imgBox">
     <!-- {{oldImgList}}-->
      <ul>
        <!--服务器上获取的图片-->
        <li class="list-li 111" v-for="(item, index) in oldImgList" :key="index" v-show="isShow">
          <span class="list-link"><img :src="item.workRequirements"/></span>
          <span class="list-img-close icon iconfont icon-guanbi1" @click='delOldImage(index)'></span>
        </li>

        <li class="list-li" v-for="(item, index) in imgList" :key="index">
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
        showAdd: true,
        isShow: false
      }
    },
    props: [
      'imgList',
      'oldImgList'
    ],
    created () {
      var _this = this
      setTimeout(function () {
        console.log(_this.oldImgList)
        _this.isShow = true
      }, 300)
      this.commonDel()
    },
    methods: {
      addPic () {
        $('#addimg').find($('input[type=file]')).trigger('click')
        return false
      },
      onFileChange () {
        var myFile = document.getElementById('fileimg').files[0]
        console.log(myFile)
        if (myFile.size > 1024 * 2048) {
          MessageBox('提示', '图片大小必须小于2M')
          $('#fileimg').val('')
          return false
        }
        var _this = this
        let r = new FileReader()
        r.readAsDataURL(myFile)
        r.onload = function () {
          // var str = r.result.split(';base64,')[1]
          // console.log(r.result)
          _this.imgList.push(r.result)
          let imgLength = _this.commonDel()
           if(imgLength === 4){
             _this.showAdd = false
           }
        }
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
        this.commonDel()
      },
      delOldImage (index) {
        // console.log(this.oldImgList)
        this.$nextTick(function () {
          console.log(this.oldImgList[index].workRequirementsId)
          this.$emit('removeId', this.oldImgList[index].workRequirementsId)
          this.oldImgList.splice(index, 1)
          this.$emit('removeImg', this.oldImgList)
        })
        this.commonDel()
      },
      commonDel(){
        let imgLen = 0
        imgLen = this.imgList.length + this.oldImgList.length
        if(imgLen >= 4){
          this.showAdd = false
        } else {
          this.showAdd = true
        }
        return imgLen
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
