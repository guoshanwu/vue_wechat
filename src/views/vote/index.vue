<template>
	<div>
		<!-- 基础用法 -->
		<div class="sku-container">
			<van-sku v-model="showBase" stepper-title="我要买" :sku="skuData.sku" :goods="skuData.goods_info" :goods-id="skuData.goods_id"
			 :quota="skuData.quota" :quota-used="skuData.quota_used" :hide-stock="skuData.sku.hide_stock" show-add-cart-btn
			 reset-stepper-on-hide :initial-sku="initialSku" reset-stepper-on-hide reset-selected-sku-on-hide
			 disable-stepper-input :close-on-click-overlay="closeOnClickOverlay" :custom-sku-validator="customSkuValidator"
			 @buy-clicked="onBuyClicked" @add-cart="onAddCartClicked">
				<!-- 自定义 sku-header-price -->
				<template slot="sku-header-price" slot-scope="props">
					<div class="van-sku__goods-price">
						<span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}</span>
					</div>
				</template>

				<!-- 自定义 sku actions -->
				<template slot="sku-actions" slot-scope="props">
					<div class="van-sku-actions">
						<van-button square size="large" type="warning" @click="onPointClicked">
							投票
						</van-button>
						<!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
						<van-button square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')">
							取消
						</van-button>
					</div>
				</template>
			</van-sku>
			<van-button block type="primary" @click="showBase = true">
				xxxx
			</van-button>
		</div>

	</div>
</template>

<script>
	import skuData from './data';
	import {
		Sku,
		Button,
	} from 'vant';
	export default {
		components: {
			[Sku.name]: Sku,
			[Button.name]: Button,
		},
		data() {
			return {
				skuData: skuData,
				showBase: true,
				showCustom: false,
				showStepper: false,
				showSoldout: false,
				closeOnClickOverlay: true,
				initialSku: {
					s1: '30349',
					s2: '1193',
					selectedNum: 3
				},
				customSkuValidator: () => '请选择xxx!',
			};
		},

		methods: {
			onBuyClicked(data) {
				this.$toast('buy:' + JSON.stringify(data));
				console.log(JSON.stringify(data))
			},

			onAddCartClicked(data) {
				this.$toast('add cart:' + JSON.stringify(data));
			},
			onPointClicked() {
				
			},
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
