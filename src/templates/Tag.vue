<template>
  <Layout>
    <Section>
      <h2>{{$page.tag.title.toUpperCase()}}</h2>
      <div class="blog-posts container container-md">
        <PostCard v-for="edge in $page.tag.belongsTo.edges" :key="edge.node.id" :post="edge.node" />
      </div>
      <Pager :info="$page.tag.belongsTo.pageInfo"/>
    </Section>
  </Layout>
</template>

<script>
import { Pager } from 'gridsome'

export default {
  components: {
    PostCard: () => import("@/components/PostCard"),
    Pager
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
              icon
              image
              emoji
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
  font-size: 6vw;
}
</style>