<template>
  <div id="app">
    <Header />
    <slot />
  </div>
</template>

<script>
import Header from "./partials/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#app main {
  flex: 1;
}
</style>
