<template>
  <div id="shop-item">
  <div class="item-selector">
      <check-button :isChecked='product.checked' @click.native = 'checkClick'></check-button>
  </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">
          <button @click='productCountDecreament(product)'>-</button>
          {{ product.count }}
          <button @click='productCountIncreament(product)'>+</button>
          </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton';
import {mapMutations} from 'vuex'
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    
  },
  components:{
    CheckButton
  },
  methods: {
    ...mapMutations(['dec_counter','add_counter']),
    checkClick() {
      this.product.checked = !this.product.checked
      // console.log(this.product);
    },
    productCountIncreament(product){
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
};
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>