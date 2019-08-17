<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul class="rank">
        <li>

        </li>
        <li>

        </li>
        <li>

        </li>
        <li>

        </li>
        <li>

        </li>
      </ul>
    </van-list>
    <!-- 底部 -->
    <lg-footer :index="1"></lg-footer>
  </div>
</template>

<script>
  import { List } from 'vant';
  import { getList, castVote } from '@/api/home';
  import VoteDetail from '@/views/vote';
  export default {
    components:{
      [List.name]: List,
    },
    data(){
      return {
        loading: false,
        finished: false,
        page: 1,
        limit: 10,
        lastPage: 1,
      }
    },
    methods:{
      onLoad() {

      }
    }
  }
</script>

<style>
  .rank{
    margin: 0 auto;
    width: 90%;
    background-color: black;
  }
  .rank li{
    width: 100%;
    height: 50px;
    background-color: white;
    padding: 5px;
    margin: 5px 0;
  }
</style>
