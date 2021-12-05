<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav-bar' />
    <scroll class='content'>
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods='goods' />
      <detail-shop-info :shopInfo='shopInfo' />

      
    </scroll>
   
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from '@/components/common/scroll/Scroll'
import {getDetailData,Goods,Shop} from '@/networks/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shopInfo:{}
    }
  },
  created(){
    this.iid = this.$route.params.id;
    getDetailData(this.iid).then(res=>{
      // console.log(res);
      this.data = res.result
      this.topImages = this.data.itemInfo.topImages

      this.goods = new Goods(this.data.itemInfo, this.data.columns, this.data.shopInfo.services)
      this.shopInfo = new Shop(this.data.shopInfo)
      // console.log(this.shopInfo);
    })
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index:21;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar{
  position: relative;
  z-index:22;
  background-color:#fff;
}
.content{
  height: calc(100% - 44px);
}
</style>