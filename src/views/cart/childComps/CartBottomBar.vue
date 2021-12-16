<template>
  <div class="bottom-bar">
    
    <div class="check-content">
      <check-button class="check-button" :is-checked='isCheckedAll' @click.native='selectAll'  />
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="right" @click='calcClick' >
      去结算({{checkLength}})
    </div>

  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  components:{
    CheckButton
  },
  data(){
    return { 
      ReverseCheck: false
    }
  },

  computed:{
    ...mapGetters(['cartList','cartLength']),
    totalPrice(){
      return '￥'+this.cartList.filter(item=>item.checked).reduce((preVal,item)=>{
        return preVal + item.price*item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item=>item.checked).length
    },
    isCheckedAll(){
      if(this.cartLength == 0) return false
      return this.cartList.filter(item=>item.checked).length === this.cartLength
    }
  },
  methods:{
   selectAll(){
     if(this.isCheckedAll){
       this.cartList.forEach(item=>item.checked = false)
     }else{
       this.cartList.forEach(item=>item.checked = true)
     }
   },
   calcClick(){
     if(!this.cartList.find(item=>item.checked)){
       this.$toast.show('结算商品为空',1500)
     }
   }
    
  }

}
 
</script>



<style scoped>

  .bottom-bar {
  height: 40px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  font-size: 14px;
  line-height: 40px;
}
.check-content {
  height: 20px;
  display: flex;
  width: 80px;
}
.check-content span {
  padding-left: 40px;
}
.check-button {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 10px;
  height: 20px;
  width: 20px;
}
.price {
  flex: 1;
}
.right {
  text-align: center;
  background-color: var(--color-high-text);
  width: 100px;
}
</style>