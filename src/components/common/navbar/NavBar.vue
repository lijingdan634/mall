<template>
  <div class='nav-bar'>
    <div class='left'><slot name='left'></slot></div>
    <div class='center'><slot name='center'></slot></div>
    <div class='right'><slot name='right'></slot></div>
    
  </div>
</template>

<script>
export default {
  name:'NavBar'
}
</script>

<style scoped>
.nav-bar{
  display: flex;
  height:44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 -1px 1px rgba(100,100,100,0.11); 

}
.left,.right{
  width: 60px;
  height:44px;
  /* background-color: #fff; */
}
.center{
  flex:1;
}
</style>