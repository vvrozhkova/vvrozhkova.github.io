<template>
  <Layout>
    <tags-section />
    <last-posts-section />
    <last-by-category-section
      v-for="(category, index) in $page.allCategory.edges"
      :key="category.node.id"
      :indexS="index+1"
      :category="category.node"
    />
  </Layout>
</template>

<script>
const siteConfig = require("~/../gridsome.config");

export default {
  metaInfo: {
    title: siteConfig.siteName,
    titleTemplate: "TestAutomation.Space",
    link: [{ rel: "canonical", href: "https://testautomation.space" }],
    meta: [
      { property: "og:locale", content: "ru_RU" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: siteConfig.siteName },
      { property: "og:description", content: siteConfig.siteDescription },
      { property: "og:url", content: siteConfig.siteUrl },
      { property: "og:site_name", content: siteConfig.siteName },
      { name: "yandex-verification", content: "067903c2cc71daeb" },
      {
        property: "keywords",
        content:
          "testing, automation testing, тестирование, автоматизация тестирования"
      }
    ]
  },
  components: {
    TagsSection: () => import("@/components/home/TagsSection"),
    LastPostsSection: () => import("@/components/home/LastPostsSection"),
    LastByCategorySection: () =>
      import("@/components/home/LastByCategorySection")
  }
};
</script>

<page-query>
query {
  metadata {
        siteUrl
        siteName
        siteDescription
    }
  allCategory {
    edges {
      node {
        id
        title
        path
        belongsTo(limit: 3) {
          edges {
            node {
              ... on Post {
                id
                title
                path
                description
                date
                icon
                image
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