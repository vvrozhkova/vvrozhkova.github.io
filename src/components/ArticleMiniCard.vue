<template>
  <article class="mini-card" :style="headerStyle">
    <g-link :to="article.path" class="mini-card__link">
      <ArticleCategory :article="article" class="mini-card-category" />
      <br />
      <h2>
        <ArticleTitle :article="article" class="mini-card-title" />
      </h2>

      <div class="mini-card-image">
        <!-- -->
        <div class="card-image__gradient" :style="gradientStyle"></div>
        <g-image :src="article.image" class="card-image__img" :alt="article.title"></g-image>
      </div>
      <!-- <CardImage class="mini-card-image" :article="article" /> -->
      <ArticleTags class="mini-card-tags" :tags="article.tags" />
    </g-link>
  </article>
</template>

<script>
import ArticleCategory from "~/components/ArticleCategory.vue";
import ArticleTitle from "~/components/ArticleTitle.vue";
import CardImage from "~/components/CardImage.vue";
import ArticleTags from "~/components/ArticleTags.vue";

export default {
  name: "ArticleMiniCard",
  props: ["article"],
  components: {
    ArticleCategory,
    ArticleTitle,
    CardImage,
    ArticleTags
  },
  computed: {
    headerStyle: function() {
      if (this.article.color != "") {
        return "background-color:" + this.article.color + ";";
      } else {
        return "background-color: #252152;";
      }
    },
    gradientStyle: function() {
      if (this.article.color != "") {
        return "background: radial-gradient(90% 50%,rgba(81, 78, 100, 0.1)," + this.article.color +") no-repeat center;";
      } else {
        return "background: radial-gradient(ellipse closest-side,rgba(81, 78, 100, 0.5),#252f6f) no-repeat center;";
      }
    }
  }
};
</script>

<style scoped>

.mini-card-image {
  width: 100%;
  height: 100%;
}

.mini-card-image .card-image__gradient,
.mini-card-image .card-image__img {
  border-radius: 1vw;
}

.card-image__gradient,
.card-image__img {
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
}

.card-image__gradient {
  z-index: 1;
}

.mini-card-tags {
  z-index: 10;
  position: absolute;
  bottom: 0vw;
}

.mini-card {
  font-size: 0.7vw;
  width: 12vw;
  height: 15vw;
  /* background: #252f6f; */
  box-shadow: -1vw 0 1vw #000;
  display: flex;
  border-radius: 1vw;
  flex-direction: column;
  transition: 0.2s;
  z-index: 15;
  position: relative;
  padding: 0.7vw 0.7vw;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  display: -webkit-box;
  display: -ms-flexbox;
}

.mini-card:focus-within,
.mini-card:hover {
  -webkit-transform: translate(0, -1vw);
  transform: translate(0, -1vw);
  z-index: 15;
}

.mini-card:not(:first-child) {
  margin-left: -3vw;
}

.mini-card-category {
  font-size: 0.7vw;
}

.mini-card-title {
  font-size: 1.5vw;
}

.mini-card-title,
.mini-card-category {
  position: absolute;
  z-index: 2;
}
</style>