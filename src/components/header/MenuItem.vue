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
.menu-item {
  text-align: center;
}

.menu-item__box {
  width: 6em;
  height: auto;
  padding: 0.5em 0.5em 0.1em 0.5em;
  margin: auto;
  border: 2px solid #0052cc;
  &:hover {
    border: 2px solid #fff;
    border-radius: 0.5em;
  }
  i {
    font-size: 3rem;
  }
}

.menu-item__link {
  color: #fff;
  font-family: "ZCOOL QingKe HuangYou", cursive;
  text-decoration: none;
  font-size: 1.2rem;
}
</style>