<template>
  <transition name="fade">
    <div v-show="isActive" class="container-container">
      <div class="information-content" :class="[this.$store.state.isDarkTheme? 'dark' : 'light']">
        <h2>{{ currentObject.header }}</h2>
        <div v-for="i in currentObject.body" class="content-line">
          <b>{{ i }}</b>
        </div>
        <footer>
          <div class="ok-button" @click="closeLesson">
            <h3>ОК</h3>
          </div>
        </footer>
      </div>
    </div>
  </transition>
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
      currentObject: {}
    }
  },
  updated() {
    if (this.isActive) {
      this.currentObject = this.$store.state.LessonsList[this.lessonNumber];
    }
  },
  methods: {
    closeLesson() {
      this.$emit("closeLesson");
    }
  }
}
</script>

<style scoped>
* {
  transition-duration: .1s;
}
.container-container {
  z-index: -1 ;
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
  margin-bottom: 20px;
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
}

.dark {
  color: #b0b7b6;
  background-color: black;
}

.content-line {
  margin-bottom: 10px;
}

footer h3 {
  background-color: #008cff;
  color: white;
  padding: 2px 20px 2px 20px;
  border-radius: 5px;
  margin-top: 10px;
  user-select: none;
}

footer h3:hover {
  transform: scale(1.05);
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