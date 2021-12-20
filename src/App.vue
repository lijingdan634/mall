<template>
  <div id="app">
    <!-- exclude的组件，必须要有name -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-if='$route.meta.TabBarShow'/>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
  import MainTabBar from '@/components/content/mainTabbar/MainTabBar.vue'
  import Icon from '@/components/content/Icon/Icon.vue'
  import SvgIcon from '@/components/content/Icon/svg.vue'
  export default {
    name:'App',
    components:{
      MainTabBar,
      Icon,
      SvgIcon
      
    },
  }
</script>

<style>
@import 'assets/css/base.css';
</style>
