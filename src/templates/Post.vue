<template>
  <Layout class="postPage" itemscope itemtype="http://schema.org/TechArticle">
    <BackToTopButton />
    <ScrollBar />
    <PostHeader :post="$page.post" />
    <div class="post-share container-fluid">
      <div class="row">
        <h3 class="post-share-title">Share it:</h3>

        <div class="post-share-btns">
          <div class="ya-share2" data-counter="ig" data-services="vkontakte,facebook,telegram"></div>
        </div>
      </div>
    </div>

    <main itemprop="articleBody" class="post-content-box row">
      <div id="table-content" class="post-table-content col-12 col-xl-4">
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
        <VueRemarkContent />
        <!-- <div itemprop="text" v-html="$page.post.content" /> -->
        <Comments :comments="$page.comments.edges" :pageSlug="$page.post.path" />
      </div>
    </main>
  </Layout>
</template>

<script>
import PostHeader from "~/components/PostHeader.vue";
import Comments from "~/components/Comments.vue";
import ScrollBar from "~/components/ScrollBar.vue";
import BackToTopButton from "~/components/BackToTopButton.vue";
import "~/assets/css/bigfoot-default.css";

const siteConfig = require("~/../gridsome.config");
global.jQuery = require("jquery");
var $ = global.jQuery;
// window.$ = $;
var bigfoot = require("~/assets/js/bigfoot.min.js");

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
        { src: "https://yastatic.net/share2/share.js", async: "async" }
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
    PostHeader,
    Comments,
    ScrollBar,
    BackToTopButton
  },
  methods: {
    getNavItems(parentId) {
      return this.comments.filter(edge => {
        return edge.node.replies === parentId;
      });
    }
  },
  mounted() {
    $.bigfoot();
  },
  updated() {
    setTableContentTop();
    setPostHeadersOffset();
    window.addEventListener("resize", function() {
      setTableContentTop();
      setPostHeadersOffset();
    });
  }
};

function getMenuHeight() {
  return document.getElementsByClassName("header")[0].clientHeight;
}

function setTableContentTop() {
  var menuHeight = getMenuHeight();
  var tableContent = document.getElementById("table-content");
  tableContent.style.top = menuHeight + "px";
}

function setPostHeadersOffset() {
  var offset = getMenuHeight();
  console.log("без содержания - " + offset);
  if (document.body.clientWidth < 1200) {
    offset += document.getElementById("table-content").clientHeight;
  }
  console.log("c содержания - " + offset);

  let els = document
    .getElementsByClassName("post-content")[0]
    .getElementsByTagName("h2");
  for (let i = 0; i < els.length; i++) {
    els[i].setAttribute(
      "style",
      "padding-top: " + offset + "px;margin-top: -" + offset + "px;"
    );
    console.log(els[i].innerText + " " + offset + " " + i);
  }
}
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

.post-table-content {
  position: sticky;
  background: #fff;
  z-index: 10;
  display: table;
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
}

.post-share-title {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-right: 1vw;
}
</style>
