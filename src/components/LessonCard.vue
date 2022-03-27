<template>
  <div class="lesson-card" :class="[this.$store.state.isDarkTheme? 'dark' : 'light']" @click="openLesson">
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
          style="background-color: #FF6767D1"
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
  color: #909695;
  box-shadow: 0 0 50px -22px rgba(149, 169, 160, 0.13);
}

.light:hover {
  background-color: rgba(220, 205, 205, 0.15);
  cursor: pointer;
}

.dark, .light {
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.dark:hover {
  background-color: rgba(41, 47, 47, 0.13);
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