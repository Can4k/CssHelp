<template>
  <div class="main-container">
    <transition :name="this.$store.state.deviceWidth > 700? 'alert' : 'alert-smart'">
      <alert-component v-show="this.$store.state.isAdminOpen" text="Добавлять посты может только админ" type="warn"/>
    </transition>
    <lesson-window @closeLesson="closeWindow" :is-active="isLessonOpen" :lesson-number="selectedNumber"/>
    <admin-window @closeWindow="closeAdmin" :is-active="isAdminOpen" :lesson-number="selectedNumber"/>
    <transition name="main-fade">
      <div class="content-list" v-show="!this.isLessonOpen && !this.isAdminOpen">
        <h2 style="margin-top: 30px" :class="[this.$store.state.isDarkTheme? 'dark-h2' : 'aboba']">Фильтр тегов</h2>
        <searcher @updateList="updateList"/>
        <div class="theory-header">
          <h2 :class="[this.$store.state.isDarkTheme? 'dark-h2' : 'aboba']">Список всей теории</h2>
          <span @click="openAdmin({})">
          <new-theory-button style="margin-top: 3px"/>
        </span>
        </div>
        <div v-show="!currentLessonList.length" class="alert">
          <strong>нет подходящей теории</strong>
        </div>
        <transition-group name="fade">
          <div v-for="i of this.currentLessonList" class="lessons-container" :key="i.id">
            <lesson-card
                v-show="this.currentLessonList.indexOf(i) !== -1"
                @openLesson="openWindow"
                @changeLesson="openAdmin"
                :card-index="i.id"
            />
          </div>
        </transition-group>
      </div>
    </transition>
  </div>
  <div class="telegram-logo">
    <theme-button @changeTheme="changeTheme"/>
  </div>
</template>

<script>
import LessonCard from "@/components/LessonCard";
import LessonWindow from "@/components/CustomWindows/LessonWindow";
import Searcher from "@/components/Searcher";
import ThemeButton from "@/components/CustomButtons/ThemeButton";
import NewTheoryButton from "@/components/CustomButtons/NewTheoryButton";
import AlertComponent from "@/components/CustomWindows/AlertComponent";
import AdminWindow from "@/components/CustomWindows/AdminPostWindow";
import {useRoute} from "vue-router";

const externalModules = require("@/modules/directoryModules");

export default {
  name: "Directory",
  components: {AdminWindow, AlertComponent, NewTheoryButton, ThemeButton, Searcher, LessonWindow, LessonCard},
  methods: {
    openWindow(data) {
      this.selectedNumber = data.lessonIndex;
      this.isLessonOpen = true;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "lightgrey";
      }
    },
    closeWindow() {
      this.isLessonOpen = false;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
    },
    updateList() {
      this.currentTagsList = [];
      this.currentLessonList = [];
      for (let tag of this.$store.state.activeTags) {
        if (tag.isActive) {
          this.currentTagsList.push(tag.name);
        }
      }
      for (let i = 0; i < this.$store.state.LessonsList.length; i++) {
        let flag = false;
        for (let j = 0; j < this.currentTagsList.length; j++) {
          flag |= (this.$store.state.LessonsList[i].tags.indexOf(this.currentTagsList[j]) === -1);
        }
        if (flag == 0) {
          this.currentLessonList.push(this.$store.state.LessonsList[i]);
        }
      }
    },
    changeTheme() {
      this.$store.state.isDarkTheme = !this.$store.state.isDarkTheme;
      document.body.style.background = this.$store.state.isDarkTheme ? '#0b1117' : this.isLessonOpen || this.isAdminOpen? 'lightgrey' : 'white';
    },
    openAdmin(data) {
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "lightgrey";
      }
      if (data.lessonIndex === undefined) {
        this.selectedNumber = -1;
      } else {
        this.selectedNumber = data.lessonIndex;
      }
      this.isAdminOpen = true;
    },
    closeAdmin() {
      this.isAdminOpen = false;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
      this.updateList();
    },
  },
  data() {
    return {
      isLessonOpen: false,
      isAdminOpen: false,
      selectedNumber: 0,
      currentLessonList: {},
      currentTagsList: [],
    }
  },
  mounted() {
    this.currentLessonList = this.$store.state.LessonsList;
    this.updateList();
    if (!this.isAdminOpen && useRoute().query.admin === 'true') {
      this.openAdmin({});
    }
  },
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-container h2 {
  font-family: 'Nunito', sans-serif;
  font-size: 30px;
  text-align: center;
  margin: 10px;
  user-select: none;
}

.main-container .dark-h2 {
  color: #b0b7b6;
}

.lessons-container {
  display: flex;
}

.theory-header{
  display: flex;
  align-items: center;
  justify-content: center;
}

.telegram-logo {
  position: fixed;
  left: 4px;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.telegram-logo img {
  margin: 4px;
}

.telegram-logo strong {
  font-family: 'Nunito', sans-serif;
  font-weight: 1000;
  font-size: 10px;
  color: black;
}

.telegram-logo-dark {
  color: #e1e8e7;
}

a:visited {
  text-decoration: none;
  color: #008cff;
}

.telegram-logo-dark strong {
  color: white;
}

.telegram-logo-dark strong {
  color: white;
}

a:hover {
  text-decoration: none;
  color: darkblue;
}

a {
  text-decoration: none;
  transition-duration: .2s;
}

.alert {
  font-family: 'Nunito', sans-serif;
  font-size: 10px;
  text-align: center;
  margin-top: -15px;
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.alert-enter-to {
  top: 10px;
}
.alert-enter-from {
  top: -50px;
}
.alert-leave-to {
  margin-top: -50px;
}
.alert-smart-enter-to {
  top: 5px;
}
.alert-smart-enter-from {
  top: -20px;
}
.alert-smart-leave-to {
  margin-top: -30px;
}
</style>