<template>
  <section class="section" :class="sectionClass">
    <div class="section--inner container" :class="sectionClassInner">
      <slot />
    </div>
    <slot name="outer" />
  </section>
</template>

<script>
export default {
  props: ["dark", "container", "framed", "secondary"],
  computed: {
    sectionClass() {
      let classes = [];
      if (this.secondary) classes.push("section--secondary");
      if (this.dark) classes.push("section--dark");
      return classes;
    },
    sectionClassInner() {
      let classes = [];
      if (this.framed) {
        classes.push("container--framed");
      }
      if (this.container) {
        classes.push("container-" + this.container);
      }
      return classes;
    }
  }
};
</script>

<style lang="scss">
.section {
  padding: calc(2% + var(--space)) 0;
  position: relative;
  width: 100%;
  flex: 1;
  .category-title {
    text-align: right;
  }
  &--secondary {
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    .category-title {
      text-align: left;
    }
    + .section--secondary {
      border-top-color: transparent;
      margin-top: -1px;
    }
  }
  &--inner {
    position: relative;
    z-index: 2;
  }
  &--dark {
    color: black;
    background: var(--light-bg);
    p {
      color: currentColor;
    }

    h1,
    h2,
    h3,
    h4,
    a {
      color: black;
    }
  }
}
</style>
