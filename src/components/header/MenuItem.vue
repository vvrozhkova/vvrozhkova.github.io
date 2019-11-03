<template>
  <div class="menu-item col">
    <g-link :to="item.link" class="menu-item__link">
      <div class="menu-item__box">
        <i :class="item.icon"></i>
        <div>{{item.title.toUpperCase()}}</div>
      </div>
    </g-link>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: ["item"]
};
</script>

<style lang="scss" scoped>
.menu-item__box {
  text-align: center;
  width: 6rem;
  padding: 0.4rem;
  margin: auto;
  border: 2px solid var(--neon-blue);
  &:hover {
    border: 2px solid #fff;
    border-radius: 0.5rem;
  }
  i {
    font-size: 3rem;
  }
}

.menu-item__link {
  color: var(--white);
  font-family: "ZCOOL QingKe HuangYou", cursive;
  font-size: 1.2rem;
}
</style>