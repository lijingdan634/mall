<template>
   <nav-bar class='all'>

      <div slot='left' class='left'>
        <img  src="@/assets/img/common/back.svg" alt=""
              @click='backClisk'>
      </div>
      <div class = 'center' slot='center'> 
        <div v-for='(item,index) in detailTitle' :key='item.id' 
            :class='{active: currentIndex == index}'
            @click='ItemClick(index)'
        >
          {{item}}
        </div>
      </div>

    </nav-bar>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
export default {
  components:{
    NavBar
  },
  data(){
    return {
      detailTitle: ['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    ItemClick(index){
      this.currentIndex = index
    },
    backClisk(){
      this.$router.go(-1)
      
    }
  }

}
</script>

<style scoped>
.center{
  display: flex;
  font-size: 15px;
  justify-content: center;
}
.center div{
  flex:1
}
.left{
  margin-top: 5px;
}
.active{
  color:var(--color-high-text);
}
.all{
  background-color: #fff;
}
</style>