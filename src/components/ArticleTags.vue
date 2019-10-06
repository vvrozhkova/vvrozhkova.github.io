<template>
  <div class="article-tags">
    <ul class="article-tags__list">
      <li v-for="tag in tags" :key="tag.id">
        <g-link :to="tag.path" class="article-tag__link" rel="tag">{{tag.title}}</g-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ArticleTags",
  props: ["tags"]
};
</script>

<style scoped>
.article-tags__list {
  margin: 0;
}
.article-tag__link {
  border: 0.1vw solid #fff;
  border-radius: 0.7vw;
  padding: 0 0.4vw;
  /* background-color: #252151; */
  opacity: 0.9;
  font-size: 1vw;
}
.article-tag__link:hover {
  border: 0.1vw solid #0052cc;
  color: #0052cc;
}
.article-tags__list li {
  margin-right: 0.4vw;
  margin-bottom: 0.4vw;
  display: flex;
}
</style>