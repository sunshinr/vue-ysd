<template>
  <div class="setting">
    <headerBar3 title="聊天设置" titleBtnTxt="我" titleUrl="/"></headerBar3>
    <ul class="setting_list">
      <li>
       置顶聊天<mt-switch v-model="MessageTopTab"></mt-switch>
      </li>
      <li>
        消息免打扰<mt-switch v-model="MessageDisturb"></mt-switch>
      </li>
      <li>
        清空聊天记录
      </li>
    </ul>
  </div>
</template>


<script>
  import { Switch, Toast } from 'mint-ui';
  export default {
    data () {
      return {
        MessageTopTab:false,
        MessageDisturb:true
      }
    },
    component:{
      Switch
    },
    watch:{
      'MessageTopTab':function(val){
        if(val == false){
          Toast({
            message: '取消置顶',
            position: 'bottom',
            duration: 3000
          });
        } else {
          Toast({
            message: '置顶成功',
            position: 'bottom',
            duration: 3000
          });
        }
      },
      'MessageDisturb':function(val){
        if(val == false){
          Toast({
            message: '取消免打扰',
            position: 'bottom',
            duration: 3000
          });
        } else {
          Toast({
            message: '开启免打扰',
            position: 'bottom',
            duration: 3000
          });
        }
      }
    }
  }
</script>

<style lang="less">
  .setting{
    padding: 5.4rem 0;
    .setting_list{
      height: auto;
      padding-left: 3%;
      background: #FFF;
      margin-top: 1rem;
      li{
        padding: 1.5rem 0;
        font-size: 1.6rem;
        border-top: solid 1px #d9d9d9;
        line-height: 2.9rem;
        .mint-switch{
          float: right;
          margin-right: 1.5rem;
        }
        .mint-switch-input:checked + .mint-switch-core{
          border-color: #10d1a0;
          background-color: #10d1a0;
        }
      }
      li:first-child{
        border: none;
      }
    }
  }
</style>

