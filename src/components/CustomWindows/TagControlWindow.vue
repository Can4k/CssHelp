<template>
  <div class="tag-control-content" :class="this.$store.state.isDarkTheme? 'dark' : 'light'" style="top: 10px">
    <h3>Тэги фильтра</h3>
    <strong style="font-size: 10px">Введите тэги вашей памятки через запятую</strong>
    <textarea class="par-input" v-model="text" :class="[this.$store.state.isDarkTheme? 'dark-input' : 'light-input']"></textarea>
    <footer>
      <div class="ok-button" @click="closeTag">
        <h3 :style="[this.$store.state.isDarkTheme? 'color: #0b1117' : 'color: white']">ОК</h3>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "TagControlWindow",
  mounted() {
    let data = this.$store.state.activeTags.map((item) => {
      return item.name;
    })
    this.text = data.toString();
  },
  data() {
    return {
      text: ""
    }
  },
  methods: {
    closeTag() {
      this.emitter.emit("updateTagList");
      const newTags = this.text.split(',').map((item) => {
        return {name: item.trim() , isActive: false};
      })
      this.$emit('closeControl', {tags: newTags});
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

textarea {
  font-family: 'Nunito', sans-serif;
  font-weight: 1000;
}

.par-input {
  margin-top: 3px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid black;
  padding: 5px;
  width: 340px;
  height: 200px;
  min-height: 30px;
}

.information-content b {
  font-size: 13px;
}

footer h3 {
  background-color: #42b983;
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
  border: 1px solid rgba(196, 187, 187, 0.24);
  color: white;
  padding: 1px 20px 0 20px;
  border-radius: 5px;
  margin-top: 5px;
  user-select: none;
  font-size: 15px;
  transition-duration: .2s;
}

footer h3:hover {
  background-color: rgba(66, 185, 131, 0.76);
  cursor: pointer;
}

.dark {
  background-color: #080b10;
  color: #8e9a9a;
}

.light {
  background-color: white;
}

.dark-input {
  background-color: #0b1117;
  color: #8e9a9a;
}

.light-input {
  background-color: white;
}
</style>