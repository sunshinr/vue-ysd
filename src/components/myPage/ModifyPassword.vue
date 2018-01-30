<template>
  <div class="modifyPwd">
    <HeaderBar3 :title="title"></HeaderBar3>
    <ul>
      <li class="list">
        <span>旧密码</span>
        <input type="text" v-model="oldPwd" v-verify="oldPwd" @blur="changeIn('old')" placeholder="请输入当前密码">
        <label class="f1" v-remind="oldPwd" ref="old"></label>
      </li>
      <li class="list">
        <span>新密码</span>
        <input type="text" v-model="newPwd" v-verify="newPwd" @blur="changeIn('new')" placeholder="请输入新密码">
        <label class="f1" v-remind="newPwd" ref="new"></label>
      </li>
      <li class="list">
        <span>确认密码</span>
        <input type="text" v-model="affirmPwd" v-verify="affirmPwd" @blur="changeIn('affirm')" placeholder="请再次输入新密码">
        <label class="f1" v-remind="affirmPwd" ref="affirm"></label>
      </li>
    </ul>
    <div class="finishBtn" @click="send">发送</div>
  </div>
</template>


<script>
  import { Toast } from 'mint-ui'
  import Vue from 'vue'
  import verify from 'vue-verify-plugin'
  import { MessageBox } from 'mint-ui';
  Vue.use(verify, {
    blur: true
  })
  export default {
    name: '',
    data () {
      return {
        title: '修改密码',
        oldPwd: '',
        newPwd: '',
        affirmPwd: ''
      }
    },
    verify: {
      oldPwd: 'required',
      newPwd: 'required',
      affirmPwd: [
        'required',
        {
          test: function (val) {
            if (val !== this.newPwd) {
              return false
            }
            return true
          },
          message: '两次输入的密码不一致，请重新输入！'
        }
      ]
    },
    created () {
    },
    mounted () {
    },
    methods: {
      changeIn (valName) {
        var _this = this
        setTimeout(function () {
          if (_this.$refs[valName].innerText !== '必填' && _this.$refs[valName].innerText !== '') {
            Toast({
              message: _this.$refs[valName].innerText,
              position: 'top',
              duration: 3000
            })
          }
        }, 0)
      },
      send () {
        if (this.$verify.check()) {
         // 提交信息通过
          this.modifyPwdApi()
        } else {
        }
      },
      async modifyPwdApi () {
        let params = {
          doctorId: localStorage.getItem('doctorId'),
          crrentPssword: this.oldPwd, // 评论的ID
          newPassword: this.newPwd, // 评论的点赞
          confirmPassword: this.affirmPwd
        }
        const res = await this.$api.post('basic/updatePassword.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          MessageBox.alert('密码修改成功', '提示')
        } else if (res.data.stateCode === '002') {
          MessageBox.alert(res.data.message, '提示')
        }
      }
    },
    components: {
      Toast
    },
    filters: {}

  }
</script>


<style lang="less">
  .mint-toast.is-placetop {
    top: 12rem !important;
  }
  .f1{
    display: none;
  }
  .modifyPwd{
    margin-top:6rem;
    ul{
      background: #ffffff;
      padding:0 1.5rem;
      .list{
        padding:1.5rem 0;
        overflow: hidden;
        border-bottom:solid 1px #d9d9d9;
        span{
          display: inline-block;
          float: left;
          font-size:1.6rem;
          color: #666666;
        }
        input{
          width:75%;
          float: right;
          font-size:1.6rem;
        }
      }
    }
    .finishBtn{
      margin: 3rem 4%;
      width: 92%;
      font-size: 1.6rem;
      color: #ffffff;
      padding: 1rem 0;
      text-align: center;
      background: #10d1a0;
      border-radius: 0.4rem;
    }
  }
</style>
