<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<!-- 轮播 -->
			<van-swipe :autoplay="5000">
				<van-swipe-item v-for="(slider, index) in sliders" :key="index">
					<img v-lazy="slider.url" alt="slider.savename" />
				</van-swipe-item>
			</van-swipe>
			<!-- 分割线 -->
			<van-divider :style="{ color: '#7d7d7d', borderColor: '#ddd', padding: '0 10px', margin: '5px 0' }">参赛宝贝</van-divider>
			<!-- 列表 -->
			<ul class="list">
				<li class="item" v-for="(list,index) in lists" :key='index'>
					<VoteDetail></VoteDetail>
					<!-- 跳到产品详情页 -->
					<div class="link" :to="{name: 'vote',params: {id:list.id, openid:list.openid}}">
						<p class="pic"><img class="img" v-lazy="list.url[0]"></p>
						<p class="name">{{list.name}}</p>
						<p class="number">{{list.num}}</del></p>
					</div>
					<p class="click" @click="castVote({id:list.id, openid:list.openid})">投票</p>
				</li>
			</ul>
		</van-list>
		<!-- 底部 -->
		<lg-footer :index="0"></lg-footer>
	</div>
</template>

<script>
	import { List, Swipe, SwipeItem, Toast, Divider } from 'vant';
	import { getSlider, getList, castVote } from '@/api/home';
	import VoteDetail from '@/views/vote';
	export default {
		components: {
			[List.name]: List,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Divider.name]: Divider,
			VoteDetail
		},
		data() {
			return {
				loading: false,
				finished: false,
				sliders: [], //轮播图
				lists: [], //列表
				page: 1,
				limit: 10,
				lastPage: 1
			};
		},
		//一般在created()生命周期函数里获取远程数据
		created() {
			this.getSlider();
		},
		methods: {
			//轮播图
			getSlider() {
				getSlider().then(res => {
					if (res.code === 1) {
						this.sliders = res.data;
					}
				})
			},
			//列表
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					if(this.page > this.lastPage){
						this.finished = true;	// 数据全部加载完成
					}
					let params = {
						search_text: "",
						page: this.page,
						limit: this.limit
					};
					getList(params).then(res => {
						if (res.code === 1) {
							this.page++;
							this.lastPage = res.data.last_page;
							this.lists = this.lists.concat(res.data.list);	//新增数据拼接在后面
							this.loading = false;	// 加载状态结束
						}
					})
				}, 500);
			},
			//投票按钮
			castVote(params){
				castVote(params).then(res => {
					if(res.code === 1){
						Toast.success(res.msg);
					}else{
						Toast.fail(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.van-swipe {
		height: 214px;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;
	}

	.item {
		width: 49%;
		background-color: #fff;
		box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
		margin-bottom: 8px;
	}

	.link {
		display: block;
	}

	.pic {
		position: relative;
		width: 100%;
		padding-top: 100%;
	}

	.img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.name {
		line-height: 2.5;
		color: #7d7d7d;
		font-size: 16px;
	}

	.number {
		color: #f0af5b;
		font-size: 16px;
	}

	.click {
		margin: 8px auto;
		width: 70%;
		padding: 6%;
		background-color: #FFB84C;
		border-radius: 2em;
		color: #FFF;
	}
</style>
