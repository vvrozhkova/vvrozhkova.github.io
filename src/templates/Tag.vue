<template>
  <Layout>
    <CategoryHeader
      :item="$page.postsByTag"
      :related="$page.relatedTag.related"
      :size="$page.postsByTag.belongsTo.totalCount"
    >Tag:</CategoryHeader>
    <div class="category category_center">
      <ArticleCard
        :article="post.node"
        :key="post.id"
        cardAlign="horizontal"
        v-for="post in $page.postsByTag.belongsTo.edges"
      />
      <Pager :info="$page.postsByTag.belongsTo.pageInfo" />
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
      title: this.$page.postsByTag.title
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
    query Tag($path: String!, $page: Int) {
        postsByTag: tag (path: $path) {
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
                            image
                            color
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
.category_center {
  margin: 0 auto;
  width: 50%;
}
</style>