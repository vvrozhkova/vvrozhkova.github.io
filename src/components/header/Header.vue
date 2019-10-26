<template>
  <header class="header sticky-top container-fluid neon_blue">
    <div class="row">
      <Logo class="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-3" />
      <Navigation class="col-md-6 col-lg-6 col-xl-6" :categories="$static.categories.edges" />
      <HumburgerButton class="col-2 col-sm-2" />
      <CollapsedNavigation :categories="$static.categories.edges" />
      <Search class="col-xl-3" />
    </div>
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
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>