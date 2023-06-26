import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'main',
    component: Main,

    children: [
      {
        path: '/home',
        name: 'home',
        alias: '/',
        component: () => import("../views/Home")
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import("../views/Menu")
      },
      {
        path: '/shopbag',
        name: 'shopbag',
        component: () => import("../views/ShopBag")
      },
      {
        path: '/user',
        name: 'user',
        component: () => import("../views/User")
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/Detail')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/userDetail',
    name: 'userDetail',
    component: () => import('../views/UserDetail.vue')
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/Collect.vue')
  },
  {
    path: '/userAddress',
    name: 'userAddress',
    component: () => import('../views/UserAddress.vue')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('../views/AddAddress.vue')
  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: () => import('../views/CreateOrder.vue')
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: () => import('../views/MyOrder.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },

  {
    path: '/userSafety',
    name: 'userSafety',
    component: () => import('../views/UserSafetyCenter.vue')
  },
  {
    path: '/uploadFile',
    name: 'uploadFile',
    component: () => import('../views/UploadFile.vue')
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, form, next) => {
//   console.log(to)
//   console.log(form)
//   console.log(next)
// })

export default router
