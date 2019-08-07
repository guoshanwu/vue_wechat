<template>
    <van-tabbar 
        v-model="active" 
        active-color="#07c160"
        @change="tabClick"
    >
        <van-tabbar-item icon="wap-home" replace to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="chart-trending-o" replace to="/ranking">排行榜</van-tabbar-item>
        <van-tabbar-item icon="orders-o" replace to="/explain">活动说明</van-tabbar-item>
    </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    components:{
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
    },
    props: {
        index: {
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            active: this.index
        }
    },
    methods:{
        tabClick(key){
        }
    },
}
</script>
<style lang="scss" scoped>
</style>