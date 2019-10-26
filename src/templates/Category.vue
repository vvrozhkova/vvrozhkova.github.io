<template>
  <Layout>
    <CategoryHeader
      :item="$page.category"
      :related="$page.relatedCategory.related"
      :size="$page.category.belongsTo.totalCount"
    >Category:</CategoryHeader>
    <div class="category category_center container-fluid">
      <ArticleCard
        :article="post.node"
        :key="post.id"
        cardAlign="horizontal"
        v-for="post in $page.category.belongsTo.edges"
      />
      <Pager :info="$page.category.belongsTo.pageInfo" />
    </div>
  </Layout>
</template>

<script>
import CategoryHeader from "~/components/CategoryHeader.vue";
import ArticleCard from "~/components/ArticleCard.vue";
import { Pager } from "gridsome";

export default {
  metaInfo() {
    return {
      title: this.$page.category.title.toUpperCase()
    };
  },
  components: {
    CategoryHeader,
    ArticleCard,
    Pager
  }
};
</script>

<page-query>
  query Category ($path: String!, $page: Int) {
    category(path: $path) {
      title
      path
      belongsTo(perPage: 3, page: $page) @paginate  {
        totalCount
        pageInfo {
            totalPages
            currentPage
        }
        edges {
          node {
            ... on Post {
              id
              title
              content
              date
              path
              image
              color
              category {
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

    relatedCategory(path: $path) {
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
.category_center {
  width: 70%;
}
</style>

<style lang="scss">
nav[role="navigation"] {
  text-align: center;
  margin: 3vw 0;
  a {
    border: 1px solid #dee2e6;
    padding: 1vw 1.5vw;
  }
  a:first-child {
    border-radius: 0.5vw 0 0 0.5vw;
  }

  a:last-child {
    border-radius: 0 0.5vw 0.5vw 0;
  }

  a.active {
    background-color: #007bff;
    pointer-events: none;
    cursor: default;
  }
}

.category .article-card__horizontal {
  height: auto;
}
</style>