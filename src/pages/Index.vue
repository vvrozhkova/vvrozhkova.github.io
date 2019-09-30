<template>
  <Layout>
    <main>
      <Slider :items="$page.lastPosts.edges" />
      <FavoriteSection :posts="$page.posts.edges" />
      <SectionLeft :posts="$page.uiPosts.belongsTo.edges" title="ui" />
      <SectionRight :posts="$page.uiPosts.belongsTo.edges" title="api" />
      <SectionLeft :posts="$page.uiPosts.belongsTo.edges" title="mobile" />
    </main>
  </Layout>
</template>

<script>
import Slider from "~/components/Slider.vue";
import FavoriteSection from "~/components/FavoriteSection.vue";
import SectionLeft from "~/components/SectionLeft.vue";
import SectionRight from "~/components/SectionRight.vue";

const siteConfig = require("~/../gridsome.config");

export default {
  metaInfo: {
    title: siteConfig.siteName,
    titleTemplate: "TestAutomation.Space",
    link: [{ rel: "canonical", href: "testautomation.space" }],
    meta: [
      { name: "description", content: siteConfig.siteDescription },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:type", content: "article" },
      { property: "og:title", content: siteConfig.siteName },
      { property: "og:description", content: siteConfig.siteDescription },
      { property: "og:url", content: siteConfig.siteUrl },
      { property: "og:site_name", content: siteConfig.siteName },
      { name: "yandex-verification", content: "067903c2cc71daeb" },
      { property: "keywords", content: "testing, automation testing, тестирование, автоматизация тестирования" }
    ]
  },
  components: {
    Slider,
    FavoriteSection,
    SectionLeft,
    SectionRight
  }
};
</script>

<page-query>

query Blog {
    metadata {
        siteUrl
        siteName
        siteDescription
    }

    lastPosts: allPost(sortBy: "date", limit: 7) {
        edges {
            node {
                id
                title
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

    uiPosts: category(id: "ui") {
        title
        belongsTo(limit: 3) {
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

    apiPosts: category(id: "api") {
        title
            belongsTo(limit: 3) {
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

    mobilePosts: category(id: "mobile") {
        title
            belongsTo(limit: 3) {
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

    posts: allPost {
        edges {
            node {
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

</page-query>
