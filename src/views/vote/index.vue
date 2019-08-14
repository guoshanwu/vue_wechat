<template>
	<div>
		<van-popup v-model="show" position="bottom" :style="{ height: '20%', height: '85%'}">
			<div class="van-sku-body">
				<img v-for="img in imageList" v-lazy="img">
			</div>
			<div class="van-sku-actions">
				<van-button square size="large" type="warning" @click="castVote">
					投票
				</van-button>
				<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
				<van-button square size="large" type="danger" @click="close">
					关闭
				</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		Popup,
		Button,
		Sku,
		Toast
	} from 'vant';
	import { castVote } from '@/api/home';
	export default {
		components: {
			[Popup.name]: Popup,
			[Button.name]: Button,
			[Sku.name]: Sku
		},
		//父组件通过props属性传递进来的数据
		props: {
			voteData: {
				type: Object
			}
		},
		data() {
			return {
				show: false,
				imageList: [], //图片列表
			};
		},
		created() {
			this.imageList = this.voteData.all_url;
		},
		methods: {
			//关闭
			close() {
				this.show = false;
			},
			//打开弹窗
			isShow() {
				this.show = true;
			},
			//投票
			castVote(){
				let params = {
					id: this.voteData.id,
					openid: this.voteData.openid
				};
				castVote(params).then(res => {
					if(res.code === 1){
						Toast.success(res.msg);
					}else{
						Toast.fail(res.msg);
					}
				})
			},
		}
	};
</script>

<style lang="less">
	.van-sku-body img {
		width: 100%;
		height: 100%;
		margin-bottom: 10px;
	}

	.van-sku-actions {
		width: 100%;
		position: fixed;
		bottom: 0;
	}

	.van-sku-body {
		max-height: 88%;
	}
</style>
