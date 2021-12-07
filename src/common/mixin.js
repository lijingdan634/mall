import { debounce } from "./utils";
import BackTop from '@/components/content/backTop/BackTop.vue';
export const itemListenerMixin = {
  data(){
    return{
      itemImgListener: null,
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImgListener = () => {
      refresh()
     }
    this.$bus.$on('ItemImageLoad',this.itemImgListener)
    // console.log(this.refresh);
    }
}

//混入时候，生命周期函数会合并，methods中的方法如果原来存在在定义会覆盖，不存在会混入进去
export const backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isShow:false,
    }
  },
  methods:{
    backClick(){
      //当需要监听一个组件的原生组件时需要添加修饰符native进行监听
      this.$refs.scroll.scrollTo(0,0)

    },
  }
}
