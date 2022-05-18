import Vue from 'vue'
import VueRouter from 'vue-router'

import TestsIndex from '../views/Tests/TestsIndex.vue'
import TestsCreate from "@/views/Tests/TestsCreate";
import TestsSingle from "@/views/Tests/TestsSingle";

Vue.use(VueRouter)

const routes = [
  {
    path: '/tests',
    name: 'Tests Index',
    component: TestsIndex
  },
  {
    path: '/tests/create',
    name: 'Tests Create',
    component: TestsCreate
  },
  {
    path: '/tests/:id',
    name: 'Tests Single',
    component: TestsSingle
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
