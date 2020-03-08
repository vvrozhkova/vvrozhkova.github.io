<template>
  <header>
    <div class="header-inner container flex gap-30">
      <Logo />
      <SearchForm />
    </div>
  </header>
</template>


<script>
import Logo from "./Logo.vue";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss" scoped>
header {
  z-index: 20;
  position: relative;
  top: 0;
  background-color: var(--bg-transparent);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: nowrap;
  position: sticky;
  transition: background-color 0.3s, border-color, 0.3s;
  .header-inner {
    padding: 0 var(--space);
    min-height: var(--header-height);
  }

  @media screen and (min-width: 992px) and (max-resolution: 1) {
    backdrop-filter: blur(4px);
  }
  @media screen and (min-width: 992px) and (-webkit-max-device-pixel-ratio: 1) {
    backdrop-filter: blur(4px);
  }
}
</style>