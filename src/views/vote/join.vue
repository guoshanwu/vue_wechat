<template>
  <div>
    <van-cell-group>
      <van-field v-model="username" required label="用户名" placeholder="请输入用户名" />
      <van-field v-model="phone" required label="手机号" placeholder="请输入手机号" />
      <van-field v-model="message" label="留言" type="textarea" placeholder="请输入留言" rows="3" autosize />
    </van-cell-group>
    <van-uploader v-model="fileList" multiple :max-count="5" :after-read="afterRead" />
    <!-- 底部 -->
    <lg-footer :index="1"></lg-footer>
  </div>
</template>

<script>
  import {
    CellGroup,
    Field,
    Uploader
  } from 'vant';
  import { upload } from '@/api/home';
  export default {
    components: {
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Uploader.name]: Uploader
    },
    data() {
      return {
        fileList: [],
        username: '',
        phone: '',
        message: ''
      }
    },
    methods: {
      afterRead(file) {
        upload(file.file).then(res => {
          console.log(res);
        })
      }
    },
  }
</script>

<style lang="less">
  .van-cell {
    font-size: 16px;
  }
</style>
