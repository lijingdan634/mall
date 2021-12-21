<template>
 <div class="category">
   <!-- 1.nav-bar使用 -->
   <nav-bar class='nav-bar'>
     <div slot='center'>商品分类 </div>
   </nav-bar>
    <div class="category-content">
      <!-- 2.内容区左侧的分类 -->
      <tab-menu :categories='categories' @itemClick='itemClick'></tab-menu>
      <!-- 3.内容右侧区域-->
      <div id='tab-content'>
        <scroll>
          <!-- 子类展示  -->
          <div>
            <tab-content-category :subcategories = 'showSubcategory'/>
          </div>
          <!-- tab-control展示  -->
          <tab-control :titles="['综合','新品','销量']" @currentList="tabClick"/>

          <!-- 商品详情 -->
          <tab-content-detail :categoryDetail= 'showCategoryDetail' />
        </scroll>
      </div>
      <div>
      </div>
    </div>
 </div>
  
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu.vue'
import {getCategory,getSubcategory,getCategoryDetail} from '@/networks/category.js'
import TabContentCategory from './childComps/TabContentCategory.vue'
import Scroll from '@/components/common/scroll/Scroll'
import TabControl from '@/components/content/tabControl/TabControl.vue'
import TabContentDetail from './childComps/TabContentDetail.vue'
export default {
  components:{
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    TabContentDetail
  },
  data(){
    return {
      categories:[],
      currentIndex:-1,
      categoryData:[],
      currentType:'pop'
      
    }
  },
  created(){
    this._getCategory()
  },
  computed:{
    showSubcategory(){
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail(){
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  methods:{
    _getCategory(){
      getCategory().then((res)=>{
        this.categories = res.data.category.list
        for(let i=0;i<this.categories.length;i++){
          this.categoryData[i] = {
            subcategories:{},
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        this._getSubCategory(0)
        // console.log(this.categories);
      })
    },
    _getSubCategory(index){
      this.currentIndex = index
      
      const mailKey = this.categories[index].maitKey;
      // console.log(mailKey);
      getSubcategory(mailKey).then((res)=>{
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {...this.categoryData};
        // console.log(this.categoryData);
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
      })

    },
    _getCategoryDetail(type){
      // console.log(type);
      //1.获取请求miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then((res)=>{
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData}
        // console.log(this.categoryData);
      })

    },

    itemClick(index){
      this._getSubCategory(index)
    },
    tabClick(index){
      if(index === 0){
        this.currentType = 'pop'
      }else if(index ===1){
        this.currentType = 'new'
      }else if(index ===2){
        this.currentType = 'sell'
      }
    }

  }

}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 500;
}
.category-content{
  display:flex
}
#tab-content{

  height: 100vh;
  flex: 1;
}
#tab-content ::v-deep .wrapper{
  height: calc(100% - 89px);
  overflow: hidden;
}
</style>