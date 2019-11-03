<template>
  <ul class="collapsed-menu">
    <li v-for="category in categories" :key="category.node.id">
      <g-link
        class="collapsed-menu__item"
        :to="category.node.link"
      >{{category.node.title.toUpperCase()}}</g-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["categories"]
};
</script>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .collapsed-menu.active {
    display: none !important;
  }
}

.collapsed-menu {
  display: none;
  text-align: center;
  width: 100%;
  transition-duration: 0.25s;
  &.active {
    display: block;
  }
}

.collapsed-menu__item {
  padding: 2.5vw 5vw;
  color: var(--white);
  font-size: 4vw;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
</style>