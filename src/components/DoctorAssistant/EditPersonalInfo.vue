<template>
    <div class="editInfo">
      <Top :title="title"></Top>
      <div class="infoBox">
        <ul class="simpleInfo">
          <li>真实姓名
            <input type="text" v-model="doctorName" v-verify="doctorName" @blur="changeIn('Name')" placeholder="请输入真实姓名">
            <label class="f1" v-remind="doctorName" ref="Name"></label>
          </li>
          <li>身份证号
            <input type="number" v-model="identityCard" v-verify="identityCard" @blur="changeIn('Card')" placeholder="请输入身份证号">
            <label class="f1" v-remind="identityCard" ref="Card"></label>
          </li>
          <li>所在机构
            <input type="text" v-model="organization" v-verify="organization" @blur="changeIn('org')" placeholder="请输入所在机构">
            <label class="f1" v-remind="organization" ref="org"></label>
          </li>
          <li>职业类别
            <input type="text" v-model="occupation" v-verify="occupation" @blur="changeIn('occup')" placeholder="请输入职业类别">
            <label class="f1" v-remind="occupation" ref="occup"></label>
          </li>
          <li class="occupation">职称
            <input type="text" v-model="appellation" v-verify="appellation"  placeholder="请输入职称">
            <label class="f1" v-remind="appellation"></label>
          </li>
        </ul>

      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        title: '我的信息'
      }
    },
    created () {

    },
    methods: {},
    components: {
      Top
    }
  }
</script>
<style lang="less" scoped>

</style>
