<template>
  <div class="main-admin-post">

    <transition name="fade">
      <alert-component id="alert" v-show="this.areAllFieldsNotEmpty && !this.areAllFieldsEmpty"
                       text="Все поля должны быть заполнены" :type="'warn'"/>
    </transition>

    <div class="information-content" :class="this.$store.state.isDarkTheme? 'dark' : 'light'" style="top: 10px">
      <h2>Добавление тела теории</h2>
      <h3 class="mrg">Заголовок</h3>
      <textarea v-model="newPost.header" placeholder="Заголовок" class="header-input"
                :class="[this.$store.state.isDarkTheme? 'dark-input' : 'light-input']"/>

      <div class="add-paragraphs">
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
          <h4 @click="addParagraph">Добавить абзац</h4>
          <h4 style="background-color: #e16969; margin-left: 5px" @click="removeParagraph">Удалить абзац</h4>
        </div>
      </div>

      <div class="add-tags">
        <h3 class="mrg">Тэги</h3>
        <strong style="font-size: 10px">введите нужные теги через запятую без пробела</strong>
        <textarea
            v-model="newPost.tags"
            class="par-input"
            :class="[this.$store.state.isDarkTheme? 'dark-input' : 'light-input']"
        />
      </div>

      <footer>
        <div class="ok-button" @click="doPost">
          <h3>ОК</h3>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import AlertComponent from "@/components/CustomWindows/AlertComponent";

export default {
  name: "AdminWindow",
  components: {AlertComponent},
  props: {
    isActive: Boolean,
    lessonNumber: Number,
  },
  mounted() {
    document.getElementsByClassName("header-input")[0].focus();
    this.startY = scrollY;
    window.addEventListener("scroll", this.blockScroll);
    if (this.lessonNumber !== -1) {
      for (let i of this.$store.state.LessonsList) {
        if (i.id === this.lessonNumber) {
          this.newPost = i;
          break;
        }
      }
    } else {
      this.newPost = {
        body: [],
        header: "",
        tags: "",
      }
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.blockScroll)
  },
  methods: {
    convertStringToArr(tags) {
      if (typeof tags === "object") {
        return tags;
      }
      let tagsArr = [];
      let currentTag = "";
      for (let i of tags) {
        if (i === ',') {
          tagsArr.push(currentTag);
          currentTag = ""
        } else if (currentTag.length) {
          currentTag += i;
        } else {
          if (i !== ';' && i !== ' ' && i !== '.' && i !== '\n') {
            currentTag += i;
          }
        }
      }
      if (currentTag.length) {
        tagsArr.push(currentTag);
      }
      console.log(tagsArr);
      return tagsArr;
    },
    closeWindow() {
      if (this.areAllFieldsEmpty && this.lessonNumber !== -1) {
        this.$emit("deleteLesson", {
          lessonIndex: this.lessonNumber
        })
      }
      router.replace("/");
      this.$emit("closeWindow");
    },
    changePost() {
      this.newPost.tags = this.convertStringToArr(this.newPost.tags);
      this.closeWindow();
    },
    addPost() {
      const ID = new Date().getTime();
      let tagAr = this.convertStringToArr(this.newPost.tags);
      this.$store.state.LessonsList.push({
        body: this.newPost.body,
        header: this.newPost.header,
        id: ID,
        tags: tagAr,
      });
      this.closeWindow();
    },
    doPost() {
      if (this.areAllFieldsEmpty) {
        this.closeWindow();
      }
      if (this.areAllFieldsNotEmpty) {
        document.getElementById('alert').style.background = "yellow";
        setTimeout(() => {
          if (document.getElementById('alert')) {
            document.getElementById('alert').style.background = ""
          }
        }, 400)
        return;
      }
      if (this.lessonNumber === -1) {
        this.addPost();
      } else {
        this.changePost();
      }
    },
    blockScroll() {
      if (this.startY > scrollY && this.isActive) {
        window.scroll({top: this.startY, behavior: "auto"})
      }
    },
    addParagraph() {
      this.newPost.body.push('');
      setTimeout(() => {
        document.getElementsByClassName('par-input')[this.newPost.body.length - 1].focus();
      }, 10)
    },
    removeParagraph() {
      this.newPost.body.pop();
      if (this.newPost.body.length) {
        setTimeout(() => {
          document.getElementsByClassName('par-input')[this.newPost.body.length - 1].focus();
        }, 10)
      }
    }
  },
  computed: {
    areAllFieldsNotEmpty() {
      return !(this.newPost.body.length && this.newPost.header.length && this.newPost.tags.length);
    },
    areAllFieldsEmpty() {
      return (!this.newPost.body.length && !this.newPost.header.length && !this.newPost.tags.length);
    }
  },
  data() {
    return {
      currentId: 0,
      newPost: {
        body: [],
        header: "",
        tags: []
      },
      startY: 0
    }
  }
}
</script>

<style scoped>
.add-paragraphs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-tags {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

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
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>