<template>
  <ul class="menu__box">
    <li v-for="category in categories" :key="category.node.id">
      <g-link class="menu__item" :to="category.node.link">{{category.node.title.toUpperCase()}}</g-link>
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
  .menu__box.active {
    display: none !important;
  }
}

.menu__box {
  display: none;
  text-align: center;
  width: 100%;
  transition-duration: 0.25s;
  &.active {
    display: block;
  }
}

.menu__item {
  padding: 2.5vw 5vw;
  color: #fff;
  font-size: 4vw;
  font-weight: 600;
  text-decoration: none;
  transition-duration: 0.25s;
}
</style>