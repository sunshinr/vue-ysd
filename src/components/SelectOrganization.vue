<template>
  <div class="popBox">
    <div class="boxTop">
      <h3>所在机构</h3>
      <div class="content">
        <div class="select" id="addTop">
          <mt-radio v-model="organization" :options="option" id="tach" v-if="showFlag"></mt-radio>
          <div class="topNone"></div>
          <div class="bottomNone"></div>
        </div>
      </div>
      <input type="text" v-model="writeOrgan" placeholder="没有找到机构，请在此输入">
    </div>
    <div class="btn">
      <span @click="cancel">取消</span>
      <span @click="ensure">确定</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Radio} from 'mint-ui'

  export default {
    data () {
      return {
        organization: '',
        option: [],
        writeOrgan: '',
        showFlag: false
      }
    },
    props: [
      'area'
    ],
    created () {
      /* this.option = [
        {
          label: '陕西省康复医院',
          value: '0'
        },
        {
          label: '高新医院',
          value: '1'
        },
        {
          label: '陕西省第一人名医院',
          value: '2'
        },
        {
          label: '妇幼保健院',
          value: '3'
        },
        {
          label: '西安交通大学第一附属医院',
          value: '4'
        },
        {
          label: '西安交通大学第二附属医院',
          value: '5'
        },
        {
          label: '陕西省康复医院2',
          value: '6'
        },
        {
          label: '高新医院2',
          value: '7'
        },
        {
          label: '陕西省第一人名医院2',
          value: '8'
        }
      ] */
      this.requestDate()
    },
    watch: {
      organization (curVal, oldVal) {
        console.log(this.option[curVal - 1].label)
        this.writeOrgan = this.option[curVal - 1].label
      }
    },
    mounted () {
      console.log(this.area)
      var nSY, nEY, timer,
        iMWE_ST = 0,    // 滚动距离累加
        gap = 50   // 滚动间距
      var $o = $('#tach')
      $o.bind('mousewheel DOMMouseScroll', function (e) {
        e = e.originalEvent
        var delta = (e.wheelDelta && (e.wheelDelta > 0 ? 1 : -1)) ||    // chrome & ie
          (e.detail && (e.detail > 0 ? -1 : 1))   // firefox

        var maxY = $o[0].scrollHeight

        clearTimeout(timer)    // 清除重复触发的timer
        timer = setTimeout(function () {
          if (delta > 0) {    // 向上
            iMWE_ST -= gap
            if (iMWE_ST < 0) iMWE_ST = -50
          } else if (delta < 0) {    // 向下
            iMWE_ST += gap
            if (iMWE_ST > maxY - gap) iMWE_ST = parseInt(maxY / gap - 1) * gap
          }

          $o.stop(true, false).animate({'margin-top': -iMWE_ST}, 200)
        }, 50)
      })
    },
    methods: {
      cancel () {
        this.$emit('ee')
      },
      ensure () {
        if (this.writeOrgan !== '') {
          this.$emit('ee', this.writeOrgan)
        }
      },
      async requestDate () {
        console.log(this.area)
        const res = await this.$api.post('basic/getOrganList.do', {area: this.area})
        if (res.data.stateCode === '001') {
          // this.option = res.data.organArray
          for (var i = 0; i < res.data.organArray.length; i++) {
            this.option.push({label: res.data.organArray[i].organName, value: String(res.data.organArray[i].organId)})
          }
          this.showFlag = true
          console.log(this.option)
          if (this.option.length <= 4) {
            $('#addTop').css('margin-top', '5rem')
          }
        }
      }
    },
    components: {
      Radio
    },
    filters: {}

  }
</script>
<style lang="less" scoped>
  .popBox {
    width: 80%;
    margin-left: 10%;
    background: #fff;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    position: fixed;
    z-index: 10;
    top: 10rem;
    .boxTop {
      h3 {
        font-size: 1.6rem;
        border-bottom: solid 1px #10d1a0;
        text-align: center;
        padding: 1.5rem 0;
      }
      .content {
        position: relative;
        height: 22rem;
        overflow: hidden;
        .select {
          height: 22rem;
          /*overflow-y: scroll;*/
          .topNone {
            position: absolute;
            width: 100%;
            height: 4rem;
            background: rgba(255, 255, 255, 0.6);
            top: 0;
            left: 0;
          }
          .bottomNone {
            position: absolute;
            width: 100%;
            height: 4rem;
            background: rgba(255, 255, 255, 0.6);
            bottom: 0;
            left: 0;
          }
        }
      }
      input {
        width: 90%;
        border: solid 1px #d9d9d9;
        border-radius: 0.3rem;
        padding: 0.5rem 1rem;
        font-size: 1.5rem;
        margin: 1.5rem 5%;
      }
    }
    .btn {
      border-top: solid 1px #8e8d8d;
      span {
        display: inline-block;
        width: 49%;
        text-align: center;
        padding: 1.8rem 0;
        font-size: 1.6rem;
        color: #10d1a0;
      }
      span:first-of-type {
        border-right: solid 1px #666666;
      }
    }
  }
</style>
