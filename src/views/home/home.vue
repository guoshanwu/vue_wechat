<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- 轮播 -->
			<van-swipe :autoplay="5000">
				<van-swipe-item v-for="(slider, index) in sliders" :key="index">
					<img v-lazy="slider.url" alt="slider.savename" />
				</van-swipe-item>
			</van-swipe>
      <!-- 列表 -->
			<van-row gutter="2" type="flex" justify="space-between" v-else>
        <van-col span="11" v-for="(list, index) in lists" :key="index">
          <RouterLink :to="{name: 'vote-detail',params: {id:list.id, openid:list.openid}}">
              <img v-lazy="list.url[0]" />
          </RouterLink>
        </van-col>
      </van-row>
		</van-list>
    <!-- 底部 -->
		<lg-footer :index="0"></lg-footer>
	</div>
</template>

<script>
	import { List, Swipe, SwipeItem, Row, Col } from 'vant';
  import { getSlider, getList } from '@/api/home';
	export default {
		components: {
			[List.name]: List,
			[Swipe.name]: Swipe,
			[SwipeItem.name]: SwipeItem,
      [Row.name]: Row,
      [Col.name]: Col
		},
		data() {
			return {
				images: [
					'https://img.yzcdn.cn/vant/apple-1.jpg',
					'https://img.yzcdn.cn/vant/apple-2.jpg'
				  ],
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
    created(){
      this.getSlider();
      this.getList();
    },
		methods: {
      //轮播图
      getSlider(){
        getSlider().then(res => {
          console.log(res);
          if(res.code === 1){
            this.sliders = res.data;
          }
        })
      },
      getList(){
        getList().then(res => {
          if(res.code === 1){
            this.page++;
            this.lastPage = res.data.last_page;
            this.lists = res.data.list;
          }
        })
      },
      //列表
			onLoad() {
				// 异步更新数据
				setTimeout(() => {
          // if(this.page > this.lastPage){
          //   this.finished = true;
          // }
          // getList(){
          //   getList().then(res => {
          //     console.log(res);
          //   })
          // }




// 					for (let i = 0; i < 10; i++) {
// 						this.list.push(this.list.length + 1);
// 					}
// 					// 加载状态结束
// 					this.loading = false;
//
// 					// 数据全部加载完成
// 					if (this.list.length >= 40) {
// 						this.finished = true;
// 					}
				}, 500);
			}
		}
	}
</script>

<style lang="scss" scoped>
  .van-swipe{
    height: 214px;
  }
	img{
		width: 100%;
		height: 100%;
	}
</style>
