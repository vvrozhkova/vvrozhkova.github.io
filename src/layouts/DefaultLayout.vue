<template>
  <div id="app">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import("./partials/Header"),
    Footer: () => import("./partials/Footer")
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
