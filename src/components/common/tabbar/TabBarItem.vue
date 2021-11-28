<template>

  <div class='tab-bar-item' @click='clickItem'>
    <div v-if='!isActive'><slot name='item-icon'></slot></div>
    <div v-else><slot name='item-icon-active'></slot></div>
    <div :style='activeStyle'><slot name='item-text'></slot></div>
  </div>

</template>

<script>
export default {
  name:'TabBarItem',
  data(){
    return {
      // isActive:true
    }
  },
  computed:{
    isActive(){
      // console.log(this.path);
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor}:{}
    }
  },
  props:{
    path:String,
    activeColor:{
      default:'black',
      type:String
    }
  },
  methods: {
    clickItem(){
      // console.log(this.path);
      this.$router.push(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-top:3px
}

</style>