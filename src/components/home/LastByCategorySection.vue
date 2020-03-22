<template>
  <Section secondary="true">
    <h2 class="category-title">{{category.title.toUpperCase()}}</h2>
    <div class="blog-posts container container-md">
      <PostCard v-for="post in category.belongsTo.edges" :key="post.node.id" :post="post.node" />
    </div>
  </Section>
</template>

<script>
export default {
  props: ["category"],
  components: {
    PostCard: () => import("@/components/PostCard")
  }
};
</script>

<style scoped>
@media screen and (min-width: 850px) {
  h2 {
    font-size: 7vw;
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
}

.section--secondary .category-title {
  text-align: left;
}
</style>