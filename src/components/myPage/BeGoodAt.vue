<template>
  <div class="goodAt">
      <HeaderBar3 title="管理擅长" titleBtnTxt="" titleUrl="/completeInfo"></HeaderBar3>
      <span class="sure-btn" @click="sureBtn">确定</span>
    <div class="hasChoice">
      <h4>已选择<span>最多三个</span></h4>
      <ul v-if="tagShow">
         <li class="subjectList" v-for="(item, index) in hasTag" :key="index">
           <span v-text="item.subject">{{item.subject}}</span>
           <i class="icon iconfont icon-guanbi1" @click="cancelTag(index)"></i>
         </li>
      </ul>
    </div>
    <mt-index-list>
       <mt-index-section v-for="(list, _index) in firstSpellArr" :index="list" :key="_index">
         <span v-for="(item, index) in tag['tag' + list]" :key="index" @click="selectTag(index, ('tag' + list))">
           <mt-cell :title="item.keywordName" :class="{ 'active': item.check }"></mt-cell>
         </span>
       </mt-index-section>
    </mt-index-list>
    <div class="suggestBtn">
      <input type="text" placeholder="没有合适的？请在此输入" v-model="userSubject">
      <span @click="send">提交</span>
    </div>
  </div>
</template>


<script>
  import {IndexList, IndexSection, Toast} from 'mint-ui'

  export default {
    name: '',
    data() {
      return {
        titleUrl: '',
        goodAt: [], // 传递给我的信息页面的擅长数组
        hasTag: [],
        userSubject: '',
        temporaryArr: [],
        firstSpellArr: [], // 存放所有首字母
        tag: {},
        tagShow: false
        /* tag: {
          tagA: [{tit: '内科', check: true}, {tit: '儿科', check: false}],
          tagB: [{tit: '内科', check: true}, {tit: '儿科', check: false}]
        } */
      }
    },
    created () {
      this.loadApi()
      let hasTagArr = []
      var _this = this
      hasTagArr = JSON.parse(localStorage.getItem('goodAtArr'))
      console.log(hasTagArr)
      setTimeout(function () {
        if (hasTagArr!=null) {
          for (var i=0; i<hasTagArr.length; i++) {
            _this.hasTag.push(hasTagArr[i])
            _this.tagShow = true
            for (var j=0; j<_this.temporaryArr.length; j++) {
              if (hasTagArr[i].id === _this.temporaryArr[j].id) {
                _this.temporaryArr[j].check = true
              }
            }
          }
        }
      }, 300)
    },
    mounted () {
      // this.loadApi()
    },
    methods: {
      async loadApi() {
        let params = {
          doctorId: localStorage.getItem('doctorId')
        }
        const res = await this.$api.post('column/getIllKeywords.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          this.temporaryArr = res.data.illKeywordList
          /* 将数据按字母进行排序 */
          this.temporaryArr.sort(this.sortBy('firstSpell', false, String))
          console.log(this.temporaryArr)
          for (var i = 0; i < this.temporaryArr.length; i++) {
            this.temporaryArr[i].check = false // 给对象中添加未选中的标志
            var variate2 = this.temporaryArr[i].firstSpell
            switch (variate2) {
              case variate2:
                this.sortLetter(variate2, i)
                break;
              default:
                console.log('没有该字段信息')
            }
          }
          console.log(this.tag)
          for (var key in this.tag) {
            // 存放的索引字母
            this.firstSpellArr.push(key.substr(-1))
          }
          console.log(this.firstSpellArr)
        }
      },
      sortBy(filed, rev, primer){
        rev = (rev) ? -1 : 1;
        return function (a, b) {
          a = a[filed];
          b = b[filed];
          if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
          }
          if (a < b) { return rev * -1; }
          if (a > b) { return rev * 1; }
          return 1;
        }
      },
      sortLetter (s, n) {
        if (!this.tag['tag' + s]) {
          this.tag['tag' + s] = []
        }
        this.tag['tag' + s].push(this.temporaryArr[n])
      },
      selectTag (n, arrName){
        this.tagShow = true
        //console.log(this.tag[arrName][0])
        if (this.hasTag.length < 3) {
          if (this.tag[arrName][n].check === false) {
            this.hasTag.push({subject: this.tag[arrName][n].keywordName, id: this.tag[arrName][n].id})
            this.tag[arrName][n].check = true
            console.log(this.hasTag)
          }
        }
      },
      cancelTag (n) {
        // console.log(this.hasTag[n])
        // console.log(this.tag[source])
        for (var i = 0; i < this.temporaryArr.length; i++) {
          if (this.hasTag[n].id === this.temporaryArr[i].id) {
            this.temporaryArr[i].check = false
          }
        }
        this.hasTag.splice(n, 1)
      },
      async send () {
        if (this.userSubject !== '') {
          let params = {
            doctorId: localStorage.getItem('doctorId'),
            keywordName: this.userSubject
          }
          const res = await this.$api.post('column/addIllKeywords.do', params)
          console.log(res.data)
          if (res.data.stateCode === '001') {
            let instance = Toast({message: '已提交，审核通过后客服人员将会联系通知您', position: 'bottom'})
            setTimeout(() => {
              instance.close()
            }, 2000)
          }
        }
      },
      sureBtn () {
        console.log(this.hasTag)
        localStorage.setItem('goodAtArr', JSON.stringify(this.hasTag))
        console.log(this.hasTag)
        this.$router.go(-1)
      }
    },
    components: {
      IndexList,
      IndexSection,
      Toast
    },
    filters: {}
  }
</script>


<style lang="less">
  .goodAt {
    .sure-btn{
      position: fixed;
      right: 1.5rem;
      top: 1.6rem;
      z-index: 100;
      font-size: 1.4rem;
      color: white;
    }
    .hasChoice {
      margin-top: 5.5rem;
      padding: 1.5rem 0.7rem 1rem 1.5rem;
      background: #ffffff;
      h4 {
        font-size: 1.5rem;
        color: #777777;
        > span {
          font-size: 1.3rem;
          float: right;
        }
      }
      ul {
        overflow: hidden;
        margin-top: 1.2rem;
        .subjectList {
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
    .mint-indexlist {
      margin-bottom: 5.5rem;
      .mint-indexsection-index {
        font-size: 1.5rem;
        color: #999999;
      }
      ul {
        background: #ffffff;
        span {
          display: inline-block;
          .mint-cell {
            display: inline-block;
            .mint-cell-wrapper {
              padding: 1rem 0 1rem 1.5rem;
            }
            .mint-cell-title {
              border: solid 1px #10d1a0;
              padding: 0.4rem 1rem;
              border-radius: 0.3rem;
              .mint-cell-text {
                font-size: 1.4rem;
                color: #10d1a0;
              }
            }
          }
          .mint-cell.active {
            .mint-cell-title {
              background: #10d1a0;
              .mint-cell-text {
                color: #ffffff;
              }
            }
          }
        }
      }
    }
    .suggestBtn {
      width: 100%;
      padding: 0.7rem;
      background: #fafafa;
      border-top: solid 1px #d9d9d9;
      position: fixed;
      left: 0;
      bottom: 0;
      input {
        width: 75%;
        border: solid 1px #d9d9d9;
        -webkit-border-radius: 0.4rem;
        -moz-border-radius: 0.4rem;
        border-radius: 0.4rem;
        font-size: 1.5rem;
        padding: 0.9rem;
      }
      span {
        display: inline-block;
        width: 22%;
        background: #10d1a0;
        color: #ffffff;
        padding: 1rem 0;
        font-size: 1.4rem;
        float: right;
        text-align: center;
        border-radius: 0.3rem;
      }
    }
  }

</style>
