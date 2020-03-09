<template>
  <g-link class="tag" :to="tag.path">
    <span class="icon">
      <i :class="tag.icon"></i>
    </span>
    <span class="tag-name">{{tag.title}}</span>
  </g-link>
</template>

<script>
export default {
  props: ["tag"]
};
</script>

<style lang="scss">
.tag {
  background-color: #243149;
  color: #fff;
  padding: 0px 10px;
  text-align: center;
  display: inline-block;
  margin: 0 5px;
  text-decoration: none;
  .icon {
    margin-right: 10px;
  }
  &:hover {
    color: var(--primary-color);
  }
}
</style>