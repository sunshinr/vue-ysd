<template>
  <div class="common-search">
    <div class="search-header">
      <input type="text" placeholder="请输入搜索内容" v-model="inputVal"  @keyup.13="searchFn(inputVal)"
             autofocus="autofocus">
      <i class="icon iconfont icon-sousuo"></i>
      <i class="icon iconfont icon-huaban" @click="empty"></i>
      <span @click="goback(inputVal)" v-text="text"></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        inputVal: '',
        text: '取消',
        currentVal: ''
      }
    },
    props: ['search', 'currentTag'],
    created () {
      console.log(this.search)
      this.inputVal = this.search
    },
    mounted () {
    },
    watch: {
      inputVal (curVal,oldVal) {
        if (curVal.length > 0) {
          this.text = '搜索'
        } else {
          this.text = '取消'
        }
      },
      search (curVal,oldVal) {
        this.inputVal = curVal
      },
      currentTag (curVal,oldVal) {
        this.currentVal = curVal
      }
    },
    methods: {
      searchFn (val) {
        this.$router.push({
          path: '/SearchResult',
          query: {
            sInputWord: val
          }
        })
      },
      goback (val) {
        if (this.text == '取消') {
          this.$router.go(-1)
        } else {
          if (this.currentVal != ''){
            /*在当前所选标签中搜*/
            this.$router.push({
              path: '/SearchResult',
              query: {searchKeyWord: this.currentVal + ',' + val}
            })
          } else {
            /*在全部里面搜*/
            this.$router.push({
              path: '/SearchResult',
              query: {sInputWord: val}
            })
          }
        }
      },
      empty () {
        this.inputVal = ''
      }
    },
    components: {},
    filters: {}

  }
</script>


<style lang="less" scoped>
  @color999999 : #999999;
  @bordercolor : #d9d9d9;
  @color666666 : #666666;
  @color333333 : #333333;
  .search-header {
    position: fixed;
    width: 100%;
    top: 0;
    color: @color999999;
    padding: 1rem 1.5rem;
    background: #10d1a0;
    z-index: 9;

  input {
    width: 86%;
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
    left: 2.65rem;
  }

  .icon-huaban {
    position: absolute;
    top: 2.2rem;
    right: 7.2rem;
  }

  span {
    color: #ffffff;
    font-size: 1.6rem;
    margin-left: 0.9rem;
  }

  }
</style>
