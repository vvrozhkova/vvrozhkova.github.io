<template>
  <div class="main-layout">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/header/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
  name: "Default",
  components: {
    Header,
    Footer,
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

<style >
.main-layout{
  margin-bottom: 9vw;
}
</style>