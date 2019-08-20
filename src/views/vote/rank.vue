<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :style="{width:'95%', margin: '10px auto'}">
			<ul class="title">
				<li>排名</li>
				<li>参赛宝贝</li>
				<li>票数</li>
			</ul>
			<ul class="rank">
				<li v-for="(list,index) in lists" :key='index'>
					<!-- 详情页 -->
					<VoteDetail ref="voteDetail" :voteData="{id:list.id, openid:list.openid, all_url:list.all_url}"></VoteDetail>
					<!-- 列表 -->
					<div @click="showDetail(index)" :style="{height: '100%'}">
						<i>{{index+1}}</i>
						<p>
							<img class="img" v-lazy="list.show_url">
							{{list.name}}
						</p>
						<span class="number">{{list.num}}票</span>
					</div>
				</li>
			</ul>
		</van-list>
		<!-- 底部 -->
		<lg-footer :index="1"></lg-footer>
	</div>
</template>

<script>
	import {
		List
	} from 'vant';
	import {
		getList,
		castVote
	} from '@/api/home';
	import VoteDetail from '@/views/vote';
	export default {
		components: {
			[List.name]: List,
			VoteDetail
		},
		data() {
			return {
				loading: false,
				finished: false,
				lists: [], //列表
				page: 1,
				limit: 10,
				lastPage: 1,
			}
		},
		methods: {
			//列表
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
					if (this.page > this.lastPage) {
						this.finished = true; // 数据全部加载完成
					}
					let params = {
						page: this.page,
						limit: this.limit,
						is_ranking: 1 //排序
					};
					getList(params).then(res => {
						if (res.code === 1) {
							this.page++;
							this.lastPage = res.data.last_page;
							this.lists = this.lists.concat(res.data.list); //新增数据拼接在后面
							this.loading = false; // 加载状态结束
						}
					})
				}, 500);
			},
			//投票按钮
			castVote(params) {
				castVote(params).then(res => {
					if (res.code === 1) {
						Toast.success(res.msg);
					} else {
						Toast.fail(res.msg);
					}
				})
			},
			//显示详情
			showDetail(index) {
				this.$refs.voteDetail[index].isShow(); //父组件通过 $refs 来调用子组件(isShow). [index]索引指定调用的子组件
			}
		}
	}
</script>

<style>
	.title {
		width: 100%;
		height: 30px;
		background-color: #CCCCCC;
	}

	.title li {
		width: 25%;
		line-height: 20px;
		float: left;
		text-align: center;
		margin: 5px 0;
	}

	.title li:nth-child(2) {
		width: 50%;
		border-left: 1px solid #0000FE;
		border-right: 1px solid #0000FE;
	}

	img {
		width: 100%;
		height: 100%;
	}

	.rank {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		text-align: center;
	}

	.rank li {
		width: 100%;
		height: 60px;
		padding: 5px;
		border-bottom: 1px solid #C8C9CC;
		line-height: 50px;
	}

	.rank li i {
		float: left;
		width: 25%;
		color: #FFB84C;
	}

	.rank li p {
		float: left;
		width: 50%;
		text-align: left;
	}

	.rank li p img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0 10px;
	}

	.rank span.number {
		float: left;
		width: 25%;
		color: red;
	}
</style>
