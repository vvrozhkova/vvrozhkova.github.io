<template>
  <div class="article-tags">
    <g-link v-for="tag in tags" :key="tag.id" :to="tag.path" class="article-tag__link" rel="tag">
      {{tag.title}}
    </g-link>
  </div>
</template>

<script>
export default {
  name: "ArticleTags",
  props: ["tags"]
};
</script>

<style scoped>
.article-tag__link {
  border: 0.1vw solid #fff;
  border-radius: 0.7vw;
  padding: 0 0.4vw;
  opacity: 0.9;
  font-size: 1vw;
  margin-bottom: 0.4vw;
  display: table;
  text-align: center;
}
.article-tag__link:hover {
  border: 0.1vw solid var(--neon-blue);
  color: var(--neon-blue);
}
</style>