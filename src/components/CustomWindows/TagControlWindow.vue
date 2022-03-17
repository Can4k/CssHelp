<template>
  <div class="tag-control-content">
    <textarea v-model="text"></textarea>
  </div>
</template>

<script>
export default {
  name: "TagControlWindow",
  mounted() {
    for (let i of this.$store.state.activeTags) {
      this.text += `${i.name},`;
    }
  },
  data() {
    return {
      text: ""
    }
  }
}
</script>

<style scoped>
.tag-control-content {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  font-family: 'Nunito', sans-serif;
  z-index: 2;
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
}
</style>