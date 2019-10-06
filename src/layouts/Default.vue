<template>
  <div class="container-fluid">
    <Header />
    <div class="main">
      <slot />
    </div>
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
    Footer
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
.container-fluid {
  padding: 0;
  margin-bottom: 7vw;
}
/* @media (max-width: 499px) {
  .main {
    margin-top: 29vw;
  }
} */

/* @media (min-width: 500px) {
  .main {
    margin-top: 20vw;
  }
} */

 @media (max-width: 1199px) {
.main {
    margin-top: 18vw;
  }
} 

@media (min-width: 1200px) {
.main {
    margin-top: 9vw;
  }
} 

@media (min-width: 1300px) {
.main {
    margin-top: 8vw;
  }
}  

@media (min-width: 1800px) {
.main {
    margin-top: 5vw;
  }
} 

</style>