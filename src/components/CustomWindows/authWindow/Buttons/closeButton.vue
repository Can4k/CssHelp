<template>
  <img
      @click="close"
      class="close-button"
      src="./assets/x-circle.svg"
      alt="закрыть"
  >
</template>

<script>
export default {
  name: "closeButton",
  methods: {
    close() {
      this.$emit("closeClicked");
    }
  }
}
</script>

<style scoped>
.close-button {
  position: absolute;
  width: 28px;
  right: 8px;
  cursor: pointer;
}
.close-button:hover {
  transform: scale(1.04);
}
</style>