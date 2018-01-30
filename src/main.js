import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import $ from 'jquery'
/* import '../static/css/base.less' */
import api from './components/fetch/api'
import WhiteBackground from '../static/js/WhiteBackground'
import axios from 'axios'
import qs from 'qs'
import footerBar from '@/components/common/footer'
import HeaderBar from '@/components/common/HeaderBar'
import HeaderBar3 from '@/components/common/HeaderBar3'
import HeaderBar4 from '@/components/common/HeaderBar4'
import NoData from '@/components/common/NoData'

Vue.use(Mint, $)

Vue.component('footerBar', footerBar)
Vue.component('HeaderBar', HeaderBar)
Vue.component('HeaderBar3', HeaderBar3)
Vue.component('HeaderBar4', HeaderBar4)
Vue.component('NoData', NoData)

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.prototype.$WhiteBackground = WhiteBackground

Vue.prototype.$http = axios
Vue.prototype.Qs = qs

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
     watch:{
    '$route':function(to,from){
      window.scrollTo(0,0);
    }
  }
})

Vue.filter('MaxOrMinNum', function(val) {
  if(parseInt(val) > 999){
    return 999+'+'
  } else if(parseInt(val) > 0 && parseInt(val) < 999){
    return val
  } else {
    return 0
}
})

