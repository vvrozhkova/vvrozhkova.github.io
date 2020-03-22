<template>
  <PostLayout :subtitles="subtitles" :post="$page.post" :links="links">
    <VueRemarkContent class="post mb" />
  </PostLayout>
</template>

<script>
// import links from "@/data/doc-links.yaml";
const siteConfig = require("~/../gridsome.config");

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        { description: this.$page.post.description },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:locale:alternate", content: "en_US" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.post.title },
        { property: "og:description", content: this.$page.post.description },
        { property: "keywords", content: this.$page.post.keywords },
        { property: "og:image", content: this.$page.post.emoji },
        {
          property: "og:url",
          content: siteConfig.siteUrl + this.$page.post.path
        },
        { property: "og:site_name", content: siteConfig.siteName }
      ]
    };
  },
  components: {
    PostLayout: () => import("@/layouts/PostLayout")
  },

  computed: {
    links() {
      return this.$page.post.links;
    },
    subtitles() {
      let subtitles = this.$page.post.subtitles.filter(function(
        value,
        index,
        arr
      ) {
        return [2, 3].includes(value.depth);
      });
      return subtitles;
    }
  },
  metaInfo() {
    const { title, headings } = this.$page.post;
    return {
      title: title || (headings.length ? headings[0].value : undefined)
    };
  }
};
</script>

<page-query>

  query Post($path: String!) {
  post: post(path: $path) {
    title
    content
    description
    image
    category {
      id
      title
      path
    }
    date
    path
    links{
        title
        items{
          title
          link
        }
    }
    headings(depth: h2) {
      value
      anchor
    }
    subtitles: headings {
      depth
      value
      anchor
    }
    tags {
      id
      title
      path
    }
  }

  comments: allComment(sortBy: "date", filter: { post: { eq: $path } }) {
    edges {
      node {
        id
        name
        path
        post
        replies
        content
        date
      }
    }
  }
}
    
</page-query>

