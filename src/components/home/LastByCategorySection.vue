<template>
  <Section :secondary="indexS%2==1">
    <g-link class="category-title" :to="category.path">
    <h2 >{{category.title.toUpperCase()}}</h2>
    </g-link>
    <div class="blog-posts container container-md">
      <PostCard v-for="post in category.belongsTo.edges" :key="post.node.id" :post="post.node" />
    </div>
  </Section>
</template>

<script>
export default {
  props: ["category", "indexS"],
  components: {
    PostCard: () => import("@/components/PostCard")
  }
};
</script>

<style scoped>
@media screen and (min-width: 850px) {
  h2 {
    font-size: 3vw;
  }
}

@media screen and (max-width: 850px) {
  h2 {
    font-size: 4em;
    font-weight: 900;
  }
}

.category-title {
  text-align: right;
    color: #fffffe;
    text-decoration: none;
}

.section--secondary .category-title {
  text-align: left;
    color: var(--bg);
}
</style>