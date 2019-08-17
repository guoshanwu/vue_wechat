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
      path: '/rank',
      name: 'rank',
      component: ()=>import('@/views/vote/rank.vue')
    },
		{
			path: '/join',
			name: 'join',
			component: () => import('@/views/vote/join.vue')
		},
  ]
})
