<template>
  <div class="lesson-card" :class="[this.$store.state.isDarkTheme? 'dark' : 'none']" @click="openLesson">
    <div class="content-content">
      <strong>{{currentObject.header}}</strong>
      <img style="fill: white" :style="[this.$store.state.isDarkTheme? 'background-color: #42b983' : 'background-color: white']" @click.stop="changeClicked" src="@/assets/edit-2.svg" alt="change">
    </div>
    <div class="lesson-card-body">
      <span class="tag" v-for="tag in currentObject.tags" :key="tag.name">
        <strong>{{tag}}</strong>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    cardIndex: Number
  },
  data() {
    return {
      currentObject: {}
    }
  },
  mounted() {
    this.currentObject = this.$store.state.LessonsList[this.cardIndex];
  },
  updated() {
    this.currentObject = this.$store.state.LessonsList[this.cardIndex];
  },
  methods: {
    openLesson() {
      this.$emit("openLesson", {
        lessonIndex: this.cardIndex
      })
    },
    changeClicked() {
      this.$emit("changeLesson", {
        lessonIndex: this.cardIndex
      })
    }
  }
}
</script>

<style scoped>
.lesson-card {
  background-color: #e1e8e7;
  color: black;
  border-radius: 4px;
  padding: 4px;
  margin: 10px;
  width: 600px;
}
.dark {
  background-color: #292F2F;
  color: #b0b7b6;
}
.light:hover{
  background-color: #d8d8e1;
  cursor: pointer;
}
.dark:hover{
  background-color: #5c6464;
  cursor: pointer;
}
.lesson-card strong {
  font-size: 20px;
  font-family: 'Nunito', sans-serif;
  font-weight: 900;
  user-select: none;
}
.tag strong {
  font-family: 'Nunito', sans-serif;
  font-size: 12px;
  background-color: #42b983;
  border-radius: 4px;
  padding: 1px 2px 1px 2px;
  color: black;
}
img {
  width: 32px;
  margin-left: 10px;
  border-radius: 8px;
  align-self: flex-start;
  cursor: pointer;
  padding: 3px;
}
.content-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tag {
  margin: 1px 2px 1px 2px;
  transition-duration: 0s;
}
.lesson-card-body {
  display: flex;
}
@media screen and (max-width: 700px){
  .lesson-card {
    width: 340px;
  }
  .lesson-card strong {
    font-size: 15px;
  }
  .tag strong {
    font-size: 11px;
  }
}
</style>