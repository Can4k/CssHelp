<template>
  <div class="alert-container" :class="[this.$store.state.isDarkTheme ? 'dark' : 'light']" >
    <strong :style="type === 'warn'? 'color: #ef4343' : 'color: black'">{{text}}</strong>
  </div>
</template>

<script>
export default {
  name: "AlertComponent",
  props: {
    type: String,
    text: String
  }
}
</script>

<style scoped>
.alert-container {
  z-index: 5;
  font-size: 15px;
  position: fixed;
  border-radius: 5px;
  padding: 5px;
  font-family: 'Nunito', sans-serif;
  left: 70%;
  top: 10px;
  border: 2px solid #ef4343;
}
@media screen and (max-width: 700px){
  .alert-container {
    font-size: 10px;
    text-align: center;
    top: 5px;
    left: 50%;
    transform: translate(-50%);
  }
}
.dark {
  background: black;
}
.light {
  background-color: white;
}
</style>