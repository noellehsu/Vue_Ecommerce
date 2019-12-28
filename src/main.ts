import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true; //前端 axios 請求讓 Cookies 存在Vue

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


//導航守衛，切換頁面即可觸發
//這邊不是Vue的原件，不能使用this，要使用axios
router.beforeEach((to, from, next) => {
  //console.log('to:',to, 'from:',from,'next:', next);
  if (to.meta.requireAuth) {
    console.log('這裡需要驗證')
    const api = 'https://vue-course-api.hexschool.io/api/user/check'
    axios.post(api).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        next();
      }else {
        next({
          path:'/login',

        });
      }
    })
  }
  else{
    next();
  }
});
 