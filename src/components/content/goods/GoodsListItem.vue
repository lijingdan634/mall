<template>
  <div class='goods-item'>
    <!-- 监听图片加载 @load -->
    <img v-lazy='showImage' alt="" @load='imageLoad' @click='imageClick'>
    <div class="goods-info">
        <p>{{goodsListItem.title}}</p>
        <span class="price">{{goodsListItem.price}}</span>
        <span class="collect">{{goodsListItem.cfav}}</span>
        <!-- {{goodsListItem.img}} -->
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsListItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    imageLoad(){
      // 图像加载后将事件发射到事件总线
      this.$bus.$emit('ItemImageLoad')
      // console.log('=================');
    },
    imageClick(){
      
      this.$router.push('/detail/'+this.goodsListItem.iid)

    }
  },
  computed:{
    showImage(){

      return  this.goodsListItem.img || this.goodsListItem.image || this.goodsListItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 47%;
    
  }
  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    padding-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>