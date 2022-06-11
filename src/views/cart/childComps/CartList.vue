<template>
  <div class='content1'>
    <scroll>
        <cart-list-item v-for='(item,index) in list' :key='index' 
                        :product='item' 
                        @productCountIncreament='productCountIncreament'
                        @productCountDecreament='productCountDecreament' />  
    </scroll>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
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
  },
 methods:{
    ...mapMutations(['dec_counter','add_counter']),
    productCountIncreament(product){
      console.log(product);
      this.add_counter(product)


   },
    productCountDecreament(product){
      // console.log(val);
      if(product.count <=1){
        return;
      }
      this.dec_counter(product)

      
  }
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