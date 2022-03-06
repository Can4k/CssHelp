<template>
  <span @click="clicked" class="theme-button-container" :class="[this.$store.state.isDarkTheme? 'dark' : 'white']">
    <strong>{{this.$store.state.isDarkTheme? "В ДЕНЬ" : "В НОЧЬ"}}</strong>
  </span>
</template>

<script>
export default {
  name: "ThemeButton",
  methods: {
    clicked() {
      this.$emit("changeTheme");
    }
  }
}
</script>

<style scoped>
* {
  transition-duration: .4s;
}
.theme-button-container {
  z-index: 10;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  border-radius: 4px;
  margin: 2px;
  padding: 4px;
  cursor: pointer;
  user-select: none;
}
.dark {
  color: black;
  box-shadow: 0 0 20px white;
  background-color: white;
}
.white {
  color: white;
  box-shadow: 0 0 20px black;
  background-color: black;
}
</style>