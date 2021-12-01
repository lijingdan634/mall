<template>
  <div class='wrapper' ref='wrapper'>
    <!-- ref如果是绑定在组件时，那麽通过this.$refs.refName获取到组件的对象 -->
    <!-- ref如果绑定的是普通元素，那么通过this.$refs.refName获取到的是一个元素对象 -->
    <div class='content'>
      <slot></slot>
    </div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper)

    
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style>

</style>