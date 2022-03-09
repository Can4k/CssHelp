<template>
  <div @click="clicked" class="theme-button-container" :class="[this.$store.state.isDarkTheme? 'dark' : 'white']">
    <img v-show="this.$store.state.isDarkTheme" src="@/assets/sun.svg" alt="В ДЕНЬ">
    <img v-show="!this.$store.state.isDarkTheme" src="@/assets/moon.svg" alt="В ДЕНЬ">
  </div>
</template>

<script>
export default {
  name: "ThemeButton",
  methods: {
    clicked() {
      this.$emit("changeTheme");
    },
  },
  data() {
    return {
      isHovered: false
    }
  }
}
</script>

<style scoped>
.theme-button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  border-radius: 20px;
  padding: 4px;
  cursor: pointer;
  user-select: none;
}
img {
  transition: .4s ease-in-out;
}
img:hover {
  transform: rotate(360deg);
}
</style>