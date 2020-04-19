<template>
  <g-link class="tag" :to="tag.path">
    <span class="icon">
      <i v-if="tag.icon" :class="tag.icon"></i>
      <span v-if="tag.emoji">{{tag.emoji}}</span>
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
  background-color: var(--bg-transparent);
  color: #b8c1ec;
  padding: 3px 10px;
  border-radius: 5px;
    border: 2px solid var(--bg-transparent);
  text-align: center;
  display: inline-block;
  margin: 5px;
  text-decoration: none;
  // &:hover{
  // // border: 2px solid #b8c1ec;
  // color: var(--hightlight-color);
  // }
  .icon {
    margin-right: 10px;
  }
}
</style>