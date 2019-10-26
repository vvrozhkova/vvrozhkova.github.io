<template>
  <header class="post-header container-fluid" :style="headerStyle">
    <div class="row">
      <div class="col-7">
        <h5 class="post-category">
          <ArticleCategory :article="post" />
        </h5>
        <br />
        <h1>
          <ArticleTitle :article="post" />
        </h1>
        <hr align="left" class="line" />
        <div class="post-description">{{post.description}}</div>

        <ArticleTags :tags="post.tags" />
      </div>
      <div class="post-header-image col-5">
        <!-- <div class="post-image__gradient"></div> -->
        <g-image :src="post.image" class="post-image__img" :alt="post.title"></g-image>
      </div>
    </div>
  </header>
</template>

<script>
import ArticleCategory from "~/components/ArticleCategory.vue";
import ArticleTitle from "~/components/ArticleTitle.vue";
import ArticleTags from "~/components/ArticleTags.vue";

export default {
  name: "PostHeader",
  components: {
    ArticleCategory,
    ArticleTitle,
    ArticleTags
  },
  props: ["post"],
  computed: {
    headerStyle: function() {
      if (this.post.color != "") {
        return "background-color:" + this.post.color + ";";
      } else {
        return "background-color: #252152;";
      }
    }
  }
};
</script>

<style scoped>
.post-description {
  /* font-size: 1.5vw; */
  margin-bottom: 1vw;
  /* width: 40vw; */
}

.post-category {
  line-height: 0;
  margin-bottom: -1.5vw;
}

.post-header {
  padding: 2vw;
  font-size: 1.5vw;
  overflow: hidden;
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