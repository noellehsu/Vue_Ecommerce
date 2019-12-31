import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
// import HelloWorld from '@/components/HelloWorld.vue';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/pages/Login.vue'; // 一定要加上副檔名.vue 不然會出錯
import Products from '@/components/pages/Products.vue'; 
import CustomerOrder from '@/components/pages/CustomerOrder.vue'; 


Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {
      path: '*',        //如果用戶在路由亂輸入文字
     redirect:'/login',  
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },  
    // },  
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,   
      children:[        //巢狀路由
        {
          path: 'products', //children裡面的路由不用加上斜線喔，不然會讀不到
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },  //路由訊息:表示需要驗證登入
        },      
      ]
    }, 
    {
      path: '/',  //不用掛在admin下面，因為不需要登入
      name: 'Dashboard',
      component: Dashboard,   
      children:[        //巢狀路由
        {
          path: 'customer_order', //children裡面的路由不用加上斜線喔，不然會讀不到
          name: 'CustomerOrder',
          component: CustomerOrder,
        },      
      ]
    }, 
    
  ]
})

export default router

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
]