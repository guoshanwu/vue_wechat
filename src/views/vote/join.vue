<template>
	<div>
		<!-- 表单 -->
		<van-cell-group>
			<van-field v-model="name" label="用户名" placeholder="请输入用户名" />
			<van-field v-model="mobile" label="手机号" placeholder="请输入手机号" />
			<van-field v-model="remark" label="留言" type="textarea" placeholder="请输入留言" rows="3" autosize />
		</van-cell-group>
		<!-- 分割 -->
		<van-divider :style="{ color: '#7d7d7d', borderColor: '#ddd', padding: '0 10px', margin: '5px 0' }">宝贝萌图</van-divider>
		<!-- 图片上传 -->
		<van-uploader v-model="fileList" multiple :max-count="8" :after-read="afterRead" @delete="deleteImg" />
		<!-- 分割 -->
		<van-divider :style="{ color: '#7d7d7d', borderColor: '#ddd', padding: '0 10px', margin: '5px 0' }">最多上传8张图片</van-divider>
		<!-- 提交按钮 -->
		<van-button type="primary" size="large" round @click="submit" :style="{display: 'block', margin: '0 auto', width: '80%'}">提交</van-button>
		<!-- 底部 -->
		<lg-footer :index="1"></lg-footer>
	</div>
</template>

<script>
	import {
		CellGroup,
		Field,
		Uploader,
		Toast,
		Divider,
		Button
	} from 'vant';
	import {
		upload,
		store
	} from '@/api/home';
	export default {
		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Uploader.name]: Uploader,
			[Divider.name]: Divider,
			[Button.name]: Button,
		},
		data() {
			return {
				fileList: [],
				name: '',
				mobile: '',
				remark: '',
				imagesIds: [] ,//图片id
			}
		},
		methods: {
			//图片上传
			afterRead(){
				let formdata = new FormData(); //创建formData对象
				//多张图片分次上传
				for (let n = 0; n < this.fileList.length; n++) {
					formdata.append('file', this.fileList[n].file);
					upload(formdata).then(res => {
						if (res.code === 1) {
							this.imagesIds = this.imagesIds.concat(res.data.id); //数组+1
							Toast.success('上传成功');
						}else{
							Toast.fail(res.msg);
						}
					})
				}
			},
			//删除预览图片按钮
			deleteImg(e) {
				console.log(e);
				this.fileList.splice(e, 1);
				console.log(this.fileList);
			},
			//提交
			submit(){
				if(this.name === ''){
					Toast.fail('用户名不能为空');
					return;
				}
				if(this.mobile === ''){
					Toast.fail('手机号不能为空');
					return;
				}
				let myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.mobile)) {
					Toast.fail('手机号格式有误');
					return;
				}
				if(this.imagesIds.length === 0){
					Toast.fail('宝贝萌图最少上传一张');
					return;
				}
				//发送的参数
				let params = {
					name: this.name,
					mobile: this.mobile,
					remark: this.remark,
					images_ids: this.imagesIds
				};
				store(params).then(res => {
					if(res.code === 1){
						Toast.success('活动参加成功');
						this.$router.push("/");	//成功后跳到主页
					}else{
						Toast.fail(res.msg);
					}
				})
			},
		},
	}
</script>

<style lang="less">
	.van-cell {
		font-size: 16px;
	}
</style>
