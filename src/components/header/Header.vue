<template>
  <header class="fixed-top header row neon_blue">
      <Logo />
      <Navigation />
      <Search />
  </header>
</template>

<script>
import Logo from "~/components/header/Logo.vue";
import Navigation from "~/components/header/Navigation.vue";
import Search from "~/components/header/Search.vue";

export default {
  components: {
    Logo,
    Navigation,
    Search
  }
};
</script>

<style scoped>
.header {
  align-items: center;
  padding: 1vw;
  margin: 0;
}


@media (min-width: 500px) {
  .header {
    height: 41vw;
  }
}

 @media (min-width: 768px) {
.header {
    height: 20vw;
  }
} 

@media (min-width: 1200px) {
.header {
    height: 9vw;
  }
} 

@media (min-width: 1300px) {
.header {
    height: 7vw;
  }
}  

@media (min-width: 1800px) {
.header {
    height: 6vw;
  }
}  
</style>
