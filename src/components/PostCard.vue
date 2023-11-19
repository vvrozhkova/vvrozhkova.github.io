<template>
  <Card class="blog-posts__post" :link="post.path" :image="post.image">
    <div class="icon" v-if="!post.image | post.image=='null'">
      <p v-if="post.emoji">{{post.emoji}}</p>
      <i v-else :class="post.icon"></i>
    </div>
    <h3 v-html="post.title" />
    <div v-if="!post.headings.length">{{post.description}}</div>
    <ul v-else>
      <li v-for="tableContentItem in post.headings" :key="tableContentItem.id">
        <g-link :to="post.path.slice(0, -1)+tableContentItem.anchor">{{tableContentItem.value}}</g-link>
      </li>
    </ul>
    <div class="tags">
      <g-link class="tag" v-for="tag in post.tags" :key="tag.id" :to="tag.path">{{tag.title}}</g-link>
    </div>
    <div class="date">
      {{new Date(post.date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
      })}}
    </div>
  </Card>
</template>

<script>
export default {
  components: {
    Card: () => import("./Card")
  },
  props: {
    post: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.blog-posts__post {
  position: relative;
  margin-bottom: 2rem;
  .card__inner {
    padding: var(--space-x2);
  }
  .icon {
    font-size: 5em;
  }

  li {
    list-style: square;
  }
  li a {
    text-decoration: none;
    color: inherit;
    &:after {
      display: block;
      position: absolute;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      content: "";
      transition: width 0.1s ease-out;
    }
    &:hover:after {
      width: 100%;
    }
  }

  .date {
    color: inherit;
    margin-bottom: 1vw;
    text-align: right;
  }
}
</style>