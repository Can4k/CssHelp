<template>
  <router-view/>
</template>

<script>
export default {
  mounted() {
    this.$store.state.deviceWidth = window.screen.width;
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  background-color: #e1e8e7;
  width: 0;
}

*::-webkit-scrollbar-thumb {
  background-color: #42b983;
}
body {
  transition-duration: .2s;
}
</style>