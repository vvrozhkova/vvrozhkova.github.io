<template>
  <div
    :class="[cardAlign === 'horizontal' ? 'row article-card__horizontal' : 'article-card__vertical']"
    class="article-card"
    :style="'background-color:' + color + ';'"
  >
    <CardImagePart
      :article="article"
      :class="[cardAlign === 'horizontal' ? 'col-6' : 'article-card-row']"
    />
    <CardContentPart
      :article="article"
      :class="[cardAlign === 'horizontal' ? 'col-6' : 'article-card-row']"
    />
  </div>
</template>

<script>
import CardImagePart from "~/components/CardImagePart.vue";
import CardContentPart from "~/components/CardContentPart.vue";

export default {
  name: "ArticleCard",
  components: {
    CardImagePart,
    CardContentPart
  },
  props: ["article", "cardAlign", "color"]
};
</script>

<style scoped>
.article-card__horizontal {
  height: 26vw;
  margin-bottom: 1vw;
  margin-left: 1px;
  margin-right: 1px;
}
.article-card__vertical {
  height: 53vw;
}
.article-card {
  background-color: #252f6f;
  border-radius: 1vw;
  font-size: 1.3vw;
}
.article-card-row {
  height: 50%;
  width: 100%;
  position: relative;
}
</style>