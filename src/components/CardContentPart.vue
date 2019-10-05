<template>
  <div class="card-content-part">
    <h2>
      <ArticleTitle :article="article" class="card-title" />
    </h2>
    <hr align="left" class="line" />
    <ul>
      <li v-for="tableContentItem in article.headings" :key="tableContentItem.id">
        -
        <g-link :to="article.path.slice(0, -1)+tableContentItem.anchor">{{tableContentItem.value}}</g-link>
      </li>
    </ul>
    <CardTags :tags="article.tags" />
    <div class="card-read-btn">
      <ReadButton :path="article.path" />
    </div>
  </div>
</template>

<script>
import ArticleTitle from "~/components/ArticleTitle.vue";
import CardTags from "~/components/ArticleTags.vue";
import ReadButton from "~/components/ReadButton.vue";
export default {
  name: "CardContentPart",
  components: {
    ArticleTitle,
    CardTags,
    ReadButton
  },
  props: ["article"]
};
</script>

<style scoped>
ul {
  margin-bottom: 1vw;
  overflow: hidden;
}
.card-content-part {
  height: 100%;
  font-size: 1vw;
  padding: 1vw;
}
.card-content-part hr {
  width: 90%;
  margin: 1vw;
}
.card-title {
  font-size: 2vw;
  margin: 0;
}
.card-read-btn {
  right: 1vw;
  position: absolute;
  bottom: 1vw;
}
h2 {
  font-size: inherit;
}
</style>