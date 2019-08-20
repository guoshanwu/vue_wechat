import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		//首页
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/home/home.vue')
		},
		//排名
		{
			path: '/rank',
			name: 'rank',
			component: () => import('@/views/vote/rank.vue')
		},
		//参加活动
		{
			path: '/join',
			name: 'join',
			component: () => import('@/views/vote/join.vue')
		},
		//活动说明
		{
			path: '/explain',
			name: 'explain',
			component: () => import('@/views/vote/explain.vue')
		},
	]
})
