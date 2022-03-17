<template>
  <transition name="fade">
    <img class="show-pass"
         v-show="isPasswordShow"
         @click="changeShow"
         src="./assets/eye.svg"
         alt="visible"
    >
  </transition>
  <transition name="fade">
    <img class="show-pass"
         v-show="!isPasswordShow"
         @click="changeShow"
         src="./assets/eye-off.svg"
         alt="visible"
    >
  </transition>
</template>

<script>
export default {
  name: "changePassMode.vue",
  props: {
    isPasswordShow: Boolean
  },
  methods: {
    changeShow() {
      this.$emit('changeShow');
    }
  }
}
</script>

<style scoped>
.show-pass {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  position: absolute;
  top: 121px;
  right: 21px;
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