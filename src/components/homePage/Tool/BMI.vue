<template>
    <div class="bmi">
      <HeaderBar3 title="BMI体重指数" v-if="browser !=1"></HeaderBar3>
      <ul>
        <li class="list">
          <label>身高：</label>
          <input type="number" v-model="stature" placeholder="请输入身高">
          <span>cm</span>
        </li>
        <li class="list">
          <label>体重：</label>
          <input type="number" v-model="weight" placeholder="请输入体重">
          <span>kg</span>
        </li>
      </ul>
      <div class="confirmBtn" @click="submitBtn()">确认</div>
      <div class="showResult" v-show="testResult != ''">你的BMI值：<span>{{ testResult }}</span></div>
      <div class="norm">
        <div class="normBox">
          <span>正常范围：</span>
          <div class="cont">
            <p>18.5≤BMI≤24</p>
          </div>
        </div>
        <div class="normBox">
          <span>异常范围：</span>
          <div class="cont">
            <p>BMI≤18.4 <span>偏瘦</span></p>
            <p>24≤BMI≤27 <span>过重</span></p>
            <p>27≤BMI≤30   <span>轻度肥胖</span></p>
            <p>30≤BMI≤35   <span>中度肥胖</span></p>
            <p>BMI≥35  <span>重度肥胖</span></p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  export default {
    data () {
      return {
        stature: '',
        weight: '',
        testResult: '',
        browser:''
      }
    },
    created () {

    },
    methods: {
      submitBtn () {
        if (this.stature != '' && this.weight != '') {
          let a = Math.round(this.weight / ((this.stature / 100) * (this.stature / 100)))
          this.testResult = a.toFixed(1)
          console.log(this.testResult)
        } else {
          MessageBox('提示', '请将所有信息输入完整')
        }
      },
      judgeBrowser(){
        this.browser=1
      }
    },
    components: {
        // 引入组件
      MessageBox
    }
  }
</script>
<style lang="less" scoped>
.bmi{
  ul{
    margin-top:5.5rem;
    background: #ffffff;
    padding:1rem 1.5rem;
    .list{
      padding:0.5rem 0;
      overflow: hidden;
      label{
        font-size:1.7rem;
        float: left;
        margin-top: 0.6rem;
      }
      input{
        float: left;
        width: 73%;
        background: #f5f5f5;
        border-radius: 0.3rem;
        font-size: 1.5rem;
        padding: 0.9rem 1.2rem;
        margin: 0 1rem 0 0.3rem;
      }
      span{
        display: inline-block;
        float: right;
        font-size:1.7rem;
        margin-top:0.3rem;
      }
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
  .showResult{
    font-size: 1.6rem;
    margin: 1.5rem;
    span{
      color: red;
    }
  }
  .norm{
    position: fixed;
    width:100%;
    bottom:1.5rem;
    left:1.5rem;
    color: #999999;

    .normBox{
      overflow: hidden;
      margin-top: 0.7rem;
      >span{
        display: block;
        font-size:1.5rem;
        float: left;
      }
      .cont{
        width:77%;
        float: right;
        p{
          font-size:1.45rem;
          margin-bottom: 0.4rem;
          span{
            margin-left:1rem;
            font-size:1.5rem;
          }
        }
      }
    }
  }
}
</style>
