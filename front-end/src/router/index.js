import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')

  },
  {
    path: '/aroom',
    name: 'Aroom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Aroom.vue')
  },
  {
    path: '/broom',
    name: 'Broom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Broom.vue')
  },
  {
    path: '/croom',
    name: 'Croom',
    component: () => import(/* webpackChunkName: "about" */ '../views/Croom.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import(/* webpackChunkName: "about" */ '../views/Guide.vue')
  },
  {
    path: '/location',
    name: 'Location',
    component: () => import(/* webpackChunkName: "about" */ '../views/Location.vue')
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: () => import(/* webpackChunkName: "about" */ '../views/Schedule.vue')
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: () => import(/* webpackChunkName: "about" */ '../views/Reservation.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
