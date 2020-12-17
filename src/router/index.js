import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/Users/Users'
import Roles from '@/components/Roles/Roles'
import Rights from '@/components/Rights/Rights'
import Goods from '@/components/Goods/Goods'
import Params from '@/components/Params/Params'
import Categories from '@/components/Categories/Categories'
import Orders from '@/components/Orders/Orders'
import Reports from '@/components/Reports/Reports'
import editor from '@/components/Monaco/editor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome},
      { path: '/users', component: Users},
      { path: '/Roles', component: Roles},
      { path: '/Rights', component: Rights},
      { path: '/Goods', component: Goods},
      { path: '/Params', component: Params},
      { path: '/Categories', component: Categories},
      { path: '/Orders', component: Orders},
      { path: '/Reports', component: Reports},
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: editor
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪一个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login') return next()
  const tokenStr = sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
