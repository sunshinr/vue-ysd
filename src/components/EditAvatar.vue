<template>
  <div class="avatar" id="black-background">
    <div class="initialBox" v-show="!panel">
      <div class="box-top">
        <i class="icon iconfont icon-guanbi" @click="getBack"></i>
        <div class="upFunc">
          <input type="file" id="change" accept="image" @change="change">
          <label for="change"><i class="icon iconfont icon-sangedian"></i></label>
        </div>
      </div>
      <div class="imgBox" ref="imgBox">
        <img :src="initialImgUrl" alt="">
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div class="funcBox clear">
        <i class="icon iconfont icon-fanhui" @click="cancelUpLoad"></i>
        <div class="submitBtn" type="button" id="button" @click="crop">完成</div>
      </div>
      <div class="funcContent">
        <img id="image" :src="url" alt="Picture">
      </div>
    </div>
  </div>
</template>
<script>
  import Cropper from 'cropperjs'
  export default {
    data() {
      return {
        initialImgUrl: '',
        picValue:'',
        cropper:'',
        croppable:false,
        panel:false,
        url:'',
        headerImage:'',
      }
    },
    created() {
      this.initialImgUrl = this.$route.query.imgUrl
    },
    mounted () {
      this.$WhiteBackground.blackBg()
      let w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
      this.$refs.imgBox.style.height = w + 'px'

      // 初始化这个裁剪框
      var self = this;
      var image = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background:false,
        zoomable:false,
        ready: function () {
          self.croppable = true;
        }
      });
    },
    methods: {
      getBack () {
        this.$router.go(-1)
      },
      cancelUpLoad () {
        this.$router.go(-1)
      },
      getObjectURL (file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      change (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.panel = true;
        this.picValue = files[0];

        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的url
        if(this.cropper){
          this.cropper.replace(this.url);
        }
        this.panel = true;

      },
      crop () {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        // Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        console.log(this.cropper)
        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.headerImage = roundedCanvas.toDataURL();
        this.editPicApi(this.headerImage)
        // this.postImg()

      },
      async editPicApi (picUrl) {
        let iconImg = ''
        iconImg = picUrl.split(';base64,')[1]
        /* if(iconImg == undefined){
          iconImg = String(iconImg)
        } */
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          picture: iconImg
        }
        const res = await this.$api.post('personalCenter/toEditAvatar.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          // localStorage.setItem('newPicUrl', this.headerImage)
          this.$router.push({
            path: '/MyInfo'
          })
        }
      },
      getRoundedCanvas (sourceCanvas) {

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
      },
      postImg () {
        //这边写图片的上传
      }
    },
    components: {
        // 引入组件
    }
  }
</script>
<style lang="less">
  body, html{
    height:100%;
  }
  .initialBox{
    .box-top{
      padding:1.5rem;
      overflow: hidden;
      i{
        color: #ffffff;
        font-size:1.5rem;
      }
      .upFunc{
        float: right;
        input{
          display: none;
        }
        i{
          font-size:1.8rem;
        }
      }
    }
    .imgBox{
      width:100%;
      //height:20rem;
      border:solid 1px #666;
      margin-top:5rem;
      img{
        width:100%;
        height:100%;
        //border:solid 1px #cccccc;
      }
    }
  }

  /*上传图片有关样式*/
  .container{
    .funcBox{
      padding:1.5rem;
      color: #ffffff;
      overflow: hidden;
      i{
        font-size:1.7rem;
      }
      .submitBtn{
        float: right;
        font-size:1.6rem;
      }
    }
    .funcContent{
      margin-top:3rem;
    }
  }
  #demo .container {
    z-index: 99;
    position: fixed;
    padding-top: 60px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,1);
  }

  #demo #image {
    max-width: 100%;
  }

  .cropper-view-box,.cropper-face {
    border-radius: 50%;
  }
  /*!
   * Cropper.js v1.0.0-rc
   * https://github.com/fengyuanchen/cropperjs
   *
   * Copyright (c) 2017 Fengyuan Chen
   * Released under the MIT license
   *
   * Date: 2017-03-25T12:02:21.062Z
   */

  .cropper-container {
    font-size: 0;
    line-height: 0;

    position: relative;

    -webkit-user-select: none;

    -moz-user-select: none;

    -ms-user-select: none;

    user-select: none;

    direction: ltr;
    -ms-touch-action: none;
    touch-action: none
  }

  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg
  }

  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .cropper-wrap-box {
    overflow: hidden;
  }

  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }

  .cropper-modal {
    opacity: .5;
    background-color: #000;
  }

  .cropper-view-box {
    display: block;
    overflow: hidden;

    width: 100%;
    height: 100%;

    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }

  .cropper-dashed {
    position: absolute;

    display: block;

    opacity: .5;
    border: 0 dashed #eee
  }

  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px
  }

  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px
  }

  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;

    display: block;

    width: 0;
    height: 0;

    opacity: .75
  }

  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee
  }

  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px
  }

  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px
  }

  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;

    display: block;

    width: 100%;
    height: 100%;

    opacity: .1;
  }

  .cropper-face {
    top: 0;
    left: 0;

    background-color: #fff;
  }

  .cropper-line {
    background-color: #39f
  }

  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize
  }

  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize
  }

  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize
  }

  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize
  }

  .cropper-point {
    width: 5px;
    height: 5px;

    opacity: .75;
    background-color: #39f
  }

  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize
  }

  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize
  }

  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize
  }

  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize
  }

  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize
  }

  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize
  }

  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize
  }

  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1
  }

  @media (min-width: 768px) {

    .cropper-point.point-se {
      width: 15px;
      height: 15px
    }
  }

  @media (min-width: 992px) {

    .cropper-point.point-se {
      width: 10px;
      height: 10px
    }
  }

  @media (min-width: 1200px) {

    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75
    }
  }

  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f
  }

  .cropper-invisible {
    opacity: 0;
  }

  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }

  .cropper-hide {
    position: absolute;

    display: block;

    width: 0;
    height: 0;
  }

  .cropper-hidden {
    display: none !important;
  }

  .cropper-move {
    cursor: move;
  }

  .cropper-crop {
    cursor: crosshair;
  }

  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
</style>
