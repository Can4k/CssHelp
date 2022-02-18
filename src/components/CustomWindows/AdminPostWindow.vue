<template>
  <transition name="fade">
    <div v-show="isActive">
      <div class="information-content">
        <strong style="font-size: 10px; color: red">пока это возможность есть у всех</strong>
        <h2>Добавление тела теории</h2>
        <textarea v-model="newPost.header" placeholder="HEADER" class="header-input"/>
        <div v-for="i in newPost.body.length">
          <b><textarea v-model="newPost.body[i - 1]" :placeholder="i" class="par-input"/></b>
        </div>
        <div class="plus-button">
          <h4 @click="this.newPost.body.push('')">+1 ПАРАГРАФ</h4>
          <h4 style="background-color: #e16969; margin-left: 5px" @click="this.newPost.body.pop()">-1 ПАРАГРАФ</h4>
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
  </transition>
</template>

<script>
export default {
  name: "AdminWindow",
  props: {
    isActive: Boolean,
    lessonNumber: Number,
  },
  mounted() {
    this.helperList = this.$store.state.LessonsList;
  },
  updated() {
    if (this.lessonNumber !== -1) {
        this.newPost = this.helperList[this.lessonNumber];
    } else {
      this.newPost = {
        body: [],
        header: ""
      }
    }
  },
  methods: {
    closeWindow() {
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
    }
  },
  data() {
    return {
      currentId: 0,
      newPost: {
        body: [],
        header: ""
      },
      helperList: []
    }
  }
}
</script>

<style scoped>
.information-content {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  font-family: 'Nunito', sans-serif;
  z-index: 2;
}

.header-input {
  font-size: 13px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 2px;
  width: 340px;
}

.par-input {
  margin-top: 3px;
  font-size: 10px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  width: 340px;
  height: 40px;
}

.information-content h2 {
  margin-bottom: 5px;
}

.information-content b {
  font-size: 13px;
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
</style>