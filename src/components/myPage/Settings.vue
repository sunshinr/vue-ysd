<template>
  <div class="setting">
    <HeaderBar3 :title="title"></HeaderBar3>
    <ul>
      <li class="list" @click="modifyPwd">
        修改密码<i class="icon iconfont icon-jiantou"></i>
      </li>
      <li class="list">
        消息推送
        <mt-switch v-model="pushMessage"></mt-switch>
      </li>
      <router-link to="/ServiceAgreement">
        <li class="list">
          用户协议<i class="icon iconfont icon-jiantou"></i>
        </li>
      </router-link>
    </ul>
    <div class="btn" @click="loginOut">退出当前账号</div>
  </div>
</template>


<script>
  import { Switch } from 'mint-ui'
  import { MessageBox } from 'mint-ui'

  export default {
    name: '',
    data () {
      return {
        title: '设置',
        pushMessage: false
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      modifyPwd () {
        this.$router.push({path: '/ModifyPassword'})
      },
      loginOut () {
        var _this = this
        MessageBox.alert('确定退出当前账号吗？').then(action => {
          localStorage.removeItem('doctorId')
          _this.$router.push({
            path: '/login',
          })
        })
      }
    },
    components: {
      'mt-switch': Switch
    },
    filters: {}

  }
</script>


<style lang="less">
  .setting {

  ul {
    margin-top: 6rem;
    background: #ffffff;
    overflow: hidden;
    padding-left: 1.5rem;

  .list {
    padding: 1.5rem 1.5rem 1.5rem 0;
    border-top: solid 1px #d9d9d9;
    overflow: hidden;
    font-size: 1.6rem;
    position: relative;

  i {
    float: right;
    font-size: 1.5rem;
    color: #bbbbbb;
    margin-top: 0.2rem;
  }

  .mint-switch {
    float: right;
    position: absolute;
    right: 1.5rem;
    top: 1.1rem;
  }

  .mint-switch-input:checked + .mint-switch-core {
    border-color: #10d1a0;
    background-color: #10d1a0;
  }

  };
    .list:first-child{
     border: none;
    };
    .list:nth-child(2){
      border-bottom: solid 1px #d9d9d9;
    }
  }
  .btn {
    width: 92%;
    margin-left: 4%;
    font-size: 1.6rem;
    color: #ffffff;
    padding: 1rem 0;
    text-align: center;
    background: #10d1a0;
    position: fixed;
    bottom: 2rem;
    border-radius: 0.4rem;
  }

  }
</style>
