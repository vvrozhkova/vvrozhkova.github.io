<template>
  <Layout class="has-sidebar docs-page">
    <BackToTopButton />
    <ScrollBar />
    <div class="container flex flex-align-top section--dark">
      <div class="sidebar">
        <h3>Смотрите также:</h3>
        <template v-if="links">
          <div v-for="(group, i1) in links" :key="i1">
          <h3 class="menu-item" :key="`title-${i1}`">{{ group.title }}</h3>
          <template v-for="(item, i2) in group.items">
            <g-link
              :exact="item.link == '/docs/'"
              class="menu-item menu-link"
              :to="item.link"
              :key="`link-${i1}-${i2}`"
            >{{ item.title }}</g-link>
          </template>
          </div>
        </template>
      </div>

      <Section class="doc-content flex-fit" container="base">
        <div class="post-header">
          <div class="date">{{post.date}}</div>
          <div class="type-row">
            <div class="typewriter">
              <span class="cursor"></span>
              <h1>{{post.title}}</h1>
            </div>
          </div>
          <p>{{post.description}}</p>
          <div class="tags">
            <g-link class="tag" v-for="tag in post.tags" :key="tag.id" :to="tag.path">{{tag.title}}</g-link>
          </div>
          <div class="post-share-btns">
            <div class="ya-share2" data-counter="ig" data-services="vkontakte,facebook,telegram"></div>
          </div>
        </div>

        <slot />

        <nav class="docs-nav">
          <div class="docs-nav__previous">
            <g-link
              v-if="previousPage"
              exact
              class="button button--small docs-nav__link"
              :to="previousPage.link"
            >&larr; {{ previousPage.title }}</g-link>
          </div>
          <div class="docs-nav__next">
            <g-link
              v-if="nextPage"
              exact
              class="button button--small docs-nav__link"
              :to="nextPage.link"
            >{{ nextPage.title }} &rarr;</g-link>
          </div>
        </nav>
      </Section>
      <div
        v-if="subtitles.length > 0 && subtitles[0].depth !== 3"
        class="sidebar sidebar--right hide-for-small"
      >
        <h3>On this page</h3>
        <ul v-if="subtitles.length" class="menu-item submenu">
          <li
            class="submenu__item"
            :class="'submenu__item-depth-' + subtitle.depth"
            v-for="subtitle in subtitles"
            :key="subtitle.id"
          >
            <g-link
              class="submenu__link"
              :to="post.path.slice(0, -1)+subtitle.anchor"
            >{{ subtitle.value }}</g-link>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<script>
import "~/assets/style/bigfoot-default.css";

global.jQuery = require("jquery");
var $ = global.jQuery;
var bigfoot = require("~/assets/js/bigfoot.min.js");

export default {
  components: {
    ScrollBar: () => import("@/components/ScrollBar"),
    BackToTopButton: () => import("~/components/BackToTopButton")
  },
  metaInfo() {
    return {
      script: [
        { src: "https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js" },
        { src: "https://yastatic.net/share2/share.js", async: "async" }
      ]
    };
  },
  props: {
    subtitles: { type: Array, default: () => [] },
    links: { type: Array, default: () => [] },
    post: { type: Object, required: true }
  },
  mounted() {
    $.bigfoot();
  },
  computed: {
    currentPath() {
      return this.$route.matched[0].path;
    },
    items() {
      return this.links.reduce(
        (acc, group) => (acc.push(...group.items), acc),
        []
      );
    },
    currentIndex() {
      return this.items.findIndex(item => {
        return (
          item.link.replace(/\/$/, "") === this.$route.path.replace(/\/$/, "")
        );
      });
    },
    nextPage() {
      return this.items[this.currentIndex + 1];
    },
    previousPage() {
      return this.items[this.currentIndex - 1];
    }
  }
};
</script>

<style lang="scss" scoped>
.tags .tag {
  background: none;
  &:hover {
    color: #7a7a8c;
  }
}

.post-share-btns {
  right: 2vw;
  padding: 0.5em;
  position: absolute;
  z-index: 99;
}

.post-header {
  max-width: 1300px;
  width: 100%;
  padding: 1vw;
}
.date {
  color: #7a7a8c;
  margin-bottom: 1vw;
}

.type-row {
  background-color: var(--bg);
  padding: 0.5vw;
  border-radius: 5px;
  margin-bottom: 2vw;
}

.typewriter {
  width: fit-content;

  h1 {
    color: var(--light-bg);
    font-family: "PT Mono";
    overflow: hidden;
    padding-left: 10px;
    margin: 0 auto;
    word-wrap: break-word;
    letter-spacing: 0.8px;
    line-height: 35px;
  }
  .cursor {
    border-left: 0.15em solid orange;
    width: 10px;
    height: 2rem;
    display: inline-block;
    position: absolute;
    animation: blink-caret 0.5s step-end infinite;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}
</style>