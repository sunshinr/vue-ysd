<template>
  <div class="putQuestion">
    <div class="putQuestion-hearder">
      <headerBar3 title="提问"></headerBar3>
      <label @click="addQuestionApi">发布</label>
    </div>

    <div class="input_box">
      <input type="text" v-model="title" placeholder="输入标题" maxlength="20">
    </div>
    <div class="input_box">
      <label>标签</label>
      <div id="staggered-list-demo">
        <input v-model="query" placeholder="搜索标签" v-on:focus="focusFn" @keyup.13="keyupFn($event)">

        <transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter"
                          v-on:enter="enter" v-on:leave="leave" v-show="searchStatus" class="search-wrap">
          <li v-for="(item, index) in computedList" v-bind:key="item.keywordName" v-bind:data-index="index"
              @click="getLabText(item.keywordName,item.id)">{{ item.keywordName }}
          </li>
        </transition-group>
      </div>

      <div class="label_span">
        <ul class="subjectList">
          <li v-for="(item, index) in labelLists" :key="index">
            <span>{{item}}</span>
            <i class="icon iconfont icon-guanbi1" @click="deleteFn(index)"></i>
          </li>
        </ul>

      </div>
    </div>
    <div class="input_box">
      <textarea name="" id="" cols="30" rows="10" v-model="describe" placeholder="问题描述不得少于十个字" maxlength="1000"></textarea>
    </div>


  </div>
</template>


<script>
  import { MessageBox } from 'mint-ui'
  import '../../../../static/js/velocity.min'

  export default {
    data () {
      return {
        labelList: [], // 标签数组
        newLabelList: [],// 新标签数组
        labelIdArr: [], // 标签id数组
        query: '',// 标签输入框内容
        GetLabelsList: [],// 后台标签数族
        searchStatus: false,// 搜索结果列表显示状态
        describe: '',// 描述内容
        title: '',// 标题内容
        labelLists: []
      }
    },
    created () {
      this.getLabelsApi()
    },
    methods: {
      // 获取搜索补全数据
      async getLabelsApi () {
        let getLabelsParams = {
          doctorId: localStorage.getItem('doctorId'),
        }
        let getLabelsRes = await this.$api.post('column/getIllKeywords.do', getLabelsParams)
        if (getLabelsRes.data.stateCode == '001') {
          this.GetLabelsList = getLabelsRes.data.illKeywordList
        }
      },
      // 点击发布
      async addQuestionApi () {

        let addQuestionParams = {
          title: this.title,
          doctorId: localStorage.getItem('doctorId'),
          describe: this.describe,
          labelList: this.labelIdArr.join(','),
          keywords: this.newLabelList.join(',')
        }
        let _this = this
        if (this.title !== '') {
          if (this.describe.length > 10) {
            const getLabelsRes = await this.$api.post('interlocution/addQuestion.do', addQuestionParams)
            if (getLabelsRes.data.stateCode == '001') {
              MessageBox.alert(getLabelsRes.data.message).then(function () {
                _this.$router.push({
                  path: '/QandA'
                })
              })
            }
          } else {
            MessageBox.alert('问题描述不能少于10个字不能空')
          }
        } else {
          MessageBox.alert('问题标题不能空')
        }
      },
      beforeEnter: function (el) {
        el.style.opacity = 0
      },
      enter: function (el, done) {
        Velocity(
          el,
          {opacity: 1},
          {complete: done}
        )
      },
      leave: function (el, done) {

        Velocity(
          el,
          {opacity: 0},
          {complete: done}
        )
      },
      // 点击搜索结果标签
      getLabText (text, id) {
        this.searchStatus = false
        this.query = ''
        if (this.labelLists.length < 3) {
          this.labelList.push({
            text: text,
            id: id
          })
          this.labelIdArr.push(id)
          this.labelLists.push(text)
          this.$WhiteBackground.unique(this.labelLists)
          this.$WhiteBackground.unique(this.labelIdArr)

        } else {
          MessageBox.alert('标签最多为三个')
        }
      },
      // 删除标签
      deleteFn (n) {
        var labelList = this.labelList[n]
        if (labelList.id !== null) {
          this.removeFn(this.labelIdArr, labelList.id)
        }
        this.labelLists.splice(n, 1)
      },
      // 键盘添加标签
      keyupFn (ev) {
        if (ev.keyCode === 13) {
          if (this.query.length > 0) {
            if (this.labelLists.length < 3) {
              this.newLabelList.push(this.query)
              this.labelList.push({
                text: this.query,
                id: null
              })
              this.labelLists.push(this.query)
              this.$WhiteBackground.unique(this.labelLists)
              this.$WhiteBackground.unique(this.newLabelList)
              this.searchStatus = false

            } else {
              MessageBox.alert('标签最多为三个')
              this.searchStatus = false
            }
            this.query = ''
          }
        }
      },
      focusFn () {
        this.searchStatus = true
      },
      removeFn (arr, val) {
        var index = arr.indexOf(val)
        if (index > -1) {
          arr.splice(index, 1)
        }
      }
    },
    computed: {
      computedList: function () {
        var vm = this
        return this.GetLabelsList.filter(function (item) {
          return item.keywordName.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
        })
      }
    },
    components: {MessageBox}
  }
</script>

<style lang="less">
  .putQuestion {
    padding: 5.4rem 0 1rem 0;
    background: #fff;

  .putQuestion-hearder {
    position: relative;

  label {
    position: fixed;
    right: 1.5rem;
    top: 1.7rem;
    color: #fff;
    z-index: 999;
    font-size: 1.4rem;
  }

  }

  .input_box {
    padding: 1.5rem;

  label {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    display: inline-block;
  }

  .label_span {
    margin-top: 1.5rem;

  button {
    display: inline-block;
    color: #fff;
    padding: 0.6rem 2.5rem 0.6rem 1.5rem;
    border-radius: 2rem;
    font-size: 1.5rem;
    margin: 0 1.6rem 0.5rem 0;
    position: relative;

  .icon-cuowutishi {
    position: absolute;
    right: 0.5rem;
    top: 0.2rem;
    font-size: 1.4rem;
  }

  }

  .bg_disabled {
    background: #ccc;
  }

  .bg_green {
    background: #10d1a0;
  }

  }
  input {
    background: #f5f5f5;
    width: 100%;
    font-size: 1.5rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
  }

  textarea {
    border: solid 1px #d9d9d9;
    width: 100%;
    font-size: 1.5rem;
    padding: 1rem;
    border-radius: 0.5rem
  }

  }
  #staggered-list-demo {
    position: relative;
  }

  .search-wrap {
    width: 100%;
    position: absolute;
    background: #fff;
    z-index: 2;
    max-height:28.8rem;
    overflow: auto;

  li {
    border: 1px solid #f5f5f5;
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
    color: #999999;

  }

  }
  .subjectList {
    overflow: hidden;
    margin-top: 1.2rem;

  li {
    float: left;
    margin-right: 1.4rem;
    border: solid 1px #10d1a0;
    border-radius: 0.2rem;

  span {
    color: #ffffff;
    font-size: 1.3rem;
    padding: 0.4rem 0.8rem;
    background: #10d1a0;
    display: block;
  }

  i {
    display: block;
    text-align: center;
    color: #10d1a0;
    font-size: 1.6rem;
  }

  }
  }
  }
</style>
