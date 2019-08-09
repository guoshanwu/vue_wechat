<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img v-lazy="image" />
				</van-swipe-item>
			</van-swipe>
			<van-cell v-for="item in list" :key="item" :title="item" />
		</van-list>
		<lg-footer :index="0"></lg-footer>
	</div>
</template>

<script>
	import { List, Swipe, SwipeItem, Cell } from 'vant';
	export default {
		components: {
			[List.name]: List,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
			[Cell.name]: Cell
		},
		data() {
			return {
				images: [
					'https://img.yzcdn.cn/vant/apple-1.jpg',
					'https://img.yzcdn.cn/vant/apple-2.jpg'
				  ],
				loading: false,
				finished: false,
				list: []
			};
		},
		methods: {
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}
					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 40) {
						this.finished = true;
					}
				}, 500);
			}
		}
	}
</script>

<style lang="scss" scoped>
	img{
		width: 100%;
		height: 100%;
	}
</style>