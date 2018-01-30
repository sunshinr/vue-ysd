<template>
  <div class="search-wrap" id="white-background">
    <div class="common-search">
      <div class="search-header">
        <i class="icon iconfont icon-arrow-left-copy turn-back" @click="turnBack"></i>
        <input type="text" placeholder="请输入搜索内容" v-model="inputVal"  @keyup.13="searchFn(inputVal)"
               autofocus="autofocus">
        <i class="icon iconfont icon-sousuo"></i>
        <i class="icon iconfont icon-huaban" @click="empty"></i>
        <span @click="goback(inputVal)" v-text="text"></span>
      </div>
    </div>
    <!--<searchHeader :search="hotItem"></searchHeader>-->
    <div class="search-main" id="search-main">
      <h3> 搜索范围 </h3>
      <ul class="clear" id="search-range">
        <li v-for="(i, index) in searchRange" :key="index" v-text="i" @click="searchType(i, index)"></li>
      </ul>
    </div>

    <div class="search-main">
      <h3> 热门 </h3>
      <ul class="clear" id="hotBox">
        <li v-for="(item, index) in hotTag" :key="index" @click="addHot(item.hotWordsName, index)">{{item.hotWordsName}}</li>
      </ul>
    </div>

  </div>
</template>


<script>
  import searchHeader from './Comsearch.vue'

  export default {
    name: '',
    data () {
      return {
        hotTag: [],
        searchRange: ['问题', '学堂', '评估检测', '健康方案'],
        hotItem: '',
        inputVal: '',
        text: '取消',
        currentTag: ''
      }
    },
    created () {
      this.hotTagApi()
    },
    mounted () {
      this.$WhiteBackground.whiteBg()
    },
    watch: {
      inputVal (curVal,oldVal) {
        if (curVal.length > 0) {
          this.text = '搜索'
        } else {
          this.text = '取消'
        }
      }
    },
    methods: {
      async hotTagApi () {
        let params = {
        }
        const res = await this.$api.post('index/hotWordsList.do', params)
        console.log(res.data)
        if (res.data.stateCode === '001') {
          for (var i=0; i<res.data.hotList.length; i++) {
            this.hotTag.push(res.data.hotList[i])
          }
        }
      },
      searchType (val, n) {
        $('#search-range').find('li').removeClass('active')
        this.currentTag = val
        $('#search-range').find('li').eq(n).addClass('active')
      },
      addHot (val, n) {
        $('#hotBox').find('li').removeClass('active')
        this.inputVal = val
        $('#hotBox').find('li').eq(n).addClass('active')
      },
      searchFn (val) {
        if (this.text !== '取消') {
          if (this.currentTag !== '') {
            /* 在当前所选搜索范围的标签中搜 */
            this.$router.push({
              path: '/SearchResult2',
              query: {searchKeyWord: this.currentTag + ',' + val}
            })
          } else {
            /* 在全部里面搜 */
            this.$router.push({
              path: '/SearchResult1',
              query: {sInputWord: val}
            })
          }
        }
      },
      goback (val) {
        if (this.text === '取消') {
          this.$router.push({
            path: '/'
          })
        } else {
          if (this.currentTag !== '') {
            /* 在当前所选搜索范围的标签中搜 */
            this.$router.push({
              path: '/SearchResult2',
              query: {searchKeyWord: this.currentTag + ',' + val}
            })
          } else {
            /* 在全部里面搜 */
            this.$router.push({
              path: '/SearchResult1',
              query: {sInputWord: val}
            })
          }
        }
      },
      turnBack () {
        this.$router.go(-1)
      },
      empty () {
        this.inputVal = ''
      }
    },
    filters: {}
  }
</script>


<style lang="less">
  @color999999 : #999999;
  @bordercolor : #d9d9d9;
  @color666666 : #666666;
  @color333333 : #333333;

  html, body {
    height: 100%;
  }
  .search-header {
    position: fixed;
    width: 100%;
    top: 0;
    color: @color999999;
    padding: 1rem 1.5rem;
    background: #10d1a0;
    z-index: 9;

    input {
      width: 77%;
      padding: 0.6rem 1rem 0.6rem 4rem;
      margin: 0.7rem 0;
      border-radius: 2rem;
      font-size: 1.4rem;
      color: @color999999;
      background: #96ebd5;
    }

    i {
      font-size: 2rem;
    }

    .icon-sousuo {
      position: absolute;
      top: 2.2rem;
      left: 5.25rem;
    }

    .icon-huaban {
      position: absolute;
      top: 2.2rem;
      right: 7.3rem;
    }

    span {
      color: #ffffff;
      font-size: 1.6rem;
      margin-left: 0.9rem;
    }
    .turn-back{
      color: #ffffff;
      font-size: 2.2rem;
      vertical-align: middle;
      margin-right: 0.6rem;
    }

  }

  .search-wrap {

  #search-main {
    padding-top: 9rem;
  }

  .search-main {
    padding: 2rem 1.5rem;

  h3 {
    color: @color666666;
    font-size: 1.6rem;
  }

  ul {
    margin-top: 1.5rem;

  li {
    padding: 0.7rem 2rem;
    font-size: 1.5rem;
    color: @color333333;
    float: left;
    background: #f5f5f5;
    margin: 0 1.5rem 1.3rem 0;
    border-radius: 2rem;
  }
    li.active{
      color: #ffffff;
      background: #10d1a0;
    }
  }
  }
  }

</style>
