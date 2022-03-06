<template>
  <div class="main-admin-post">
    <div class="information-content" :class="this.$store.state.isDarkTheme? 'dark' : 'light'" style="top: 10px">
      <strong style="font-size: 10px; color: red">
        пока это возможность есть у всех
      </strong>
      <h2>Добавление тела теории</h2>
      <h3 class="mrg">Заголовок</h3>
      <textarea v-model="newPost.header" placeholder="Заголовок" class="header-input" :class="[this.$store.state.isDarkTheme? 'dark-input' : 'light-input']"/>
      <h3 class="mrg">Абзацы</h3>
      <div v-for="i in newPost.body.length">
        <b>
            <textarea
                v-model="newPost.body[i - 1]"
                :placeholder="i"
                class="par-input"
                :class="[this.$store.state.isDarkTheme? 'dark-input' : 'light-input']"
            />
        </b>
      </div>
      <div class="plus-button">
        <h4 @click="this.newPost.body.push('')">Добавить абзац</h4>
        <h4 style="background-color: #e16969; margin-left: 5px" @click="this.newPost.body.pop()">Удалить абзац</h4>
      </div>
      <footer>
        <div class="ok-button" style="margin-right: 10px" @click="doPost">
          <h3>ОК</h3>
        </div>
        <div class="ok-button" @click="closeWindow">
          <h3 style="background-color: #e53939">ОТМЕНА</h3>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AdminWindow",
  props: {
    isActive: Boolean,
    lessonNumber: Number,
  },
  mounted() {
    this.startY = scrollY;
    window.addEventListener("scroll", this.blockScroll);
    this.helperList = this.$store.state.LessonsList;
    if (this.lessonNumber !== -1) {
      this.newPost = this.helperList[this.lessonNumber];
    } else {
      this.newPost = {
        body: [],
        header: ""
      }
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.blockScroll)
  },
  computed: {
    getActive() {
      return this.isActive;
    }
  },
  methods: {
    closeWindow() {
      router.replace("/");
      this.$emit("closeWindow");
    },
    changePost() {
      this.closeWindow();
    },
    postPost() {
      this.$store.state.LessonsList.push({
        body: this.newPost.body,
        header: this.newPost.header,
        id: this.$store.state.LessonsList.length,
        tags: []
      });
      this.closeWindow();
    },
    doPost() {
      if (this.lessonNumber === -1) {
        this.postPost();
      } else {
        this.changePost();
      }
    },
    blockScroll() {
      if (this.startY > scrollY && this.isActive) {
        window.scroll({top: this.startY, behavior: "auto"})
      }
    }
  },
  data() {
    return {
      currentId: 0,
      newPost: {
        body: [],
        header: ""
      },
      helperList: [],
      startY: 0
    }
  }
}
</script>

<style scoped>
.main-admin-post {
  z-index: 10;
}

.information-content {
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
  box-shadow: 0 0 1px #bdbdbd;
}

textarea {
  font-family: 'Nunito', sans-serif;
  font-weight: 1000;
}

.header-input {
  font-size: 15px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 4px;
  width: 340px;
  height: 70px;
  min-height: 70px;
}

.par-input {
  margin-top: 3px;
  font-size: 12px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 340px;
  height: 50px;
  min-height: 30px;
}

.information-content h2 {
  margin-bottom: 5px;
}

.information-content b {
  font-size: 13px;
}

.mrg {
  margin: 10px;
}

.information-content footer {
  display: flex;
  justify-content: center;
}

footer h3 {
  background-color: #008cff;
  color: white;
  padding: 2px 10px 2px 10px;
  border-radius: 4px;
  user-select: none;
  transition-duration: .2s;
  font-size: 15px;
  margin-top: 30px;
}

.plus-button {
  display: flex;
  margin: 3px;
  cursor: pointer;
  user-select: none;
}

.plus-button h4 {
  text-align: right;
  background-color: #42b983;
  font-size: 12px;
  padding: 2px;
  border-radius: 4px;
}

.plus-button h4:hover {
  transform: translate(1px);
}

footer h3:hover {
  transform: scale(1.05);
  cursor: pointer;
}

.dark {
  background-color: #292F2F;
  color: white;
}

.light {
  background-color: white;
}

.dark-input {
  background-color: black;
  color: #8e9a9a;
}

.light-input {
  background-color: white;
}
</style>