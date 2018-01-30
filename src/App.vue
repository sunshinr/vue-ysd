<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      this.CheckUser()
    },
    methods: {
      CheckUser () {
        let userDoctorId = localStorage.getItem('doctorId')
        if (userDoctorId) {
          console.log('获取到id')
        } else {
          console.log(this.$route.path)
          if (this.$route.path !== '/register' && this.$route.path !== '/ResetPwd' && this.$route.path !== '/completeInfo' && this.$route.path !== '/waitReview' && this.$route.path !== '/ReviewFailed') {
            this.$router.push({
              path: '/login'
            })
          }
          /*this.$router.push({
            path: '/login'
          })*/
        }
      }
    },
    watch: {
      '$route': 'CheckUser'
    }
  }
</script>

<style scoped>
</style>
