<template>
  <div id='home'>
    <nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
    <home-swiper :banners = 'banners'></home-swiper>
    <recommend-view :recommends = 'recommends'></recommend-view>
  </div>

  
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from '@/components/common/swiper/HomeSwiper.vue'
import RecommendView from '@/views/home/childComps/RecommendView.vue'
import {getHomeMultidata} from '@/networks/home.js'//接口数据获取

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
  },
  data(){
    return {
      banners:[],
      recommends:{},
      // data:{}
    }
  },
  created(){
    getHomeMultidata().then(res=>{
      // this.data = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend
      // console.log(this.data);
    })
  }
  
}
</script>

<style scoped>
.home-nav{
  background-color:var(--color-tint);
  color:white;
}
</style>