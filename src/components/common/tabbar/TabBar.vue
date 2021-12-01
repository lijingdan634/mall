<template>
  <div>
      <div id="tab-bar">
        <slot>
          
        </slot>
      </div>
    </div>
</template>

<script>
import TabBarItem from './TabBarItem.vue'
export default {
  components: { TabBarItem },
  name:'TabBar',
 
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    z-index:20;
    /* box-shadow: x轴偏移程度，y轴偏移程度， 模糊程度 ，颜色+透明度 */
    box-shadow: 0 -1px 1px rgba(100,100,100,0.11);   
  }
  
</style>