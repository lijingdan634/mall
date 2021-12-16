<template>
  <div class='cart'>
    <!-- 导航 -->
    <nav-bar class='nav-bar'>
      <div slot='center'>购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品的列表 -->

    <cart-list></cart-list>

    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
  
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import {mapGetters} from 'vuex'
export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //将vuex中的getters中的方法映射到局部计算属性中
    //1.直接用getters中的命名
    ...mapGetters(['cartLength']),
    //2.自定义命令
    // ...mapGetters({
    //   length:'cartLength'
    // })
  }
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color:#fff;
    font-weight: 700;
    /* position: relative; */
  }

</style>