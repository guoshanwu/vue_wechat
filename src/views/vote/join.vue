<template>
	<div>
		<van-cell-group>
			<van-field v-model="username" required label="用户名" placeholder="请输入用户名" />
			<van-field v-model="phone" required label="手机号" placeholder="请输入手机号" />
			<van-field v-model="message" label="留言" type="textarea" placeholder="请输入留言" rows="3" autosize />
		</van-cell-group>
		<!-- 底部 -->
		<lg-footer :index="1"></lg-footer>
	</div>
</template>

<script>
	import {
		Field
	} from 'vant';
	export default {
		components: {
			[Field.name]: Field,
		},
		data() {
			return {
				
			}
		},

	}
</script>

<style lang="less">

</style>