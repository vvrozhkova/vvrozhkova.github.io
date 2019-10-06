<template>
  <Layout class="postPage" itemscope itemtype="http://schema.org/TechArticle">
    <PostHeader :post="$page.post" />
    <div class="post-share row">
      <span class="post-share-title">
        <h3>Share it:</h3>
      </span>

      <div class="post-share-btns">
        <div class="ya-share2" data-counter="ig" data-services="vkontakte,facebook,telegram"></div>
      </div>
    </div>

    <main itemprop="articleBody" class="post-content-box row">
      <div class="post-table-content col-12 col-xl-4">
        <h2>СОДЕРЖАНИЕ:</h2>
        <ul>
          <li v-for="tableContentItem in $page.post.headings" :key="tableContentItem.id">
            <g-link
              :to="$page.post.path.slice(0, -1)+tableContentItem.anchor"
            >{{tableContentItem.value}}</g-link>
          </li>
        </ul>
      </div>
      <div class="post-content col-12 col-xl-8">
        <div itemprop="text" v-html="$page.post.content" />
        <Comments :comments="$page.comments.edges" :pageSlug="$page.post.path" />
      </div>
    </main>
  </Layout>
</template>

<script>
import Header from "~/components/header/Header.vue";
import Footer from "~/components/Footer.vue";
import PostHeader from "~/components/PostHeader.vue";
import Comments from "~/components/Comments.vue";
const siteConfig = require("~/../gridsome.config");

String.prototype.replaceAll = function(search, replace) {
  return this.split(search).join(replace);
};

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      bodyAttrs: { class: "postBody body" },
      script: [
        { src: "https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js" },
        { src: "https://yastatic.net/share2/share.js",
        async: "async" }
        ],
      meta: [
        { description: this.$page.post.description },
        { property: "og:locale", content: "ru_RU" },
        { property: "og:locale:alternate", content: "en_US" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.post.title },
        { property: "og:description", content: this.$page.post.description },
        { property: "og:image", content: this.$page.post.image },
        {
          property: "og:url",
          content: siteConfig.siteUrl + this.$page.post.path
        },
        { property: "og:site_name", content: siteConfig.siteName },
        { property: "keywords", content: this.$page.post.keywords }
      ]
    };
  },
  components: {
    Header,
    Footer,
    PostHeader,
    Comments
  },
  methods: {
    getNavItems(parentId) {
      return this.comments.filter(edge => {
        return edge.node.replies === parentId;
      });
    }
  }
};
</script>

<page-query>

  query Post ($path: String!) {
    post: post (path: $path) {
        title
        content
        description
        color
        category{
            id
            title
            path
        }
        date
        path
        image
        headings(depth: h2){
            value
            anchor
        }
        tags{
            id
            title
            path
        }
    }

    comments: allComment(sortBy: "date", filter:{post:{eq: $path}}){
      edges{
        node{
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

<style scoped>
.post-content-box {
  color: black;
  margin: 0 10%;
}

@media (max-width: 1200px) {
  .post-table-content {
    top: 18vw;
  }
}
@media (min-width: 1201px) {
  .post-table-content {
    top: 5vw;
  }
}

.post-table-content {
  display: table;
  position: sticky;
  background: #fff;
  z-index: 10;
  /* float: right; */
}

.post-table-content,
.post-content {
  padding: 1vw;
}

.post-table-content a {
  text-decoration: underline;
  text-decoration-style: dotted;
}

.post-table-content a:hover {
  color: navy;
}

.postPage {
  background-color: #fff;
}

/* share section */

.post-share {
  background-color: #252f6f;
  padding: 1vw 6vw;
  border: 1px solid #fff;
}

.post-share-title {
  padding: 1vw 0;
}

.post-share-btns {
  padding: 1vw;
}

.post-share h3 {
  padding: 0.5vw 1vw;
}
</style>
