<template>
  <Layout>
    <tags-section />
    <last-posts-section />
    <last-by-category-section
      v-for="category in $page.allCategory.edges"
      :key="category.node.id"
      :category="category.node"
    />
  </Layout>
</template>

<script>
import TagsSection from "@/components/home/TagsSection.vue";
import LastPostsSection from "@/components/home/LastPostsSection.vue";
import LastByCategorySection from "@/components/home/LastByCategorySection.vue";

export default {
  components: {
    TagsSection,
    LastPostsSection,
    LastByCategorySection
  }
};
</script>

<page-query>
query {
  allCategory {
    edges {
      node {
        id
        title
        belongsTo {
          edges {
            node {
              ... on Post {
                id
                title
                path
                date
                icon
                tags {
                  id
                  title
                  path
                }
                headings(depth: h2) {
                  value
                  anchor
                }
              }
            }
          }
        }
      }
    }
  }
}
</page-query>