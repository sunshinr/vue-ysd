<template>
  <div class="message_dialogue">
    <mt-header fixed :title="title" class="m-header1">
      <mt-button icon="back" slot="left" @click="goback"></mt-button>
      <i icon="back" slot="right" class="right-text icon iconfont icon-yonghu" @click="goAdd"></i>
    </mt-header>
    <!--消息内容列表-->
    <div class='message'>
      <ul class="message_ul">
        <span class="message_time"><i>上午11:20</i></span>

        <li class=" Other">
          <!--<img :src="message.consult.member.memberImg" class="Head_img">-->
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3664382160,3943838955&fm=27&gp=0.jpg" class="Head_img">
          <div class="message_con">
            <s><i></i></s>
            <p>阿萨德撒倒萨大撒阿萨德撒打算大所大所多撒多撒大所大所多撒多</p>
          </div>
        </li>

        <li class=" My">
          <!--<img :src="message.consult.member.memberImg" class="Head_img">-->
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2742291409,614591442&fm=27&gp=0.jpg" class="Head_img">
          <div class="message_con">
            <s><i></i></s>
            <p>阿萨德撒倒萨大撒多</p>
          </div>
        </li>


        <div class="bottom">
          <div class="Input_box">
            <div class="Input_div">
              <!--<span class="updataImBtn">-->
                <!--<label for="file" id="upImg" @click.stop="addPic">-->
                  <!--<i class="icon iconfont icon-xiangji"></i>-->
                  <!--<input type="file" id="file" accept="image/jpeg,image/jpg,image/png" capture="camera" @change="onFileChange">-->
                <!--</label>-->
              <!--</span>-->
              <textarea  rows=1  id="textarea" v-model="InputVal"   class="text" ></textarea>
            </div>
            <transition name="slide-fade" mode="out-in"><button id="send" @click="" v-show="sendBtn==0">发送</button></transition>
            <transition name="slide-fade" mode="out-in"><div class="extend_btn" @click="extendBtn" v-show="sendBtn==1"><i class="icon iconfont icon-jia-copy"></i></div></transition>
            <!--<span style="padding: 2rem; display: block" @click="bars-=10">+++</span>-->
          </div>
          <transition name="slide-fade" mode="out-in">
          <div class="extend" v-show="extendShow == 1">
             <div class="extend_photo">
               <i class="icon iconfont icon-tupian1"></i>
               <h4>照片</h4>
             </div>
             <div class="extend_programme">
               <router-link to="/MessagrPrograme">
                 <i class="icon iconfont icon-fangan1"></i>
                 <h4>方案</h4>
               </router-link>
             </div>
          </div>
          </transition>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title:'萨达',
        InputVal:'',
        sendBtn:1,
        extendShow:0
      }
    },
    methods:{
      goAdd () {
        this.$router.push({
          path:"/setting"+2
        })
      },
      goback:function (){
        this.$router.go(-1)
      },
      extendBtn:function (){
        if(this.extendShow == 1){
          this.extendShow = 0
        } else {
          this.extendShow = 1
        }

      }
    },
    watch:{
      'InputVal':{
      handler:function(val,oldVal){
       let Send = document.getElementById('send'),$this=this;
       val==''||val.match(/^\s+$/g)?$this.sendBtn = 1:$this.sendBtn = 0;
  }
  }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .message_dialogue{
    .slide-fade-enter-active {
      transition: all .3s ease;
    }
    .slide-fade-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter
      /* .slide-fade-leave-active for below version 2.1.8 */ {
      transform: translateX(20px);
      opacity: 0;
    }
    .slide-fade-leave-to{
      transform: translateX(20px);
      opacity: 0;
    }

    padding-top: 5.4rem;
    .m-header1{
      position: fixed;
      z-index: 99;
      top: 0;
      width: 100%;
      background: #10d1a0;
      text-align: center;
      padding:0.7rem 1.5rem;
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
        font-size: 1.8rem;
      }
      .right-text{
        font-size:2.2rem;
      }
    }
    .message{
      .message_ul{
        height: auto;
        overflow: hidden;
        padding: 2rem 1.5rem 5rem 1.5rem;
        .message_time {
          font-size: 1.4rem;
          height: auto;
          line-height: 1.6rem;
          font-weight: 100;
          color: #b2b2b2;
          float: left;
          display: block;
          width: 100%;
          text-align: center;
          margin-bottom: 1.5rem;
          i{
            display: inline-block;
            background: #e8e8e8;
            border-radius: 2rem;
            padding: 0.3rem 1rem;
          }
        }
        .Other{ float: left;
          img{
            float: left;
          }
          .message_con{
            max-width: 20rem;
            width: auto;
            height: auto;
            border-radius: 5px;
            position: relative;
            float: left;
            margin-left: 1.6rem;
            display: block;
            border: 1px solid #dddddd;
            background-color: #ffffff;
            p{
              padding: 0.8rem 1.3rem;
              word-break: break-all;
              background: #fff;
              display: inline-block;
              float: left;
              width: auto;
              font-size: 1.5rem;
              line-height: 2.5rem;
              border-radius: 8px;
              margin: 0;
              color: #333;
              img{
                width: auto;
                max-width: 100%;
                border-radius: 3px;
              }
            }
          };
          s{
            position: absolute;
            top: 1.1rem;
            left: -1.2rem;
            display: block;
            height: 0;
            width: 0;
            font-size: 0;
            line-height: 0;
            border-color: transparent #dddddd transparent transparent;
            border-style: dashed solid dashed dashed;
            border-width: 0.6rem;
            i{
              position: absolute;
              top: -0.6rem;
              left: -0.4rem;
              display: block;
              height: 0;
              width: 0;
              font-size: 0;
              line-height: 0;
              border-color: transparent #fff transparent transparent;
              border-style: dashed solid dashed dashed;
              border-width: 0.6rem;
            }
          }
        };
        .My{ float: right;
          .Head_img{
            float: right;
          }
          .message_con{
            max-width: 20rem;
            width: auto;
            border-radius: 5px;
            position: relative;
            float: right;
            margin-right: 1.6rem;
            display: block;
            border: 1px solid #dddddd;
            background-color: #10d1a0;
            p{
              padding: .8rem 1.3rem;
              word-break: break-all;
              position: relative;
              background: #10d1a0;
              display: inline-block;
              float: right;
              width: auto;
              color: #fff;
              font-size: 1.5rem;
              line-height: 2.5rem;
              border-radius: 8px;
              margin: 0;
              img{
                width: auto;
                max-width: 100%;
                border-radius: 3px;
              }
            }
            s{
              position: absolute;
              top: 1.2rem;
              right: -1rem;
              display: block;
              height: 0;
              width: 0;
              font-size: 0;
              line-height: 0;
              border-color: transparent transparent transparent #dddddd;
              border-style: dashed solid dashed dashed;
              border-width: 0.6rem;
              i{
                position: absolute;
                top: -0.6rem;
                left: -0.5rem;
                display: block;
                height: 0;
                width: 0;
                font-size: 0;
                line-height: 0;
                border-color: transparent transparent transparent #10d1a0;
                border-style: dashed dashed dashed solid;
                border-width: 0.6rem;
              }
            }
          }
        }
        li{
          height: auto;
          width: 26rem;
          overflow: hidden;
          margin-bottom: 2rem;
          position: relative;
          .Head_img{
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
          }
        }
        .prescription_con{
          width: 20rem;
          height: auto;
          overflow: hidden;
          border-radius: 5px;
          background: #fff;
          box-sizing: border-box;
          .prescription_bg{
            width: 95%;
            margin: 0.5rem auto;
            height: 5.5rem;
            background: url(/static/img/prescription-bg_03.png) no-repeat;
            background-size: 100%;
            img{
              width: 2.3rem;
              height: 2.3rem;
              margin-top: 1.6rem;
              margin-left: 0.5rem;
              border: solid 1px #fff;
              border-radius: 50%;
              float: left;
            }
            .prescription_text{
              width: 14rem;
              float: left;
              margin-left: 2rem;
              padding-top: 1.3rem;
              span{
                display: block;
                font-size: 1rem;
                font-weight: 100;
                height: 1.4rem;
                line-height: 1.4rem;
              }
              .see{
                color: #eb6562;
                margin-top: 0.5rem;
              }
            }
          }
          h5{
            font-weight: 100;
            font-size: 1rem;
            border-top: solid 1px #dddddd;
            color: #999999;
            padding: 0 0.6rem;
            height: 1.6rem;
            line-height: 1.8rem;
          }
        }

      }
      h1{
        font-size: 6rem;
      }
      .bottom{
        position: fixed;
        bottom: 0;
        width: 100%;
        max-width: 640px;

        left: 0;
        .Input_box{
          background: #fafafa;
          height: auto;
          overflow: hidden;
          border-top: solid 1px #d9d9d9;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          max-width: 640px;
          left: 0;
          .Input_div{
            height: auto;
            width: 87%;
            float: left;
            position: relative;
            padding: 0.4rem;
            .updataImBtn{
              position: absolute;
              bottom: 0.2rem;
              left: 0;
              width: 11%;
              padding:0.8rem;
              box-sizing: content-box;
              #upImg{
                width: 2.9rem;
                border-radius: 4px;
                #file{
                  display: none;
                }
              }
              .icon{ font-size: 2.5rem; color: #ccc}
            }
          }
          .text{
            float: right;
            width: 100%;
            box-sizing: border-box;
            border-radius: 0.3rem;
            color: #666;
            border: solid 1px #d9d9d9;
            font-size: 1.4rem;
            height: auto;
            min-height: 2rem;
            max-height: 8rem;
            overflow-y:visible;
            padding: 1rem;
            line-height: 2rem;
            margin-bottom: 0;
          }
          #send{
            width: 12%;
            position: absolute;
            bottom: 10%;
            height: 80%;
            font-size: 1.4rem;
            color: #fff;
            background: #10d1a0;
            padding: 0.8rem 0;
            border: none;
            border-radius:0.5rem;
            border: solid 1px #0fb188;
          }
          .extend_btn{
            width: 13%;
            position: absolute;
            height: 100%;
            display: inline-block;
            line-height:5.5rem;
            padding-left: 0.5rem;
            .icon{
              font-size: 3.6rem;
              color: #ccc;
            }
          }
        }
        .extend{ padding: 2rem; display: flex; background: #fafafa;
          border-top: solid 1px #d9d9d9;
         > div{
           width: 20%;
           text-align: center;
           margin-left: 2rem;
           .icon{
             padding: 1rem;
             font-size: 4rem;
             display: inline-block;
             color: #999;
             background: #fff;
             border-radius: 1rem;
             border: solid 1px #ccc;
           }
           h4{
             font-size: 1.4rem;
             color: #999;
             margin-top: 1rem;
           }
        }
          > div:first-child{
            margin-left: 0;
          }
        }
      }
    }
  }

</style>
