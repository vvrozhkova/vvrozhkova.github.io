<template>
  <header class="post-header container-fluid" :style="'background-color:' + post.color + ';'">
    <div class="row">
      <div class="col-7">
        <h5 class="post-category">
          <ArticleCategory :article="post" />
          <meta itemprop="datePublished" :content="post.date">
          <meta itemprop="author" content="Victoria Rozhkova">
        </h5>
        <br />
        <h1 itemprop="headline">
          <g-link itemprop="url" :to="post.path">{{post.title}}</g-link>
        </h1>
        <hr class="line" />
        <div itemprop="description" class="post-description">{{post.description}}</div>

        <ArticleTags :tags="post.tags" />
      </div>
      <div class="post-header-image col-5" itemscope itemtype="http://schema.org/ImageObject">
        <g-image itemprop="post.image" :src="post.image" class="post-image__img" :alt="post.title"></g-image>
      </div>
    </div>
  </header>
</template>

<script>
import ArticleCategory from "~/components/ArticleCategory.vue";
import ArticleTags from "~/components/ArticleTags.vue";

export default {
  name: "PostHeader",
  components: {
    ArticleCategory,
    ArticleTags
  },
  props: ["post"]
};
</script>

<style scoped>
.post-description {
  margin-bottom: 1vw;
}

.post-category {
  line-height: 0;
  margin-bottom: -1.5vw;
}

.post-header {
  padding: 2vw;
  font-size: 1.5vw;
  overflow: hidden;
  background-color: #252152;
}

.post-header-image {
  /* left: 10vw; */
  max-height: 33vw;
  margin: auto;
}

.post-image__gradient,
.post-image__img {
  /* position: absolute; */
  width: 90%;
  height: inherit;
}

.post-image__gradient {
  background: radial-gradient(
      ellipse closest-side,
      rgba(81, 78, 100, 0.5),
      #252152
    )
    no-repeat center;
  z-index: 1;
}

hr {
  margin: 1vw 0;
}
</style>