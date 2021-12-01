<template>
  <div id='home'>
    <nav-bar class='home-nav'><div slot='center'>购物街</div></nav-bar>
    <scroll class="content" ref='scroll'>
      <home-swiper :banners = 'banners'></home-swiper>
      <recommend-view :recommends = 'recommends'></recommend-view>
      <feature-view></feature-view>
      <tab-control class='tab-control' :titles="['流行','新款','精选']" @currentList='currentList'></tab-control>
      <goods-list :goodsList="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native='backClick' />
   
  
 
  </div>

  
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue'
import HomeSwiper from '@/components/common/swiper/HomeSwiper.vue'
import RecommendView from '@/views/home/childComps/RecommendView.vue'
import FeatureView from '@/views/home/childComps/FeatureView.vue'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import GoodsList from '@/components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
import {getHomeMultidata,getHomeGoods} from '@/networks/home.js'//接口数据获取
import BackTop from '@/components/content/backTop/BackTop.vue';
export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:{},
      goods:{
        'pop':{page: 0, list: []},
        'new':{page: 0, list: []},
        'sell':{page: 0, list: []},
      },
      currentType:'pop'
      // data:{}
    }
  },
  created(){
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('sell');
    this.getHomeGoods('new');

  },
  methods:{
    // 事件监听的方法
    currentList(index){
      // console.log(index);
      if(index===0){
        this.currentType ='pop'
      }else if(index===1){
        this.currentType ='new'
      }else if(index===2){
        this.currentType ='sell'
      }
       
    },
    backClick(){
      //当需要监听一个组件的原生组件时需要添加修饰符native进行监听
      // console.log('lala');
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0,0)
    },
    //网络请求的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // this.data = res
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1
       
      })
    }, 
  }
  
}
</script>

<style scoped>
#home{
  padding-top:44px;
  /* height: 100vh;
   */
   position: relative;
}
.home-nav{
  position:fixed;
  z-index: 10;
  left:0;
  right:0;
  top:0;
  background-color:var(--color-tint);
  color:white;
  /* text-align: center; */
}
.tab-control{
  position:sticky;
  top:44px;
  z-index:9;
}
.content{
  
  position: absolute;
  height: 100px;
  top:44px;
  bottom:49px;
  left:0;
  right: 0;
  /* margin-top:1px; */
}

</style>