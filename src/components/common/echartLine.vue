<template>
  <div :id="'myChartCon'+ weekTdata.id" class="V_echart_con"></div>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/toolbox')
  require('echarts/lib/component/legend')
  require('echarts/lib/component/markLine')
  export default {
    data() {
      return {
      }
    },
    props: ['weekTdata'],
    mounted (){
      var echartId = 'myChartCon' + this.weekTdata.id;
      var echartId = echarts.init(document.getElementById(echartId));
      let legendData = [];
      let seriesDate = [];
      for( var i = 0 ; i < this.weekTdata.type.length ; i++ ){
        legendData.push({name:this.weekTdata.type[i],icon:'circle'});
        seriesDate.push({
          name: this.weekTdata.type[i],
          type:'line',
          data: this.weekTdata.ValData[i].valdata,
          symbolSize:0,
          itemStyle:{
            normal:{
              color: this.weekTdata.color[i],
            }
          },
          lineStyle:{
            normal:{
              width:2
            }
          },
          markPoint:{
            symbol:'circle'
          },
          areaStyle:{
            normal:{
              color:'#f5f5f5',
              opacity: 0
            }
          },
        },)
      };
      echartId.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:legendData,
          itemWidth:8,
          left: '2%',
          top: '5%',
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          left: '3%',
          right: '10%',
          bottom: '10%',
          containLabel: true,
          borderWidth: 0
        },
        xAxis:  {
          type: 'category',
          data: this.weekTdata.TimeData,
          show: true,
          nameTextStyle:{
            color:'#f88101'
          },
          axisLabel:{
            show:true,
            inside: false,
            interval:0,
            showMaxLabel:true
//            rotate:-0.01
            // formatter:function(value,index)  
            // {  
            //     if (index % 2 != 0) {  
            //         return '\n\n' + value;  
            //     }  
            //     else {  
            //         return value;  
            //     }  
            // }             
          },
          axisTick:{
            show:false
          },
          axisLine:{
            lineStyle:{
              color:'#ccc',
              width:1
            }
          }
        },
        yAxis: {
          type:'value',
          name: this.weekTdata.Company,
          splitLine:{
            show:false
          },
          nameTextStyle:{
            color:'#ccc'
          },
          axisLabel:{
            show:true,
            inside: false,
            interval:0
          },
          axisTick:{
            show:false
          },
          axisLine:{
            lineStyle:{
              color:'#ccc',
              width:1
            }
          }
        },
        series: seriesDate,
        textStyle:{
          color:'#949494',
        }
      });

      this.$watch('weekTdata',function (newVal,oldVal){
        let legendData = [];
        let seriesDate = [];
        for( var i = 0 ; i < this.weekTdata.type.length ; i++ ){
          legendData.push({name:this.weekTdata.type[i],icon:'circle'});
          seriesDate.push({
            name: this.weekTdata.type[i],
            type:'line',
            data: this.weekTdata.ValData[i].valdata,
            symbolSize:0,
            itemStyle:{
              normal:{
                color: this.weekTdata.color[i]
              }
            },
            lineStyle:{
              normal:{
                width:2
              }
            },
            markPoint:{
              symbol:'circle'
            },
            areaStyle:{
              normal:{
                color:'#f5f5f5',
                opacity: 0
              }
            },
          },)
        };
        echartId.setOption({
          xAxis: {
            data: this.weekTdata.TimeData,
          },
          series: seriesDate
        });
      })
    }
  }
</script>

<style>
.V_echart_con{
  height: 25rem;
  border-bottom:solid 1px #f5f5f5
}
</style>
