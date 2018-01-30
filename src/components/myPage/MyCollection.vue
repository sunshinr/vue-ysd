<template>
  <div class="my-collection-wrap">

    <HeaderBar3 title="我的收藏"></HeaderBar3>
    <div class="my-collection">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">评估</mt-tab-item>
        <mt-tab-item id="2">方案</mt-tab-item>
        <mt-tab-item id="3">知识</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <!--评估-->

          <div class="my-collection-evaluation " v-if="evaluationArr.length>0">
            <dl v-for="evaluationItem in evaluationArr">
              <router-link :to="{path: '/ViewEvaluation', query: {evaluateId: evaluationItem.doctorEvaluateId}}">
              <dt class="clear"><span v-text="evaluationItem.evaluateTitle"></span> <span
                class="object-num" v-text="evaluationItem.questionNumber + '项'"></span></dt>
              <dd class="clear"><i class="jinbi-icon"></i>{{evaluationItem.evaluateScore}} <span>已评估 <span
                v-text="evaluationItem.evaluateDoNumber"></span> 次</span></dd>
              </router-link>
            </dl>
          </div>

          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无收藏评估" v-if="evaluationArr.length===0"></NoData>
        </mt-tab-container-item>

        <mt-tab-container-item id="2">
          <!--方案-->
          <div class="my-collection-evaluation" v-if="programmeArr.length>0">

            <dl v-for=" programmeItem in programmeArr">
              <router-link :to="'/ProgrammeDetails'+ programmeItem.schemeId">
              <dt class="clear"><span v-text="programmeItem.schemeName"></span>
              </dt>
              <dd class="clear"><i class="jinbi-icon"></i>{{programmeItem.schemeScore}} <span>已评估 <span
                v-text="programmeItem.schemeDoNum"></span> 次</span></dd>
              </router-link>
            </dl>
          </div>

          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无收藏方案" v-if="programmeArr.length===0"></NoData>
        </mt-tab-container-item>

        <mt-tab-container-item id="3">

          <!--知识-->
          <div class="my-collection-knowledge" v-if="knowledgeArr.length>0">
            <dl v-for="knowledgeItem in knowledgeArr">
              <router-link :to="{path:'/KnowledgeDetails', query: {id: knowledgeItem.knowledgeId}}">
              <dt><img :src="knowledgeItem.doctorAvatar"> {{knowledgeItem.doctorName}} <span> <i
                class="icon iconfont icon-biaoqian" v-if="knowledgeItem.keywordList.length>0"></i> <span v-for=" i in knowledgeItem.keywordList" v-text="i"></span> </span></dt>
              <dd v-text="knowledgeItem.name"></dd>
              <dd v-text="knowledgeItem.synopsis"></dd>
              </router-link>
            </dl>
          </div>
          <NoData imgUrl="/static/images/nodata/null4.png" hintTxt="暂无收藏知识" v-if="knowledgeArr.length===0"></NoData>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data () {
      return {
        selected: '1',
        evaluationArr: [],
        programmeArr: [],
        knowledgeArr: []
      }
    },
    created () {
    },
    async mounted () {
      let params = {
        doctorId: localStorage.getItem('doctorId'),
        currentPage: 10,
        pageSize: 1
      }
      const evaluationRes = await this.$api.post('personalCenter/collectionEvaluateList.do', params)
      this.evaluationArr = evaluationRes.data.evaluateList

      const programmeRes = await this.$api.post('personalCenter/collectionSchemeList.do', params)
      this.programmeArr = programmeRes.data.schemeList
      console.log(this.programmeArr)


      const knowledgeRes = await this.$api.post('personalCenter/collectionKnowledgeList.do', params)
      this.knowledgeArr = knowledgeRes.data.knowledgeList
    },
    methods: {},
    components: {},
    filters: {}

  }
</script>


<style lang="less">
  .my-collection {
    margin-top: 6rem;
  .mint-navbar {
    position: fixed;
    top: 5.5rem;
    left: 0;
    right: 0;
    width: 100%;
    border-bottom: solid 1px #d9d9d9;
    z-index: 2;
  }
  .my-collection-evaluation {
    margin-top: 5.5rem;

  dl {
    background: #ffffff;
    padding: 1.7rem 1.5rem 1.5rem;
    border-bottom: 1px solid #d9d9d9;

  &:last-of-type {
    border-bottom: none;
  }

  dt {
    color: #444444;
    font-size: 1.7rem;
    margin-bottom: 1rem;

  span {

  &:first-child {
    display: inline-block;
    width: 26rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  }
  .object-num {
    float: right;
    font-size: 1.4rem;
    color: #666666;
  }

  }
  dd {
    font-size: 1.4rem;
    color: #ff9313;

  &> span {
    float: right;
    color: #666666;

  span {
    color: #ff9313;
  }

  }

  }
  }
  }
  .jinbi-icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background: url("../../../static/img/kangbi_03.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: bottom;
    margin-right: 0.7rem;
    position: relative;
    top: 0.1rem;
  }

  .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #10d1a0;
    color: #10d1a0;
    margin-bottom: 0;
  }

  .mint-tab-item-label {
    font-size: 1.7rem !important;
  }

  }

  .my-collection-knowledge {
    margin-top: 5.5rem;

  dl {
    background: #ffffff;
    padding: 1.3rem 1.5rem;
    border-bottom: 1px solid #d9d9d9;

  &:last-of-type {
    border-bottom: none;
  }

  dt {
    font-size: 1.7rem;
    color: #444;

  &>span {
    float: right;
    font-size: 1.3rem;
    position: relative;
    top: 0.5rem;
    color: #666666;

  i {
    font-size: 1.3rem;
    color: #ff9313 !important;
  }

  }

  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 0.5rem;

  }

  }

  dd {
    font-size: 1.5rem;
    color: #333333;
    margin-top: 1.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;

    &:first-of-type{
      font-weight: bold;
    }
  }

  }
  }

</style>
