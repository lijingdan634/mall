<template>
  <div class="recommend">
    <div v-for='item in recommends.list' :key='item.id' class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Object,
      default(){
        return {}
      }
    }
  }

}
</script>

<style>
 .recommend{
   display:flex;
   text-align: center;
   font-size:12px;
   padding:10px 0 20px;
   border-bottom:10px solid #eee;
 }
 .recommend-item{
   flex:1;
   
 }
 .recommend-item img{
   width: 68px;
   height: 68px;
   margin-bottom: 7px;
 }
</style>