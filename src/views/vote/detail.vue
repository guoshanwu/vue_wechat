<template>
	<div>
		<van-button type="primary" @click="showPopup">
			展示弹出层
		</van-button>
		<van-popup v-model="show" position="bottom" :style="{ height: '20%', height: '80%' }">
			<div class="van-sku-actions">
				<van-button square size="large" type="warning" @click="onPointClicked">
					投票
				</van-button>
				<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
				<van-button square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')">
					取消
				</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		Popup,
		Button
	} from 'vant';
	export default {
		components: {
			[Popup.name]: Popup,
			[Button.name]: Button
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			showPopup() {
				this.show = true;
			}
		}
	};
</script>

<style lang="less">
	.demo-sku {
		.sku-container {
			padding: 0 15px;
		}
	}
</style>
