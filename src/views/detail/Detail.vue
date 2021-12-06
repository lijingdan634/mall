<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav-bar' />
    <scroll class='content' ref='scroll'>
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods='goods' />
      <detail-shop-info :shopInfo='shopInfo' />
      <detail-goods-info :detailInfo='detailInfo'
                         @imageLoad='imageLoad'/>
      <detail-param-info :paramInfo='paramInfo'/>
      <detail-comment-info :commentInfo='commentInfo' />
      <good-list :goodsList='recommends' />
    </scroll>
   
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import {itemListenerMixin} from '@/common/mixin.js'
import {debounce} from '@/common/utils'
import {getDetailData,Goods,Shop,GoodsParam,getRecommend} from '@/networks/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    Scroll,
  },
  data(){
    return {
      iid:null,
      data:{},
      topImages:[],
      goods:{},
      shopInfo:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      

    }
  },
  created(){
    this.iid = this.$route.params.id;

    //请求详情数据
    getDetailData(this.iid).then(res=>{
      
      //1.获取顶部的图片轮播数据
      this.data = res.result
      // console.log(this.data);
      this.topImages = this.data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(this.data.itemInfo, this.data.columns, this.data.shopInfo.services)
      //3.创建店铺信息
      this.shopInfo = new Shop(this.data.shopInfo)
      //4.保存商品的详情数据
      this.detailInfo = this.data.detailInfo
      //5.商品参数信息
      this.paramInfo = new GoodsParam(this.data.itemParams.info,this.data.itemParams.rule)

      //6.获取评论信息
      if(this.data.rate.cRate !== 0){
        this.commentInfo = this.data.rate.list[0]
      }
      
    })

    //请求推荐数据
    getRecommend().then(res=>{
      this.recommends = res.data.list

    }
    )

  },
  destroyed(){
    this.$bus.$off('ItemImageLoad',this.itemImgListener)
  },
  methods:{
    imageLoad(){
      // this.$refs.scroll.refresh()
      debounce(this.$refs.scroll.refresh(),200)
    }
  },
  mounted() {
    
  },
  mixins:[itemListenerMixin],
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