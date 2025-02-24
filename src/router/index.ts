import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
      {
        path: 'product',
        component: () => import('@/views/ProductPage.vue')
      },
      {
        path: 'orderhistory',
        component: () => import('@/views/OderHistory.vue')
      },
      {
        path: 'tab4/:id',
        component: () => import('@/views/Tab4Page.vue'),
        props: true
      },
      {
        path: '/google-callback',
        component: () => import('@/views/GoogleCallback.vue'),
        props: true
      },
      {
        path: '/checkout',
        component: () => import('@/views/CheckoutPage.vue'),
        props: true
      },
      {
        path: '/register',
        component: () => import('@/views/RegisterAccounts.vue'),
        props: true
      },
      {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: () => import("@/views/ForgotPassword.vue"),
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
