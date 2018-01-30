<template>
  <div class="sarch-wrap">
    <div class="invitation-answer-search">
      <input type="text" placeholder="请输入姓名..." v-model="searchName">
      <i class="icon iconfont icon-sousuo" @click="goSearch"></i>
    </div>

  </div>
</template>


<script>
  import { MessageBox } from 'mint-ui'

  export default {
    name: '',
    data () {
      return {
        searchName: '',
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {
      goSearch () {
        if (this.searchName.length > 0) {
          this.$router.push({
            path: '/InvitationSearchResult',
            query: {
              name: this.searchName,
              questionId: this.$route.query.questionId,
            }
          })
        } else {
          MessageBox.alert('请输入要搜索的医师姓名')
        }
      },
    },
    components: {
      MessageBox
    },
    filters: {}

  }
</script>


<style lang="less" scoped>
  @color999999 : #999999;
  @bordercolor : #d9d9d9;
  .invitation-answer-search {
    position: relative;
    color: @color999999;
    margin-top: 5.5rem;
    padding: 0 1.5rem;

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 4rem;
    margin: 0.7rem 0;
    border-radius: 2rem;
    font-size: 1.4rem;
    color: @color999999;
  }

  i {
    position: absolute;
    top: 1.55rem;
    left: 2.7rem;
    font-size: 2rem;
    color: @color999999;
  }

  }
</style>
