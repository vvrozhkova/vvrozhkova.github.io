<template>
  <a href="/tag/java">
    <div class="tag">
      <span class="icon">
        <i class="fab fa-java"></i>
      </span>
      <span class="tag-name">{{title}}</span>
    </div>
  </a>
</template>

<script>
export default {
  props: ["title"]
};
</script>

<style lang="scss" coped>
.tag {
  background-color: #243149;
  color: #fff;
  padding: 3px 10px;
  min-width: 3vw;
  text-align: center;
  display: inline-block;
  margin: 10px 5px;
  .icon {
    margin-right: 10px;
  }
  i {
    font-size: 1vw;
  }
}
</style>