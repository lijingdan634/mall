<template>
  <div id="app">
    <router-view></router-view>
    <mian-tab-bar/>
   
  </div>
</template>

<script>
  import MianTabBar from '@/components/content/mainTabbar/MianTabBar.vue'
  export default {
    name:'App',
    components:{
      MianTabBar
    }
  }
</script>

<style>
@import 'assets/css/base.css';
</style>
