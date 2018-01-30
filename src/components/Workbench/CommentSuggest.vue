<template>
  <div class="comm_suggestion">
    <HeaderBar3 :title="title"></HeaderBar3>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">已填写</mt-tab-item>
      <mt-tab-item id="2">填写中</mt-tab-item>
      <mt-tab-item id="3">未填写</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ul class="writeSuggest already-ul">
          <li class="clear" v-for="item in evaluateInsList1" :key="item.value">
            <div class="li-top">
              <i><img :src="item.memberImg"></i>
              <div class="icon-right">
                <div class="name">{{$WhiteBackground.LimitText(item.memberName, 3)}}<span>新</span></div>
                <div class="sex-old">女 <span>35岁</span>
                  <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
                </div>
              </div>
            </div>
            <router-link :to="{path:'/UserEvaluation',query:{id:item.id,evaluateId:$route.query.evaluateId}}">
            <h4>评估结果：<span>{{item.doctorComment}}</span></h4>
            <div class="li-suggest">指导意见：
              <p>{{item.doctorSuggest}}</p>
            </div>
            </router-link>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ul class="writeSuggest writing">
          <li class="clear" v-for="item in evaluateInsList2" :key="item.value">
            <div class="li-top">
              <i><img :src="item.memberImg"></i>
              <div class="icon-right">
                <div class="name">{{$WhiteBackground.LimitText(item.memberName, 3)}}<span>新</span></div>
                <div class="sex-old">女 <span>35岁</span>
                  <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
                </div>
              </div>
            </div>
            <h4>评估结果：<span>{{item.doctorComment}}</span></h4>
            <div class="li-suggest">指导意见：
              <p>{{item.doctorSuggest}}</p>
            </div>
            <div class="li-btn">
              <span>填写</span><span>提交</span>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ul class="writeSuggest noWriting">
          <li class="clear" v-for="item in evaluateInsList3" :key="item.value">
            <div class="li-top">
              <i><img :src="item.memberImg"></i>
              <div class="icon-right">
                 <router-link :to="{path:'/UserEvaluation',query:{id:item.id,evaluateId:$route.query.evaluateId}}">
                <div class="name">{{$WhiteBackground.LimitText(item.memberName, 3)}}<span>新</span></div>
                <div class="sex-old">女 <span>35岁</span>
                  <div class="time">{{$WhiteBackground.timeFn(item.createTime)}}</div>
                </div>
                </router-link>
              </div>
            </div>
          </li>
        </ul>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import api from '../fetch/api'
  export default {
    data() {
      return {
        selected: '',
        title: '评估结果与建议',
        evaluateInsList1: '',
        evaluateInsList2: '',
        evaluateInsList3: ''
      }
    },
    async created() {
      this.selected = '1'
      let params = {
        'doctorId': localStorage.getItem('doctorId'),
        'evaluateId': this.$route.query.evaluateId
      }
      const res1 = await api.post('doctorEvaluate/evaluateInsListFinished.do', params)
      console.log(res1.data)
      if (res1.data.stateCode == '001') {
        this.evaluateInsList1 = res1.data.evaluateInsList
        this.loading = 1
      } else if (res1.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
      const res2 = await api.post('doctorEvaluate/evaluateInsListWorking.do', params)
      console.log(res2.data)
      if (res2.data.stateCode == '001') {
        this.evaluateInsList2 = res2.data.evaluateInsList
        this.loading = 1
      } else if (res2.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
      const res3 = await api.post('doctorEvaluate/evaluateInsListTodo.do', params)
      console.log(res3.data)
      if (res3.data.stateCode == '001') {
        this.evaluateInsList3 = res3.data.evaluateInsList
        this.loading = 1
      } else if (res3.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="less">
  body {
    background: #f5f5f5;
  }
  .comm_suggestion {
    .mint-navbar {
      margin-top: 5.4rem;
      .mint-tab-item {
        .mint-tab-item-label {
          font-size: 1.7rem;
        }
      }
      .mint-tab-item.is-selected {
        border-bottom: 3px solid #10d1a0;
        color: #10d1a0;
        margin-bottom: 0;
      }
    }
    .mint-tab-container {
      .mint-tab-container-item {
        .writeSuggest {
          padding: 0.5rem 1.5rem;
          width: 100%;
          li {
            height: auto;
            overflow: hidden;
            width: 100%;
            background: #ffffff;
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 0.5rem;
            .li-top {
              i {
                display: inline-block;
                width: 5rem;
                height: 5rem;
                img {
                  width: 100%;
                  height: 100%;
                  -webkit-border-radius: 100%;
                  -moz-border-radius: 100%;
                  border-radius: 100%;
                }
              }
              .icon-right {
                float: right;
                width: 81%;
                overflow: hidden;
                margin-top: 0.5rem;
                .name {
                  font-size: 1.5rem;
                  width: 36%;
                  float: left;
                  margin-left: 1rem;
                  span {
                    display: block;
                    font-size: 1.2rem;
                    color: #ff9b0d;
                    margin-top: 0.7rem;
                  }
                }
                .sex-old {
                  width: 60%;
                  float: right;
                  font-size: 1.2rem;
                  color: #999999;
                  margin-top: 0.2rem;
                  span {
                    margin-left: 0.8rem;
                  }
                  .time {
                    font-size: 1.2rem;
                    color: #999999;
                    float: right;
                  }
                }
              }
            }
            h4 {
              font-size: 1.4rem;
              margin-top: 2rem;
              span {
                margin-left: 0.4rem;
              }
            }
            .li-suggest {
              font-size: 1.4rem;
              overflow: hidden;
              margin-top: 1rem;
              p {
                width: 76%;
                float: right;
              }
            }
          }
        }
        .writing {
          li {
            padding: 1.5rem 0 0 0;
            .li-top {
              padding: 0 1.5rem;
            }
            h4 {
              padding: 0 1.5rem;
            }
            .li-suggest {
              padding: 0 1.5rem;
            }
            .li-btn {
              width: 100%;
              padding: 1.2rem 0;
              border-top: solid 1px #d9d9d9;
              margin-top: 1.5rem;
              span {
                display: inline-block;
                width: 50%;
                font-size: 1.5rem;
                color: #10d1a0;
                text-align: center;
              }
              span:first-of-type {
                border-right: solid 1px #d9d9d9;
              }
            }
          }
        }
      }
    }
  }
</style>
