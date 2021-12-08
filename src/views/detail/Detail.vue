<template>
  <div id='detail'>
    <detail-nav-bar class='detail-nav-bar'
                    @titleClick= 'titleClick'
                    ref='nav' />
    <ul>
      <li v-for='item in $store.state.cartList' :key=item.key>
        {{item}}
      </li>
    </ul>
    <scroll class='content' 
            ref='scroll'
            @scroll='contentScroll'
            :probeType='3'>
      <detail-swiper :topImages = 'topImages'></detail-swiper>
      <detail-base-info :goods='goods' />
      <detail-shop-info :shopInfo='shopInfo' />
      <detail-goods-info :detailInfo='detailInfo'
                         @imageLoad='imageLoad'
                         ref='detailGoodsInfo'/>
      <detail-param-info :paramInfo='paramInfo'/>
      <detail-comment-info :commentInfo='commentInfo'
                            ref='detailCommentInfo' />
      <good-list :goodsList='recommends'
                  ref='detailRecommendInfo' />
    </scroll>
    <back-top @click.native='backClick' v-show="isShow" />
    <detail-bottom-bar @addToCart='addToCart' class='bottom-bar' />
   
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
import DetailBottomBar from './childComps/DetailBottomBar'
import Scroll from '@/components/common/scroll/Scroll'
import {itemListenerMixin,backTopMixin} from '@/common/mixin.js'
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
    DetailBottomBar
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
      themeTopYs:[],
      themeTopY:null,
      currentIndex:0
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

    })
    this.$nextTick(()=>{
      this.getThemeTopY = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.detailGoodsInfo.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailCommentInfo.$el.offsetTop)
        this.themeTopYs.push(this.$refs.detailRecommendInfo.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      },200)
    })
    
  },
  destroyed(){
    this.$bus.$off('ItemImageLoad',this.itemImgListener)
  },
  methods:{
    addToCart(){
      // console.log('----');
      const product = {}
      // console.log(this.goods);
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 提交事件到actions中
      this.$store.dispatch('addCart',product)

    },
    imageLoad(){
      // this.$refs.scroll.refresh()
      debounce(this.$refs.scroll.refresh(),200)
      this.getThemeTopY()
     
    },
    titleClick(index){    
      
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 判断做法、 hack
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i; // 用于避免重复记录i的次数
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 2.确定BackTop是否显示
      this.isShow = (-position.y) > 1000
      

    }
  },
  mounted() {
    
  },
  mixins:[itemListenerMixin,backTopMixin],
}
</script>

<style scoped>
#detail{
  /* position: relative; */
  z-index:9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar{
  position: relative;
  z-index:22;
  background-color:#fff;
}
.content{
  height: calc(100% - 102px);
  overflow: hidden;
}
.bottom-bar{
  position: relative;
}

</style>