<template>
  <Card class="blog-posts__post" :link="post.path">
    <div class="icon">
      <i :class="post.icon"></i>
    </div>
    <h3 v-html="post.title" />
    <ul>
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
import Card from "./Card.vue";

export default {
  components: {
    Card
  },
  props: {
    post: { type: Object, required: true }
  }
};
</script>

<style lang="scss" >
.blog-posts {
  .icon {
    font-size: 5em;
  }
  .tags {
    width: 50%;
    float: left;
  }
  li {
    list-style: square;
  }
  li a {
    text-decoration: none;
    color: #fff;
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

  .tag {
    width: fit-content;
    color: #7a7a8c;
    text-transform: uppercase;
    font-size: 0.66rem;
    white-space: nowrap;
    border: 3px solid #28242f;
    border-radius: 2rem;
    padding: 0.2rem 0.85rem 0.25rem;
    display: inline-block;
    margin-right: 1vw;
    text-decoration: none;
  }

  .tag:hover {
    border: 3px solid #fff;
  }

  .date {
    color: #7a7a8c;
    margin-bottom: 1vw;
    text-align: right;
  }
  &__post {
    position: relative;
    margin-bottom: 2rem;
    .card__inner {
      padding: var(--space-x2);
    }
  }
}
</style>