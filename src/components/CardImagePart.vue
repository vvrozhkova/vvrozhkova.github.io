<template>
  <div class="card-image-part">
    <g-link :to="article.category.path">
      <ArticleCategory class="card-category" :article="article" />
    </g-link>

    <CardImage :article="article" />
  </div>
</template>

<script>
import ArticleCategory from "~/components/ArticleCategory.vue";
import CardImage from "~/components/CardImage.vue";

export default {
  name: "CardImagePart",
  components: {
    ArticleCategory,
    CardImage
  },
  props: ["article"]
};
</script>

<style scoped>
.card-image-part {
  height: 100%;
  padding: 1vw;
  display: table;
}
.card-category {
  position: absolute;
  z-index: 10;
  left: 1vw;
}
</style>