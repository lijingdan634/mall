<template>
  <div class='content1'>
    <scroll>
        <cart-list-item v-for='(item,index) in list' :key='index' :product='item' />  
    </scroll>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Scroll from '@/components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'
export default {
  components:{
    Scroll,
    CartListItem
  },
  computed:{
    ...mapGetters({
      list:'cartList'
    })
  }
}
</script>

<style scoped>
/* .cart-list{
  
} */
.content1{
 height: 100vh;
}
.content1 ::v-deep .wrapper{
  height: calc(100% - 133px);
  overflow: hidden;
  /* color: red */
}
</style>