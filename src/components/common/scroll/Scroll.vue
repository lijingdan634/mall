<template>
  <div class='wrapper' ref='wrapper'>
    <!-- ref如果是绑定在组件时，那麽通过this.$refs.refName获取到组件的对象 -->
    <!-- ref如果绑定的是普通元素，那么通过this.$refs.refName获取到的是一个元素对象 -->
    <div class='content22'>
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
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted() {
    //1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true, 
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
    })
    //2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)

    })
    //3.监听加载上拉更多
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp') 
      // console.log('上拉加载更多');
    })
    
  },
 
  methods:{
    scrollTo(x, y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
      // console.log('----');
    },
    getScrollY(){
      if(this.scroll){
        return this.scroll.y
      }else{
        return 0
      }
       
    }
  }
}
</script>

<style>

</style>