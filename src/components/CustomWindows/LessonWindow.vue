<template>
  <div class="container-container">
    <div class="information-content" :class="[this.$store.state.isDarkTheme? 'dark' : 'light']">
      <h2>{{ currentObject.header }}</h2>
      <div v-for="i in currentObject.body" class="content-line">
        <b>{{ i }}</b>
      </div>
      <footer>
        <div class="ok-button" @click="closeLesson">
          <h3 :style="[this.$store.state.isDarkTheme? 'color: black' : 'color: white']">ОК</h3>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "lessonWindow",
  props: {
    isActive: Boolean,
    lessonNumber: Number
  },
  data() {
    return {
      currentObject: {},
      startY: 0
    }
  },
  mounted() {
    this.startY = scrollY;
    window.addEventListener("scroll", this.blockScroll);
    for (let i of this.$store.state.LessonsList) {
      if (i.id === this.lessonNumber) {
        this.currentObject = i;
        break;
      }
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.blockScroll);
  },
  methods: {
    closeLesson() {
      this.$emit("closeLesson");
    },
    blockScroll() {
      if (this.startY > scrollY) {
        window.scroll({top: this.startY, behavior: "auto"})
      }
    }
  }
}
</script>

<style scoped>
* {
  transition-duration: .1s;
}

.container-container {
  z-index: 10;
}

.information-content {
  margin-top: 50px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  border-radius: 10px;
  padding: 10px;
  font-family: 'Nunito', sans-serif;
}

.information-content h2 {
  text-align: center;
  margin-bottom: 5px;
}

.information-content b {
  font-size: 13px;
}

.information-content footer {
  display: flex;
  justify-content: center;
}

.light {
  color: black;
  background-color: white;
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
}

.dark {
  background-color: #0b1117;
  color: #909695;
  box-shadow: 0 0 50px -22px rgba(149, 169, 160, 0.13);
  border: 2px solid rgba(255, 255, 255, 0.06);
}

.content-line {
  margin-bottom: 7px;
}

footer h3 {
  font-size: 15px;
  background-color: #42b983;
  padding: 1px 10px 1px 10px;
  border-radius: 5px;
  margin-top: 10px;
  user-select: none;
}

footer h3:hover {
  padding: 1px 12px 1px 12px;
  cursor: pointer;
}

@media screen and (max-width: 740px) {
  .information-content {
    border-radius: 10px;
    padding: 10px;
    font-family: 'Nunito', sans-serif;
    z-index: 2;
    width: 310px;
  }
}
</style>