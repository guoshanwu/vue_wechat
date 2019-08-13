import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/home/home.vue')
    },
		{
			path: '/voteDetail',
			name: '/voteDetail',
			component: () => import('@/views/vote/index.vue')
		},
		{
			path: '/detail',
			name: '/detail',
			component: () => import('@/views/vote/detail.vue')
		}
  ]
})
