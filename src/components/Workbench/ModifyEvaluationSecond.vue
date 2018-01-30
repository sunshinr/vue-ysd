<template>
  <div class="add-evaluation-second-wrap">
    <HeaderBar3 title="修改评估"></HeaderBar3>
    <span class="yulan"  @click="save()">预览</span>
    <div class="add-evaluation-second-main" >
      <mt-navbar v-model="selected">
        <mt-tab-item id="0">单选</mt-tab-item>
        <mt-tab-item id="1">多选</mt-tab-item>
        <mt-tab-item id="2">问答</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="0">
          <!--单选-->
          <div class="add-evaluation-second">
            <div>
              <h3>标题</h3>
              <input type="text" placeholder="请在此输入问题标题" v-model="questionTitle">
            </div>
            <div>
              <h3>选项</h3>
              <div v-for="(value,index) of num" :key="value.id" class="option_box">
                <input placeholder="请输入选项内容" v-model="num[index].content">
                <span @click="deleteOption(index)">删除</span>
              </div>
              <button type="button" @click="addOption">添加选项</button>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <!--多选-->
          <div class="add-evaluation-second">
            <div>
              <h3>标题</h3>
              <input type="text" placeholder="请在此输入问题标题" v-model="questionTitle">
            </div>
            <div>
              <h3>选项</h3>
              <div v-for="(value,index) of num" :key="value.id" class="option_box">
                <input placeholder="请输入选项内容" v-model="num[index].content">
                <span @click="deleteOption(index)">删除</span>
              </div>
              <button type="button" @click="addOption">添加选项</button>
              <h3 class="add-evaluation-second-choose">最少选择 <input type="text" placeholder="1" v-model="least"> 项</h3>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!--问答-->
          <div class="add-evaluation-second">
            <div>
              <h3>标题</h3>
              <input type="text" placeholder="请在此输入问题标题" v-model="questionTitle">
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <ul class="clear button-wrap">
        <li>
          <button @click="tipNumPrevFn()">上一题</button>
        </li>
        <li>
          <button @click="tipNumNextFn()">下一题</button>
        </li>
      </ul>
      <ul class="clear tip-wrap">
        <li v-for="(value,key,index) in  maxnum" @click="tipNumchangeBg(value)" :key="value.id">{{value}}</li>
      </ul>
    </div>
  </div>
</template>


<script>
  export default {
    name: "",
    data: function() {
      return {
        titleUrl: "/AnomalyAssessment", // 头部点击预览跳转路径
        selected: "1",
        // 单选
        tipnum: 1, // 单选当前题号
        maxnum:20,
        questionTitle: "",
        num: [{
          option: "A",
          content: ""
        }, {
          option: "B",
          content: ""
        }],
        optionLetters: ["A", "B", "C", "D", "E", "F", "G", "H"],
        evaluateQuestion: {
          optionNum: "",
          questionTitle: "",
          questionContent: "",
          optionType: "",
          leastChoice:""          
        },
        Temporary: [],
        evaluateQuestionList: [],
        asdgahs: "",
        least:"",
        evaluateTitle:this.$route.query.evaluteName
      };
    },
    created() {
      this.evaluateQuestionList=(JSON.parse(localStorage.getItem("evaluateInsInfo"))).evaluateInsInfo
      for(let i=0;i<this.evaluateQuestionList.length;i++){
        this.evaluateQuestionList[i]=JSON.stringify(this.evaluateQuestionList[i])
      }
    },
    mounted() {
      this.tipNumchangeBg(this.tipnum);
    },
    methods: {
      addOption() {
        var kk = {
          content: '',
          option: this.optionLetters[this.num.length]
        };
        this.num.push(kk);
        console.log(this.num)
      },
      deleteOption(index) {
        if(this.num.length>2){
        console.log(index);
        this.num.splice(index, 1);
        this.optionSort();
        console.log(this.num);
        }else{
          alert("最少保留两个选项")
        }
      },
      optionSort() {
        for (let i = 0; i < this.num.length; i++) {
          this.num[i].option = this.optionLetters[i];
        }
      },
      tipNumNextFn() {
        //this.num=JSON.stringify(this.num)
        //console.log(this.Temporary)
        if(this.tipnum<this.maxnum){
        this.evaluateQuestion.optionNum = this.tipnum;
        this.evaluateQuestion.questionTitle = this.questionTitle;
        this.evaluateQuestion.questionContent = this.num;
        this.evaluateQuestion.optionType = this.selected;
        this.evaluateQuestion.leastChoice = this.least
        //this.evaluateQuestion = JSON.stringify(this.evaluateQuestion)
        this.Temporary = JSON.stringify(this.evaluateQuestion);
        //this.evaluateQuestionList.push(this.Temporary);
        if (this.evaluateQuestionList[this.tipnum - 1]) {
          this.evaluateQuestionList.splice(this.tipnum - 1, 1, this.Temporary)
        } else {
          this.evaluateQuestionList.push(this.Temporary);
        }
        console.log(this.evaluateQuestionList);
        this.tipnum++;
        this.tipNumchangeBg(this.tipnum);
        }else{
          alert("请点击预览，不能再添加了")
        }
      },
      async tipNumPrevFn() {
        this.asdgahs = JSON.stringify(this.evaluateQuestionList);
        console.log(this.asdgahs);
        let params = {
          evaluateQuestion: JSON.stringify(this.evaluateQuestionList)
        };
        const res = await this.$api.post(
          "doctorEvaluate/saveEvaluate.do",
          params
        );
        console.log(res.data);
      },
      tipNumchangeBg(num) {
        // 变色函数
        $(".tip-wrap li").removeClass("tip-active");
        $(".tip-wrap li")
          .eq(num - 1)
          .addClass("tip-active");
        this.tipnum = num
        //console.log(this.evaluateQuestionList);
        this.reviseSubject(num)
      },
      reviseSubject(num) {
        console.log(num)
        let TemporarySub = []
        if (this.evaluateQuestionList.length > 0) {
          for (let i = 0; i < this.evaluateQuestionList.length; i++) {
            let thisSubject = JSON.parse(this.evaluateQuestionList[i])
            //console.log(thisSubject.optionNum)
            if (thisSubject.optionNum === num) {
              console.log(thisSubject);
              this.optionNum = thisSubject.optionNum
              this.questionTitle = thisSubject.questionTitle
              for (let j = 0; j < thisSubject.questionContent.length; j++) {
                let opSub = {
                  option: thisSubject.questionContent[j].option,
                  content: thisSubject.questionContent[j].content
                }
                TemporarySub.push(opSub)
                this.num = TemporarySub
                // this.num[j].option=thisSubject.questionContent[j].option
                // this.num[j].content=thisSubject.questionContent[j].content
              }
              this.selected = thisSubject.optionType
            } else if (thisSubject.optionNum < num) {
              this.num = [{
                option: "A",
                content: ""
              }, {
                option: "B",
                content: ""
              }];
              this.questionTitle = "";
            }
          }
        }
      },
      save (){
      localStorage.setItem('evaluateQuestion',JSON.stringify(this.evaluateQuestionList));
      localStorage.setItem('evaluateTitle',this.evaluateTitle);
      this.$router.push({
          path: '/AnomalyAssessment',
          query:{type:'updata',evaluateId:this.$route.query.evaluateId}
      })
      }
    },
    components: {},
    filters: {}
  };
</script>


<style lang="less">
  .add-evaluation-second-wrap {
    .yulan{
        position: fixed;
        top: 1.6rem;
        right: 1.2rem;
        color:#fff;
        z-index:9;
        font-size: 1.6rem;
      }
    .add-evaluation-second-main {
      
      margin-top: 5.5rem;
      .add-evaluation-second {
        &>div {
          background: #ffffff;
          padding: 2rem 1.4rem;
          margin-top: 0.5rem;
          h3 {
            color: #333333;
            font-size: 1.7rem;
            margin-bottom: 2rem;
          }
          .option_box {
            background: #f5f5f5;
            margin-bottom: 0.5rem;
            input {
              background: #f5f5f5;
              padding: 1rem 2.5rem;
              font-size: 1.5rem;
              border-radius: 0.3rem;
              width: 90%;
            }
          }
          .add-evaluation-second-choose {
            margin-top: 2rem;
            input {
              text-align: center;
              width: 19rem;
              background: #f5f5f5;
              padding: 1rem 0;
              margin: 0 1rem;
              border-radius: 0.4rem;
            }
          }
          &>input {
            background: #f5f5f5;
            padding: 1rem 2.5rem;
            font-size: 1.5rem;
            border-radius: 0.3rem;
            width: 100%;
            margin-bottom: 0.5rem;
          }
          button {
            width: 38%;
            border: 1px solid #10d1a0;
            color: #10d1a0;
            background: #ffffff;
            padding: 1rem 0;
            margin: 2rem 0 0 31%;
            border-radius: 0.4rem;
            font-size: 1.5rem;
          }
        }
        .tip-wraps {
          .tip-wrap;
        }
        .tip-wd-wrap {
          .tip-wrap;
        }
      }
    }
    .mint-navbar .mint-tab-item.is-selected {
      border-bottom: 3px solid #10d1a0;
      color: #10d1a0;
      margin-bottom: 1px;
    }
    .mint-tab-item-label {
      font-size: 1.7rem !important;
    }
    .button-wrap {
      margin-top: 2.4rem;
      li {
        float: left;
        width: 50%;
        text-align: center;
        button {
          width: 60%;
          background: #10d1a0;
          color: #fff;
          font-size: 1.5rem;
          padding: 1rem 0;
          border-radius: 0.4rem;
        }
      }
    }
    .tip-wrap {
      margin-top: 1.7rem;
      padding: 0 1.5rem;
      li {
        float: left;
        width: 3.8rem;
        height: 3.8rem;
        line-height: 3.8rem;
        text-align: center;
        background: #e0e0e0;
        color: #999999;
        border-radius: 0.4rem;
        margin: 0.4rem 0 0.4rem 0.5rem;
        font-size: 1.5rem;
      }
      .tip-active {
        background: #10d1a0;
        color: #ffffff;
      }
      .tip-added {
        background: #ffffff;
        color: #10d1a0;
        border: 1px solid #10d1a0;
      }
    }
  }
</style>
