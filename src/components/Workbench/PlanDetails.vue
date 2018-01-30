<template>
  <div class="planDetails">
    <headerBar3></headerBar3>
    <!--头像-->
    <div class="canvas">
      <canvas id="planDetailBg" :width="CanvasWidth"  :height="CanvasHeight" >您的浏览器不支持 HTML5 canvas 标签。</canvas>
      <img :src="data.memberImg" id="headImg">
      <p>{{ data.memberName }} <span> {{ data.memberSex | nulltext }} {{ data.memberAge | nulltext  }} 岁</span></p>
    </div>
    <div v-if="loading == 1">
      <div class="speed">
        <span>进度：{{ speed }}</span><span v-show="speed != '暂无进度'">%</span> <mt-progress v-show="speed != '暂无进度'" :value="speed" :bar-height="7"></mt-progress> <router-link :to="'/AdjuTemplate'+ this.$route.params.id" class="Adju_href">调整方案>></router-link>
      </div>
      <!--周完成状态-->
      <ul class="Completion_status mg_b">
        <li v-for="(week,index) in weekList" :key="week" :class="index < 3 ? 'PastTimes':index == 3 ? 'Today':''">
          <i class="icon iconfont" :class="weekState[index] === 1? 'icon-duigou--':weekState[index] === 2?'icon-gantanhao--':'icon-jianhao-'"></i>
          <span>{{ week }}</span>
        </li>
      </ul>
      <!--今日健康数据-->
      <div class="Today_data mg_b">
        <h2>今日健康数据</h2>
        <div class="Today_data_val">
          <div>
            <h3>{{ data.todayStep | nulltext}}</h3>
            <p>步数</p>
          </div>
          <div>
            <h3>{{ todaybloodPressList.diastolicPressure | nulltext }}/{{ todaybloodPressList.systolicPressure | nulltext}}</h3>
            <p>血压</p>
          </div>
          <div>
            <h3>{{ todaybloodSugarList.value }}</h3>
            <p>血糖</p>
          </div>
        </div>
      </div>
      <!--历史健康数据-->
      <div class="history_data mg_b">
        <h2>历史健康数据</h2>
        <div class="echatr_con">
          <mt-button @click="weektab">
            {{ mounthdataT.WeekDisplay }} <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy"></i>
          </mt-button>
          <echartline :weekTdata = 'mounthdataT'></echartline>
        </div>
        <div class="echatr_con">
          <mt-button @click="weektab2">
            {{ mounthdataY.WeekDisplay }} <i class="icon iconfont icon-chevron-copy-copy-copy-copy-copy"></i>
          </mt-button>
          <echartline :weekTdata = 'mounthdataY'></echartline>
        </div>

      </div>
    </div>
    <!--进度-->

  </div>
</template>


<script>
  import { Button } from 'mint-ui'
  import echartling from '../common/echartLine.vue'
  import api from '../fetch/api'
  import loading from '../common/loading.vue'
  export default {
    data () {
      return {
        CanvasWidth: '',
        CanvasHeight: '',
       // headImg :'http://img0.imgtn.bdimg.com/it/u=2008104806,2775140528&fm=27&gp=0.jpg',
        data:'',
        loading:0,
        speed:0,//进度

        // 本周本月切换状态

        //七天内完成状态数据
        weekList:[],
        weekState: ['0','0','0','0','0','0','0'],  //1 已完成  2未完  0未进行

        //舒张压以及收缩压原始数据、处理后今日数据
        bloodPressList:'',
        MonthbloodPressList: [],  //本月舒张压
        todaybloodPressList:'',  //今日舒张压
        MonthsystolicPressure: [], //本月收缩压
        todaybloodSugarList:'',
        weekbloodPressList : [], //周舒张压数据
        weeksystolicPressure : [], //周收缩压数据
        MonthSugarList: [],  //月血糖
        weekSugarList: [], //周血糖

        //血糖今日数据
        bloodSugarList:'',

        TimeData2:[],

        //需要传递数据（收缩压）
        mounthdataT: {
          id:'0', //图表id
          WeekorMonth: '0',
          WeekDisplay: '本周',
          TimeData:[], //X轴参数
          type: [ '收缩压',  '舒张压'],  //线条分类
          color: ['#ff9b0d','#10d1a0'], //线条色彩
          Company: 'mmHg', //Y轴数据单位
          ValData: [
            { valdata:[]},
            { valdata:[]}
            ]  //内容数据
        },

        mounthdataY: {
          id:'1',//图表id
          WeekorMonth: '0',
          WeekDisplay: '本周',
          TimeData: [], //X轴参数
          type: [ '血糖' ],  //线条分类
          color: ['#ff9b0d'], //线条色彩
          Company: 'mmol/L', //Y轴数据单位
          ValData: [
            { valdata:''}
          ]  //内容数据
        }
    }
    },
    mounted () {
      //计算当前星期几函数
     var dd = new Date().getDay();
      function GetDateStr(AddDayCount) {
        var str=''
        var df = AddDayCount%7;
        if (df == 0) {
          str = "星期日";
        } else if (df == 1 || df ==-6) {
          str = "星期一";
        } else if (df == 2 || df ==-5) {
          str = "星期二";
        } else if (df == 3 || df ==-4) {
          str = "星期三";
        } else if (df == 4 || df ==-3) {
          str = "星期四";
        } else if (df == 5 || df ==-2) {
          str = "星期五";
        } else if (df == 6 || df ==-1) {
          str = "星期六";
        }
        return str
      }
      this.weekList[0] = GetDateStr(dd-3);
      this.weekList[1] = GetDateStr(dd-2);
      this.weekList[2] = GetDateStr(dd-1);
      this.weekList[3] = GetDateStr(dd);
      this.weekList[4] = GetDateStr(dd+1);
      this.weekList[5] = GetDateStr(dd+2);
      this.weekList[6] = GetDateStr(dd+3);

      //执行状态星期转周
      for( var i = 0; i < 7; i++){
        this.mounthdataT.TimeData.push((GetDateStr((dd-6)+i)).replace('星期','周'))
        this.mounthdataY.TimeData.push((GetDateStr((dd-6)+i)).replace('星期','周'))
        this.TimeData2.push((GetDateStr((dd-6)+i)).replace('星期','周'))
      }

      //顶部canvas绘制绿色图形
      this.CanvasWidth = document.body.clientWidth;
      this.CanvasHeight = this.CanvasWidth / 3;
      var Cw = this.CanvasWidth;
      var Ch = this.CanvasHeight;
      this.$nextTick(function(){
        var PlanCanvas = document.getElementById('planDetailBg');
        var ctx = PlanCanvas.getContext('2d');
        var headimg =document.getElementById('headImg');
        //绘制2次贝塞尔曲线
        var x = 30;
        var bgCloor = '#10d1a0';
        var n = 0.9;
        for(var i =0 ;i < 2; i++){
          ctx.beginPath();
          ctx.moveTo(0,x);
          ctx.quadraticCurveTo(Cw/2,Ch*n,Cw,x);
          ctx.lineTo(Cw,0);
          ctx.lineTo(0,0);
          ctx.lineTo(0,x);
          ctx.closePath();
          ctx.strokeStyle = "rgba(0,0,0,0)";
          ctx.stroke();
          ctx.fillStyle= bgCloor;
          ctx.fill();
          x = 40;
          bgCloor = 'rgba(16,209,160,0.5)';
          n = 0.85
        }
      });
    },
    async created (){
    //  console.log(this.$route.params.id)
      let params = {
        'schemeInsId': this.$route.params.id
      }
      const res = await api.post('doctorScheme/searchUserInfo.do', params)
      if (res.data.stateCode === '001') {
        var memberInfoVo = res.data.memberInfoVo;
        this.data = memberInfoVo;
        if(this.data.doRatio == null){
         this.speed = '暂无进度'
        } else {
          this.speed = parseInt(this.data.doRatio)
        }
        this.loading = 1;
        for( var i =0 ; i< this.data.schemeInsSchedules.length; i++){
          this.weekState[i] = this.data.schemeInsSchedules[i].doStatus
        }

        this.bloodPressList = this.data.bloodPressList;

        var dd = new Date();
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        var timer = y+'-'+m+'-'+d;

        console.log('今日='+ timer)
        function fmtDate(obj){
          var date =  new Date(obj);
          var y = 1900+date.getYear();
          var m = "0"+(date.getMonth()+1);
          var d = "0"+date.getDate();
          return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
        }

        for( var i = 0; i< this.bloodPressList.length; i++){
          if(fmtDate(this.bloodPressList[i].createTime) == timer ){
           this.todaybloodPressList = this.bloodPressList[i]
          }
        }

        let monthSugar = [];
        for( var i = 0; i < this.data.bloodSugarList.length; i++){
          if(fmtDate(res.data.memberInfoVo.bloodSugarList[i].createTime) == timer){
            this.todaybloodSugarList = res.data.memberInfoVo.bloodSugarList[i];
            break
          } else {
            this.todaybloodSugarList = {
              value:'-'
            }
          }
        }

        for( var i = 0; i < this.data.bloodSugarList.length; i++){
          monthSugar.push(this.data.bloodSugarList[i].value)
        }

         this.MonthSugarList = monthSugar.reverse();
         this.weekSugarList = ((this.MonthSugarList.reverse()).slice(0,7)).reverse()
        console.log(this.weekSugarList)
        this.mounthdataY.ValData[0].valdata = this.weekSugarList;

        for( var i = 0; i < this.bloodPressList.length; i++){
          this.MonthbloodPressList.push(this.bloodPressList[i].diastolicPressure);
          this.MonthsystolicPressure.push(this.bloodPressList[i].systolicPressure)
        }

        //周舒张压/收缩压数据处理
        this.mounthdataT.ValData[0].valdata = ((this.MonthbloodPressList).slice(0,7)).reverse();
        this.mounthdataT.ValData[1].valdata = ((this.MonthsystolicPressure).slice(0,7)).reverse();
        console.log(this.data)

      } else if (res.data.stateCode === '002') {
        console.log('参数异常')
      } else {
        console.log('系统错误')
      }
    },
    methods: {
      weektab: function (){
        if(this.mounthdataT.WeekDisplay == '本周'){
          this.mounthdataT = {
            id:'0', //图表id
            WeekorMonth: '0',
            WeekDisplay: '本月',
            TimeData: [],  //X轴参数
            type: [ '收缩压',  '舒张压'], //线条分类
            color: ['#ff9b0d','#10d1a0'], //线条色彩
            Company: 'mmHg', //Y轴数据单位
            ValData: [
              { valdata:''},
              { valdata:''}
            ]
          }
          let mouth = [];
          let ValDataVal1 = [];
          let ValDataVal2 = [];
          for( var i = 0; i < this.bloodPressList.length; i++){
            mouth.push((this.bloodPressList[i].createTime).substr(this.bloodPressList[i].createTime.length-5))
            ValDataVal1.push(this.bloodPressList[i].diastolicPressure)
            ValDataVal2.push(this.bloodPressList[i].systolicPressure)
          }

          for(var i = 0; i < mouth.length; i++){
             if(i%7 != 0){
               mouth[i] = ''
             }
          }

       console.log(mouth)


          console.log(ValDataVal1)
          this.mounthdataT.TimeData = mouth.reverse();
          this.mounthdataT.ValData[0].valdata = ValDataVal1.reverse();
          this.mounthdataT.ValData[1].valdata = ValDataVal2.reverse()
        } else {
          this.mounthdataT = {
            id:'0', //图表id
            WeekorMonth: '0',
            WeekDisplay: '本周',
            TimeData: '',
            type: [ '收缩压',  '舒张压'],
            Company: 'mmHg', //Y轴数据单位
            color: ['#ff9b0d','#10d1a0'], //线条色彩
            ValData: [
              { valdata:''},
              { valdata:''}
            ]
          }
          this.mounthdataT.TimeData = this.TimeData2;
          this.mounthdataT.ValData[0].valdata = ((this.MonthbloodPressList).slice(0,7)).reverse();
          this.mounthdataT.ValData[1].valdata = ((this.MonthsystolicPressure).slice(0,7)).reverse();

        }
      },
      weektab2:function (){
        if(this.mounthdataY.WeekDisplay == '本周'){
         this.mounthdataY = {
            id:'1',//图表id
              WeekorMonth: '0',
              WeekDisplay: '本月',
              TimeData: [], //X轴参数
              type: [ '血糖' ],  //线条分类
              color: ['#ff9b0d'], //线条色彩
              Company: 'mmol/L', //Y轴数据单位
              ValData: [
              { valdata:''}
            ]  //内容数据
          }
          let mouth = [];
          let ValDataVal = [];
          for( var i = 0; i < this.data.bloodSugarList.length; i++){
            mouth.push((this.bloodPressList[i].createTime).substr(this.bloodPressList[i].createTime.length-5));
            ValDataVal.push(this.data.bloodSugarList[i].value)
          }


          for(var i = 0; i < mouth.length; i++){
            if(i%7 != 0){
              mouth[i] = ''
            }
          }

          this.mounthdataY.TimeData = mouth.reverse();
          this.mounthdataY.ValData[0].valdata = ValDataVal.reverse();

        } else {
          this. mounthdataY = {
            id:'1',//图表id
            WeekorMonth: '0',
            WeekDisplay: '本周',
            TimeData: '', //X轴参数
            type: [ '血糖' ],  //线条分类
            color: ['#ff9b0d'], //线条色彩
            Company: 'mmol/L', //Y轴数据单位
            ValData: [
              { valdata:''}
            ]  //内容数据
          }
          this.mounthdataY.TimeData = this.TimeData2;
          this.mounthdataY.ValData[0].valdata = this.weekSugarList;

        }
      }
    },
    components:{
       'mt-button': Button,
       'echartline': echartling,
       'loading':loading
    },
    watch:{

    },
    filters: {
      nulltext:function (val){
        if(!val){
          return '-'
        } else {
          return val
        }
      }
    }
  }
</script>

<style lang="less">
  @width: 18%;
  .planDetails{
    padding: 5.4rem 0 0;
    #planDetailBg{
      display: block;
    }
    .mg_b{ margin-bottom: 0.8rem}
    .Adju_href{ float: right; color: #10d1a0}
    h2{
      font-size: 1.6rem;
      padding:1.6rem;
      border-bottom: solid 1px #d9d9d9;
    }
    .canvas{
      position: relative;
      background: #fff;
      #headImg{
        border-radius:50%;
        position: absolute;
        top:0;
        width: 7rem;
        height: 7rem;
        left: 50%-(@width/2);
        top: @width;
      }
      p{
        position: absolute;
        top:80%;
        width: 100%;
        font-size: 1.6rem;
        text-align: center;
        span{
          font-size: 1.3rem;
          color: #ccc;
         position: absolute;
          top: 0.3rem;
          margin-left: 10%;

        }
      }
    }
    .speed{
      background: #fff;
      padding: 1.5rem 2rem;
      font-size: 1.3rem;
      height: auto;
      overflow: hidden;
      padding-top: 2rem;
      span{
        float: left;
      }
      .mt-progress{
        width: 30%;
        float: left;
        margin-top: .9rem;
        margin-left: 4%;
        position: inherit;
        height: auto;
        .mt-progress-runway{
          border-radius:1rem
        }
        .mt-progress-progress{
          border-radius:1rem;
          background: #ff9b0d
        }
      }
      .router-link-exact-active{
        color: #10d1a0;
        float: right;
      }
    }
    .Completion_status{
      padding: 1.3rem 2rem;
      border-top:solid 1px #f5f5f5;
      background: #fff;
      display: flex;
      justify-content: center;
      .PastTimes{
        span{
          color: #c5c5c5;
        }
      }
      .Today{
        span{
          color: #10d1a0;
        }
      }
      li{
        width:13%;
        margin-left: 2%;
        height: auto;
        text-align: center;
        .icon{
          font-size: 4rem;
          width: 4rem;
          height: 4rem;
          display: block;
          text-align: center;
        }
        .icon-jianhao-, .icon-gantanhao--{
          color: #dbdbdb;
        }
        .icon-duigou--{
          color: #10d1a0;
          text-shadow: 0px 0px 2px #10d1a0;
        }
        span{
          color: #666666;
          margin-top: .5rem;
          font-size: 1.2rem;
          display: block;
        }
      }
      li:first-child{
        margin-left: 0;
      }
    }
    .Today_data{
      background: #fff;
      .Today_data_val{
        padding: 2.5rem 0;
        display: flex;
        justify-content: center;
         > div{
          width: 34%;
          border-left: solid 1px #d9d9d9;
           h3{
             font-size: 2.5rem;
             height: 2.4rem;
             line-height: 2.4rem;
             color: #ff6f60;
             text-align: center;
             margin-bottom: .6rem;
           }
           p{
             text-align: center;
             font-size: 1.4rem;
           }
        }
        > div:first-child{
          border: none;
        }
      }
    }
    .history_data{
       background: #fff;
      .echatr_con{
        position: relative;
        #history_blood_pressure, #history_blood_sugar{
          height: 25rem;
          border-bottom:solid 1px #f5f5f5
        }
        .mint-button{
          position: absolute;
          right: 2rem;
          top: 2rem;
          z-index: 99;
          padding: 0.6rem 1rem;
          height: auto;
          font-size: 1.2rem;
          border: solid 1px #10d1a0;
          background: none;
          color: #10d1a0;
          box-shadow: none;
          label{
            height: auto;
            font-size: 1.2rem;
            .icon{
              font-size: 1.2rem;
              color: #ccc;
            }
          }
        }
      }

    }
  }
</style>
