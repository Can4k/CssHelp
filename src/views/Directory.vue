<template v-show="false">
  <div class="main-container">
    <transition :name="this.$store.state.deviceWidth > 700? 'alert' : 'alert-smart'">
      <alert-component
          v-show="this.$store.state.isAdminOpen"
          text="Добавлять посты может только админ"
          type="warn"
      />
    </transition>

    <transition name="fade">
      <lesson-window
          v-if="isLessonOpen"
          :is-active="isLessonOpen"
          @closeLesson="closeWindow"
          :lesson-number="selectedNumber"
      />
    </transition>

    <transition name="fade">
      <admin-window
          class="admin"
          v-if="isAdminOpen"
          @closeWindow="closeAdmin"
          @deleteLesson="deleteLesson"
          :is-active="isAdminOpen"
          :lesson-number="selectedNumber"
      />
    </transition>

    <transition name="fade">
      <tag-control-window
          v-if="isControlOpen"
          @closeControl="closeTagList"
      />
    </transition>

    <transition name="fade">
      <auntification
          v-if="isLoginOpen"
          @closeWindow="closeLogin()"
          @auth="this.userVerification"
      />
    </transition>

    <transition name="main-fade">
      <div class="content-list" :style="[(isAdminOpen || isLessonOpen || isLoginOpen || isControlOpen)? 'opacity: 0.05' : '']">
        <h2 style="margin-top: 40px" :class="[this.$store.state.isDarkTheme? 'dark-h2' : 'none']">Фильтр тегов</h2>
        <searcher
            @updateList="updateList"
            @openTagControl="openControl"
        />

        <div class="theory-header">
          <h2 :class="[this.$store.state.isDarkTheme? 'dark-h2' : 'none']">Список всей теории</h2>
          <span v-show="this.$store.state.isUserAdmin" @click="openAdmin({lessonIndex: -1})">
            <new-theory-button style="margin-top: 8px"/>
          </span>
        </div>

        <div v-show="!currentLessonList.length" class="alert">
          <strong>нет подходящей теории</strong>
        </div>

        <transition-group name="fade">
          <div v-for="i of this.currentLessonList" class="lessons-container" :key="i.id">
            <lesson-card
                @openLesson="openWindow"
                @changeLesson="openAdmin"
                @deleteLesson="deleteLesson"
                :card-index="i.id"
            />
          </div>
        </transition-group>
      </div>
    </transition>
  </div>

  <div class="change-theme" style="margin-right: 10px" :class="this.$store.state.isDarkTheme? 'dark-panel' : 'light-panel'">
    <a style="display: flex; justify-content: center; align-items: center" href="https://github.com/Can4k/helper228" target="_blank">
      <img
          class="github"
          src="@/assets/github.svg"
          alt="github"
          style="margin-right: 10px"
      />
    </a>
    <theme-button
        @changeTheme="changeTheme"
        style="margin-right: 9px"
    />
    <login-button
        @login="openLogin"
        @logout="logout"
    />
  </div>

  <transition name="fade">
    <alert-component
        v-show="this.currentWrong"
        type="warn"
        text="Неверный логин или пароль"
    />
  </transition>
</template>

<script>
import LessonCard from "@/components/LessonCard";
import LessonWindow from "@/components/CustomWindows/LessonWindow";
import Searcher from "@/components/Searcher";
import ThemeButton from "@/components/CustomButtons/ThemeButton";
import NewTheoryButton from "@/components/CustomButtons/NewTheoryButton";
import AlertComponent from "@/components/CustomWindows/AlertComponent";
import AdminWindow from "@/components/CustomWindows/AdminPostWindow";
import LoginButton from "@/components/CustomButtons/LoginButton";
import Auntification from "@/components/CustomWindows/authWindow/AuthWindow";
import TagControlWindow from "@/components/CustomWindows/TagControlWindow";

export default {
  name: "Directory",
  components: {
    TagControlWindow,
    LoginButton, AdminWindow, AlertComponent, NewTheoryButton,
    ThemeButton, Searcher, LessonWindow, LessonCard, Auntification
  },
  methods: {
    openWindow(data) {
      if (this.isLessonOpen || this.isAdminOpen || this.isLoginOpen || this.isControlOpen) {
        return;
      }
      this.selectedNumber = data.lessonIndex;
      this.isLessonOpen = true;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = this.adminBackground;
      }
      this.correctWindow();
    },
    closeWindow() {
      this.isLessonOpen = false;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
      this.updateList();
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
        if (!flag) {
          this.currentLessonList.push(this.$store.state.LessonsList[i]);
        }
      }
    },
    changeTheme(flag = false) {
      if (!flag) {
        if (localStorage['theme_mode'] === 'dark') {
          localStorage['theme_mode'] = 'light';
        } else {
          localStorage['theme_mode'] = 'dark';
        }
      }
      this.$store.state.isDarkTheme = !this.$store.state.isDarkTheme;
      document.body.style.background = this.$store.state.isDarkTheme ? '#0b1117' :
          this.isLessonOpen || this.isAdminOpen || this.isLoginOpen? this.adminBackground : 'white';
    },
    openAdmin(data) {
      if (this.isLessonOpen || this.isAdminOpen || this.isLoginOpen) {
        return;
      }
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = this.adminBackground;
      }
      this.selectedNumber = data.lessonIndex;
      this.isAdminOpen = true;
      this.correctWindow();
    },
    closeAdmin() {
      this.updateLessonListOnServer();
      this.isAdminOpen = false;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
      this.updateList();
    },
    deleteLesson(data) {
      let oldList = this.$store.state.LessonsList, index = data.lessonIndex, newList = [];
      let oldCurrent = this.currentLessonList, newCurrentList = [];
      for (let el of oldList) {
        if (el.id !== index) {
          newList.push(el);
        }
      }
      for (let el of oldCurrent) {
        if (el.id !== index) {
          newCurrentList.push(el);
        }
      }
      this.$store.state.LessonsList = newList;
      this.currentLessonList = newCurrentList;
      this.updateList();
      this.updateLessonListOnServer();
    },
    correctWindow() {
      setTimeout(() => {
        document.getElementsByClassName('information-content')[0].style.top = (window.scrollY + 20).toString() + "px";
      }, 0.1)
    },
    userVerification(data) {
      if (this.$store.state.isProduction) {

      } else {
        if (data.currentLogin === "borya" && data.currentPassword === "snusoed") {
          this.$store.state.isUserAdmin = true;
          document.title = "CSS Help, admin";
          localStorage['hashid'] = 'fbb344321e3985504d1df12718643070';
        } else {
          this.$store.state.isUserAdmin = false;
          this.currentWrong = true;
          setTimeout(() => {this.currentWrong = false}, 1000);
        }
        this.closeLogin();
      }
    },
    openLogin() {
      this.isLoginOpen = true;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = this.adminBackground;
      }
      this.correctWindow();
    },
    closeLogin() {
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
      this.isLoginOpen = false;
    },
    openControl() {
      if (this.isLessonOpen || this.isAdminOpen || this.isLoginOpen) {
        return;
      }
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = this.adminBackground;
      }
      this.isControlOpen = true;
    },
    closeControl() {
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
    },
    logout() {
      localStorage['hashid'] = '';
      location.reload();
    },
    closeTagList(data) {
      this.$store.state.activeTags = data.tags; this.isControlOpen = false;
      if (!this.$store.state.isDarkTheme) {
        document.body.style.backgroundColor = "white";
      }
    },
    async getLessonList() {
      let json = {};
      let response = await fetch('https://intense-plateau-14086.herokuapp.com', {
        method: 'GET'
      });
      if (response.ok) {
        json = await response.json();
      }
      this.$store.state.LessonsList = json;
      this.updateList();
    },
    async updateLessonListOnServer() {
      if (!this.$store.state.isUserAdmin || localStorage['hashid'] !== 'fbb344321e3985504d1df12718643070') {
        return;
      }
      let response = await fetch('https://intense-plateau-14086.herokuapp.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.$store.state.LessonsList)
      })

      if (response.ok) {
        let json = await response.json();
        console.log(json);
      }
    },
  },
  data() {
    return {
      isLessonOpen: false,
      isAdminOpen: false,
      isLoginOpen: false,
      isControlOpen: false,
      selectedNumber: 0,
      currentLessonList: {},
      currentTagsList: [],
      currentWrong: false,
      adminBackground: 'rgb(234,241,248)',
    }
  },
  mounted() {
    if (localStorage['hashid'] === 'fbb344321e3985504d1df12718643070') {
      this.$store.state.isUserAdmin = true;
      document.title = "CSS Help, admin";
    }
    this.getLessonList();
    if (localStorage['theme_mode'] === 'dark') {
      this.changeTheme(true);
    } else {
      localStorage['theme_mode'] = 'light';
    }
    this.currentLessonList = this.$store.state.LessonsList;
  }
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

.theory-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-theme {
  position: fixed;
  right: 4px;
  top: 4px;
  display: flex;
  z-index: 20;
  background-color: white;
  padding: 5px;
  box-shadow: 0 4px 50px -5px rgba(17, 12, 46, 0.16);
  border-radius: 10px;
  user-select: none;
}

a:visited {
  text-decoration: none;
  color: #008cff;
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

.github {
  transition-duration: .3s;
}

.github:hover {
  transform: scale(1.1);
}

.content-list {
  transition-duration: 0s;
}
.dark-panel {
  background-color: #0b1117;
  box-shadow: 0 0 50px -22px rgba(149, 169, 160, 0.13);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
</style>