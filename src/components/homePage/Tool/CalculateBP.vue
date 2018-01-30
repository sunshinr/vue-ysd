<template>
    <div class="calculatebp">
      <HeaderBar3 :title="title"></HeaderBar3>
      <ul>
        <li class="list">
          <label for="">性别：</label>
          <div class="sex">
            <label>
              <i class="icon iconfont" :class="sex == '男' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
              <input v-model="sex" type="radio" value="男"/>男
            </label>
            <label>
              <i class="icon iconfont" :class="sex == '女' ? 'icon-xuanzhong2' : 'icon-weixuanzhong'"></i>
              <input v-model="sex" type="radio" value="女"/>女
            </label>
          </div>
        </li>
        <li class="list">
          <label>年龄：</label>
          <input type="number" v-model="age" placeholder="请输入年龄">
          <span>岁</span>
        </li>
        <li class="list">
          <label>收缩压：</label>
          <input type="number" v-model="systolicPressure" placeholder="请输入收缩压">
          <span>mmHg</span>
        </li>
        <li class="list">
          <label>舒张压：</label>
          <input type="number" v-model="diastolicPressure" placeholder="请输入舒张压">
          <span>mmHg</span>
        </li>
      </ul>
      <div class="confirmBtn" @click="submitBtn">确认</div>
      <div class="answer" v-show="showResult">
        <h4>结果：</h4>
        <textarea name="" v-model="testResult">正常</textarea>
      </div>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        title: '血压计算',
        sex: '男',
        age: '',
        systolicPressure: '', // 收缩压
        diastolicPressure: '', // 舒张压
        showResult: false,
        testResult: ''
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      submitBtn () {
        if (this.age != '' && this.systolicPressure != '' && this.diastolicPressure != '') {
          this.showResult = true
          var manSP = 0
          var manDP = 0
          var womanSP = 0
          var womanDP = 0
          if (parseInt(this.age) >= 11 && parseInt(this.age) <= 35) {
            if (this.sex == '男') {
              manSP = 115
              if (this.age >= 23) {
                manDP = 74 + 2
              } else {
                manDP = 74 - 2
              }

            } else {
              womanSP = 111
              if (this.age >= 23) {
                womanDP = 72 + 2
              } else {
                womanDP = 72 - 2
              }
            }
          } else if (parseInt(this.age) >= 36 && parseInt(this.age) <= 65) {
            if (this.sex == '男') {
              manSP = 82 + this.age
              if (this.age < 50){
                manDP = 83 - 3
              } else {
                manDP = 83 + 3
              }
            } else {
              womanSP = 80 + parseInt(this.age)
              if (parseInt(this.age) < 50){
                womanDP = 80 - 3
              } else {
                womanDP = 80 + 3
              }
            }
          } else if (parseInt(this.age) < 11) {
            this.testResult = '儿童年龄段不会出现血压异常状况，请放心'
            return
          } else {
            this.testResult = '该年龄段请使用专业仪器进行测量'
            return
          }
          if (this.sex == '男') {
            console.log(manSP)
            if (this.systolicPressure >= (manSP+3)) {
              this.testResult = '您的血压偏高'
            } else if(this.systolicPressure <= (manSP-3)){
              this.testResult = '您的血压偏低'
            }
          } else {
            console.log(womanSP)
            if (this.systolicPressure >= (womanSP+3)) {
              this.testResult = '您的血压偏高'
            } else if(this.systolicPressure <= (womanSP-3)){
              this.testResult = '您的血压偏低'
            }
          }
        } else {
          MessageBox('提示', '请将所有信息输入完整')
        }
      }
    },
    components: {
        // 引入组件
      MessageBox
    }
  }
</script>
<style lang="less" scoped>
.calculatebp{
  ul{
    margin-top:5.5rem;
    background: #ffffff;
    padding:1rem 1.5rem;
    .list{
      padding:0.5rem 0;
      overflow: hidden;
      >label{
        font-size:1.7rem;
        float: left;
        margin-top: 0.6rem;
        width: 20%;
      }
      >input{
        float: left;
        width: 60%;
        background: #f5f5f5;
        border-radius: 0.3rem;
        font-size: 1.5rem;
        padding: 0.9rem 1.2rem;
        margin: 0 1rem 0 0.3rem;
      }
      span{
        display: inline-block;
        float: left;
        font-size:1.7rem;
        margin-top:0.3rem;
      }
      .sex{
        margin-top: 0.5rem;
        margin-left:22%;
        label{
          font-size: 1.5rem;
          color: #999999;
          width: 20%;
          display: inline-block;
          i{
            display: inline-block;
            font-size:2rem;
            color: #d8d8d8;
            vertical-align: middle;
          }
          .icon-xuanzhong2{
            color: #10d1a0;
          }
          input{
            display: none;
          }
        }
      }
    }
    .list:first-of-type{
      padding: 1rem 0;
    }
  }
  .confirmBtn{
    width:92%;
    margin-left:4%;
    text-align: center;
    color: #ffffff;
    font-size:1.6rem;
    padding:1.2rem;
    margin-top:4.5rem;
    background: #10d1a0;
    -webkit-border-radius: 0.3rem;
    -moz-border-radius: 0.3rem;
    border-radius: 0.3rem;
  }
  .answer{
    padding:0 1.5rem;
    margin-top:4.5rem;
    h4{
      font-size:1.7rem;
    }
    textarea{
      width:100%;
      margin-top:1.5rem;
      height:10.5rem;
      padding:1.5rem;
      border:solid 1px #d9d9d9;
      border-radius: 0.7rem;
      font-size:1.6rem;
    }
  }
}
</style>
