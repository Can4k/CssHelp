import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Directory from "@/views/Directory";

const routes = [
  {
    path: '/',
    name: 'Directory',
    component: Directory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
