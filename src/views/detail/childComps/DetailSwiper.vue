<template>
  <div class='swiper-item'>
     <swiper ref="mySwiper" :options="swiperOptions">
       <!-- 图像的轮播 -->
      <swiper-slide class="swiper-slide"  v-for='item in topImages' :key='item.key'>
          <img :src="item" alt="imgSrc" >
      </swiper-slide>
      <!-- 下边的小圆点 -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
 
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
  export default {
    name: 'carrousel',
    components:{
      Swiper,
      SwiperSlide
    },
    props:{
      topImages:{
        type:Array, 
      }
    },
    directives:{
      swiper: directive
    },
    data() {
      return {
        swiperOptions: {
            loop: true, //设置组件循环
            autoplay: true, //设置可自动播放
            speed:1000, //自动播放的速度，每一秒滑动一次
            pagination: {
            el: '.swiper-pagination',  //分页器的类名
            clickable: true //设置分页小圆点可手动点击
            
          },
          // Some Swiper option/callback...
        },
        
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
    methods:{
      
    }
  }
</script>
<style scoped>
.swiper-slide{
  height: 300px;
  width: 100%;
}

.swiper-slide img{
  /* height: 100%; */
  width: 100%;
}

.swiper-pagination-bullet-active {
  
  background-color: #fff;
}

</style>