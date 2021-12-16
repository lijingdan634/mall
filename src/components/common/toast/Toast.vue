<template>
  <div class="toast" v-show='isShow'>
    {{message}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      message:'',
      isShow: false
    }
  },
  methods:{
    show(message, duration=2000){
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },duration);
    }
  }

}
</script>

<style scoped>
.toast{
  position:fixed;
  padding:10px 13px;
  background-color: rgb(0,0,0,0.60);
  color:white;
  top:50%;
  left:50%;
  border-radius: 5px;
  transform: translate(-50%,-50%);

}
</style>