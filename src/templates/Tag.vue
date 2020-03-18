<template>
  <Layout>
    <Section>
      <h2>{{$page.tag.title.toUpperCase()}}</h2>
      <div class="blog-posts container container-md">
        <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
      </div>
    </Section>
  </Layout>
</template>

<script>
import Section from "@/components/Section.vue";
import PostCard from "@/components/PostCard.vue";

export default {
  components: {
    Section,
    PostCard
  }
};
</script>

<page-query>
  query Tag($path: String!, $page: Int) {
    tag (path: $path) {
      title
      path
      belongsTo(perPage: 3, page: $page) @paginate {
        totalCount
        pageInfo {
          totalPages
          currentPage
        }
        edges {
          node {
            ...on Post {
              id
              title
              content
              date
              path
              category{
                  title
                  path
              }
              tags {
                  title
                  path
              }
              headings(depth: h2){
                  value
                  anchor
              }
            }
          }
        }
      }
    }

    relatedTag(path: $path) {
      id
      title
      path
      related {
          id
          path
          title
      }
    }
  }
</page-query>
<style scoped>
h2 {
  font-size: 7vw;
}
</style>