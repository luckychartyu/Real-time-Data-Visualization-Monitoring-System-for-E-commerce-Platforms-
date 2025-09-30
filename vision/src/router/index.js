import Vue from 'vue'
import VueRouter from 'vue-router'
// import SellerPage from '@/views/SellerPage.vue'
// import TrendPage from '@/views/TrendPage.vue'
// import MapPage from '@/views/MapPage.vue'
// import RankPage from '@/views/RankPage.vue'
// import HotPage from '@/views/HotPage.vue'
// import StockPage from '@/views/StockPage.vue'
import ScreenPage from '@/views/ScreenPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
]

const router = new VueRouter({
  routes
})

export default router
