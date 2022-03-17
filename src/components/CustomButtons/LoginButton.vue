<template>
  <span>
    <img
        @click="emit('login')"
        class="login-button"
        src="@/assets/log-in.svg"
        alt="Войти"
        v-show="!this.$store.state.isUserAdmin"
    >
    <img
      @click="emit('logout')"
      class="login-button"
      src="@/assets/log-out.svg"
      alt="Выйти"
      v-show="this.$store.state.isUserAdmin"
    >
  </span>
</template>

<script>
export default {
  name: "loginButton",
  methods: {
    emit(message) {
      this.$emit(message);
    },
  }
}
</script>

<style scoped>
.login-button {
  cursor: pointer;
  transition: .2s ease-in-out;
  margin-top: 3px;
}

.login-button:hover {
  transform: translateX(2px);
}
</style>