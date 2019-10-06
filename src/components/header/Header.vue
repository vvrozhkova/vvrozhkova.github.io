<template>
  <header class="fixed-top header row neon_blue">
    <Logo class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-3" />
    <Navigation :categories="$static.categories.edges" class="col-md-6 col-lg-6 col-xl-6" />
    <HumburgerButton class="col-2 col-sm-2" />
    <CollapsedNavigation :categories="$static.categories.edges"/>
    <Search class="col-xl-3" />
  </header>
</template>

<script>
import Logo from "~/components/header/Logo.vue";
import Navigation from "~/components/header/Navigation.vue";
import CollapsedNavigation from "~/components/header/CollapsedNavigation.vue";
import HumburgerButton from "~/components/header/HumburgerButton.vue";
import Search from "~/components/header/Search.vue";

export default {
  components: {
    Logo,
    Navigation,
    HumburgerButton,
    CollapsedNavigation,
    Search
  }
};
</script>

<static-query>
    query {
        categories: allRelatedCategory{
            edges{
                node{
                    title
                    icon
                    link
                }
            }
        }
    }
</static-query>

<style scoped>
.header {
  align-items: center;
  padding: 1vw;
  margin: 0;
}

nav.menu {
  display: block;
}

@media (min-width: 500px) {
  /* .header {
    height: 27vw;
  } */
}

@media (max-width: 767px) {
  nav.menu {
    display: none;
  }
}

@media (min-width: 768px) {
  .header {
    height: 17vw;
  }
}

@media (min-width: 1200px) {
  .header {
    height: 9vw;
  }
}

@media (min-width: 1300px) {
  .header {
    height: 8vw;
  }
}

@media (min-width: 1800px) {
  .header {
    height: 6vw;
  }
}
</style>
