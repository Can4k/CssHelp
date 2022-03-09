<template>
  <div class="lesson-card" :class="[this.$store.state.isDarkTheme? 'dark' : 'none']" @click="openLesson">
    <div class="content-content">
      <strong>{{ currentObject.header }}</strong>
      <span v-show="this.$store.state.isUserAdmin">
        <img
            style="background-color: #42b983"
            @click.stop="changeClicked"
            src="@/assets/edit-2.svg"
            alt="change"
        >
      <img
          style="background-color: rgba(255,103,103,0.82)"
          @click.stop="deleteLesson"
          src="@/assets/trash.svg"
          alt="change"
      >
      </span>
    </div>
    <div class="lesson-card-body">
      <span class="tag" v-for="tag in currentObject.tags" :key="tag.name">
      <strong>{{ tag }}</strong>
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
    for (let i of this.$store.state.LessonsList) {
      if (i.id === this.cardIndex) {
        this.currentObject = i;
        break;
      }
    }
  },
  /*
    updated() {
    this.currentObject = this.$store.state.LessonsList[this.cardIndex];
    },
  */
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
    },
    deleteLesson() {
      this.$emit("deleteLesson", {
        lessonIndex: this.cardIndex
      })
    }
  }
}
</script>

<style scoped>
.lesson-card {
  cursor: pointer;
  color: black;
  border-radius: 4px;
  padding: 4px;
  margin: 10px;
  width: 600px;
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
}

.dark {
  background-color: #0b1117;
  color: #b0b7b6;
  box-shadow: 0 4px 50px 10px rgba(255, 255, 255, 0.05);
}

.light:hover {
  background-color: #d8d8e1;
  cursor: pointer;
}

.dark:hover {
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
  width: 24px;
  margin-left: 5px;
  border-radius: 8px;
  align-self: flex-start;
  cursor: pointer;
  padding: 5px;
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
  display: flex;;
}

@media screen and (max-width: 700px) {
  .lesson-card {
    width: 340px;
  }

  .lesson-card strong {
    font-size: 15px;
    max-width: 250px;
  }

  .tag strong {
    font-size: 11px;
  }
}
</style>