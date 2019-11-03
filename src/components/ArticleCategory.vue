<template>
  <div class="article-category">
    <strong>[ {{article.category.title.toUpperCase()}} ]</strong>
    <time itemprop="datePublished" :datetime="article.date" class="white">
      {{new Date(article.date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
      })}}
    </time>
  </div>
</template>

<script>
export default {
  name: "ArticleCategory",
  props: ["article"]
};
</script>

<style scoped>
.article-category {
  color: #0052cc;
  font-size: inherit;
  display: table;
}
strong {
  display: table-cell;
  vertical-align: middle;
}
time {
  font-size: 80%;
  display: table-cell;
  vertical-align: middle;
  padding: 0 0.3vw;
}
</style>