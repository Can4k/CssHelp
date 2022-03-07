<template>
  <div class="theme-button-container">
    <img src="@/assets/plus-circle.svg" :class="[this.$store.state.isDarkTheme? 'dark' : 'light']" alt="+">
  </div>
</template>

<script>
export default {
  name: "NewTheoryButton",
}
</script>

<style scoped>
.theme-button-container strong{
  z-index: 5;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}
.theme-button-container strong:hover {
  background-color: #5c6464;
}
img {
  cursor: pointer;
}
</style>