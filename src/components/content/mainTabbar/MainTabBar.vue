<template>
  <tab-bar>
      <tab-bar-item path='/home' activeColor='#ccc'>
        <img slot="item-icon" src="@/assets/img/tabbar/zhuye.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/zhuye_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor='#ccc'>
        <img slot="item-icon" src="@/assets/img/tabbar/fenlei.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/fenlei_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path='/cart' activeColor='#ccc'>
        <img slot="item-icon" src="@/assets/img/tabbar/gouwuche.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/gouwuche_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path='/profile' activeColor='#ccc'>
        <img slot="item-icon" src="@/assets/img/tabbar/wode.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/wode_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar.vue'
import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'
export default {
  components:{
      TabBar,
      TabBarItem
  }
}
</script>

<style>

</style>