<template>
  <div class="filter-container">
    <div class="searcher-container" :class="[this.$store.state.isDarkTheme? 'dark' : 'light']">
    <span class="tag" v-for="tag in activeTags" :key="tag.name">
        <strong @click="tagClicked(tag)"
                :class="[this.$store.state.isDarkTheme? tag.isActive? 'on-dark'
                : 'off-dark' : tag.isActive? 'on-light' : 'off-light']">{{tag.name}}
        </strong>
    </span>
    <new-tag-button
        v-show="this.$store.state.isUserAdmin"
        @click="openTagControl"
    />
    </div>
  </div>
</template>

<script>
import NewTagButton from "@/components/CustomButtons/NewTagButton";
export default {
  name: "Searcher",
  components: {NewTagButton},
  data() {
    return {
      activeTags: {}
    }
  },
  mounted() {
    this.emitter.on("updateTagList", () => {
      setTimeout(() =>  this.activeTags = this.$store.state.activeTags, 5);
    })
    this.activeTags = this.$store.state.activeTags;
  },
  methods: {
    tagClicked(data) {
      data.isActive = !data.isActive;
      this.$emit("updateList");
    },
    openTagControl() {
      this.$emit("openTagControl");
    }
  }
}
</script>

<style scoped>
.searcher-container{
  display: flex;
  width: 600px;
  background-color: white;
  box-shadow: 0 4px 50px -12px rgba(17, 12, 46, 0.16);
  border-radius: 4px;
  margin: 0;
  flex-wrap: wrap;
  justify-content: center;
  padding: 4px;
}
.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.searcher-container h2{
  font-family: 'Nunito', sans-serif;
  font-size: 50px;
  text-align: center;
}
.tag strong {
  cursor: pointer;
  user-select: none;
  font-size: 12px;
  font-family: 'Nunito', sans-serif;
  border-radius: 4px;
  padding: 1px 2px 1px 2px;
  display: flex;
  align-items: center;
  margin: 3px;
}
.on-light {
  background-color: #42b983;
  transition-duration: .1s;
}
.off-light {
  display: flex;
  align-items: center;
  background-color: rgba(190, 185, 185, 0.28);
  transition-duration: .1s;
}
.dark {
  background-color: #0b1117;
  box-shadow: 0 0 50px -22px rgba(149, 169, 160, 0.13);
}
.dark, .light {
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.off-dark {
  background-color: #4c5656;
  transition-duration: .1s;
}.on-dark {
  color: black;
  background-color: #42b983;
  transition-duration: .1s;
 }
 @media screen and (max-width: 700px){
   .searcher-container {
     width: 340px;
   }
   .tag strong {
     font-size: 10px;
   }
 }
</style>