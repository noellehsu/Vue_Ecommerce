import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login';

Vue.use(VueRouter)


const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    
    {
      path: '/login',
      name: 'Login',
      component: Login,
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